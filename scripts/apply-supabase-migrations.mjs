import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_SUPABASE_URL = 'https://yhxkudknfpagrrlsparr.supabase.co';
const MIGRATIONS_TABLE = 'supabase_migrations';

const supabaseUrl = process.env.SUPABASE_URL ?? DEFAULT_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const migrationsDir = path.resolve('supabase', 'migrations');

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY. Set it in your environment to apply migrations.');
  process.exit(1);
}

if (!supabaseUrl) {
  console.error('Missing SUPABASE_URL.');
  process.exit(1);
}

const sqlEndpoint = new URL('/rest/v1/rpc/pg_execute_sql', supabaseUrl).toString();
const restEndpoint = new URL(`/rest/v1/${MIGRATIONS_TABLE}`, supabaseUrl).toString();

async function runSql(query) {
  const response = await fetch(sqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase SQL API error (${response.status}): ${errorText}`);
  }

  return response.json().catch(() => undefined);
}

async function ensureMigrationsTable() {
  await runSql(`
    create table if not exists public.${MIGRATIONS_TABLE} (
      name text primary key,
      executed_at timestamptz not null default now()
    );
  `);
}

async function fetchExecutedMigrations() {
  const response = await fetch(`${restEndpoint}?select=name`, {
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to list applied migrations (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return new Set(data.map((row) => row.name));
}

async function recordMigration(name) {
  const response = await fetch(restEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: 'resolution=ignore-duplicates',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to record migration ${name} (${response.status}): ${errorText}`);
  }
}

async function loadMigrationFiles() {
  let entries;
  try {
    entries = await readdir(migrationsDir, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      throw new Error(`Migrations directory not found at ${migrationsDir}`);
    }
    throw error;
  }
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.sql'))
    .map((entry) => entry.name)
    .sort();
}

async function applyMigrations() {
  await ensureMigrationsTable();
  const applied = await fetchExecutedMigrations();
  const files = await loadMigrationFiles();

  let appliedCount = 0;

  for (const fileName of files) {
    if (applied.has(fileName)) {
      console.log(`Skipping ${fileName} (already applied)`);
      continue;
    }

    const filePath = path.join(migrationsDir, fileName);
    const sql = await readFile(filePath, 'utf8');

    console.log(`Applying ${fileName}...`);
    await runSql(sql);
    await recordMigration(fileName);
    appliedCount += 1;
    console.log(`Finished ${fileName}`);
  }

  if (appliedCount === 0) {
    console.log('Database already up to date.');
  } else {
    console.log(`Applied ${appliedCount} migration(s).`);
  }
}

applyMigrations().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
