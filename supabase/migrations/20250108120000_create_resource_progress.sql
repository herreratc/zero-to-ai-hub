create extension if not exists "pgcrypto";

create or replace function public.set_current_timestamp_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists profiles_user_id_key on public.profiles(user_id);

create table if not exists public.resource_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  resource_type text not null check (resource_type in ('ebook', 'video')),
  resource_id text not null,
  completed boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists resource_progress_user_id_type_id_key
  on public.resource_progress(user_id, resource_type, resource_id);

drop trigger if exists set_timestamp on public.profiles;
create trigger set_timestamp before update on public.profiles
  for each row execute function public.set_current_timestamp_updated_at();

drop trigger if exists set_timestamp on public.resource_progress;
create trigger set_timestamp before update on public.resource_progress
  for each row execute function public.set_current_timestamp_updated_at();
