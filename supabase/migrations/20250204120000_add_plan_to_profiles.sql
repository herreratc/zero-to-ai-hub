-- Introduce plano do aluno na tabela de perfis para controlar o acesso a recursos premium
create type if not exists public.profile_plan as enum ('basic', 'complete');

alter table public.profiles
  add column if not exists plan public.profile_plan;

alter table public.profiles
  alter column plan set default 'basic';

comment on column public.profiles.plan is
  'Plano atual do aluno. Defina manualmente como "complete" para liberar videoaulas, comunidade e mentorias.';

-- Evita que alunos marquem plano completo manualmente na criação do perfil
lock table public.profiles in share row exclusive mode;

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
  on public.profiles
  for insert
  with check (
    auth.uid() = user_id
    and coalesce(access_granted, false) = false
    and plan = 'basic'
  );

-- Impede que alunos alterem o plano manualmente via update, mantendo apenas dados pessoais editáveis
update public.profiles
set plan = coalesce(plan, 'basic')
where plan is null;

alter table public.profiles
  alter column plan set not null;

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles can update personal data"
  on public.profiles
  for update
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and access_granted = coalesce(
      (
        select existing.access_granted
        from public.profiles as existing
        where existing.id = profiles.id
      ),
      false
    )
    and plan = coalesce(
      (
        select existing.plan
        from public.profiles as existing
        where existing.id = profiles.id
      ),
      'basic'
    )
  );
