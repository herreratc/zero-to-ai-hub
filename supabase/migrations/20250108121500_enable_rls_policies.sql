-- Enable row level security for learner data tables and keep profiles in sync

-- Ensure helper function exists to mirror auth metadata into public.profiles
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  on conflict (user_id) do update
    set full_name = excluded.full_name,
        avatar_url = excluded.avatar_url,
        updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql security definer
set search_path = public;

-- Keep the trigger idempotent so the migration can run multiple times without errors
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Profiles RLS
alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
  on public.profiles
  for select
  using (auth.uid() = user_id);

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
  on public.profiles
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
  on public.profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Resource progress RLS
alter table public.resource_progress enable row level security;

drop policy if exists "Progress is viewable by owner" on public.resource_progress;
create policy "Progress is viewable by owner"
  on public.resource_progress
  for select
  using (auth.uid() = user_id);

drop policy if exists "Progress is insertable by owner" on public.resource_progress;
create policy "Progress is insertable by owner"
  on public.resource_progress
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Progress is updatable by owner" on public.resource_progress;
create policy "Progress is updatable by owner"
  on public.resource_progress
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Progress is deletable by owner" on public.resource_progress;
create policy "Progress is deletable by owner"
  on public.resource_progress
  for delete
  using (auth.uid() = user_id);
