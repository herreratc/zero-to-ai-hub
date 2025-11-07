-- Add manual access gate to profiles so the team can liberar conteúdo após pagamento
alter table public.profiles
  add column if not exists access_granted boolean not null default false;

comment on column public.profiles.access_granted is
  'Flag definido manualmente pela equipe após confirmar o pagamento do aluno via WhatsApp.';

-- Alunos autenticados ainda podem criar o próprio perfil, mas não conseguem alterar o flag manualmente
-- durante a inserção
lock table public.profiles in share row exclusive mode;

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
  on public.profiles
  for insert
  with check (
    auth.uid() = user_id
    and coalesce(access_granted, false) = false
  );

-- Impede que o aluno force a liberação manualmente via update
-- e mantém o acesso para atualizar nome/avatar
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
  );
