import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://yhxkudknfpagrrlsparr.supabase.co';

async function hydrateEnvFromFile() {
  const envPath = path.resolve('.env');

  try {
    const contents = await readFile(envPath, 'utf8');
    for (const rawLine of contents.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) {
        continue;
      }

      const equalsIndex = line.indexOf('=');
      if (equalsIndex === -1) {
        continue;
      }

      const key = line.slice(0, equalsIndex).trim();
      const value = line.slice(equalsIndex + 1).trim().replace(/^['"]|['"]$/g, '');

      if (!key || key in process.env) {
        continue;
      }

      process.env[key] = value;
    }
  } catch (error) {
    if (!error || error.code !== 'ENOENT') {
      throw error;
    }
  }
}

await hydrateEnvFromFile();

const args = process.argv.slice(2).filter(Boolean);

if (args.length === 0) {
  console.error('Usage: npm run students:access -- <email> [--revoke]');
  process.exit(1);
}

const emailArg = args.find((arg) => !arg.startsWith('--'));
const revoke = args.includes('--revoke');

if (!emailArg) {
  console.error('Missing student email. Usage: npm run students:access -- <email> [--revoke]');
  process.exit(1);
}

const supabaseUrl = process.env.SUPABASE_URL ?? DEFAULT_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY. Add it to your environment or .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const normalizedEmail = emailArg.toLowerCase();

const { data: userData, error: listError } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 100,
  email: normalizedEmail,
});

if (listError) {
  console.error('Failed to fetch users from Supabase:', listError);
  process.exit(1);
}

const matchingUser = userData?.users?.find((candidate) => candidate.email?.toLowerCase() === normalizedEmail);

if (!matchingUser) {
  console.error(`No Supabase user found with email: ${emailArg}`);
  process.exit(1);
}

const accessGranted = !revoke;

const { error: upsertError } = await supabase
  .from('profiles')
  .upsert(
    {
      user_id: matchingUser.id,
      access_granted: accessGranted,
      full_name: matchingUser.user_metadata?.full_name ?? null,
      avatar_url: matchingUser.user_metadata?.avatar_url ?? null,
    },
    { onConflict: 'user_id' },
  );

if (upsertError) {
  console.error('Failed to update profile access flag:', upsertError);
  process.exit(1);
}

console.log(
  accessGranted
    ? `Access granted for ${emailArg}. The student can acessar a Área do Aluno imediatamente.`
    : `Access revoked for ${emailArg}. O aluno volta a ver o aviso de pagamento pendente.`,
);

process.exit(0);
