# Zero to AI Hub

Aplicação web para a comunidade IA do Zero com autenticação Supabase e sincronização de progresso de estudos.

## Configuração rápida

1. Copie o arquivo `.env.example` para `.env` e preencha os valores do seu projeto Supabase:

   ```bash
   cp .env.example .env
   ```

   - `SUPABASE_KEY`: chave `anon` disponível em **Settings → API** (a URL já está pré-configurada para `https://yhxkudknfpagrrlsparr.supabase.co`)
   - `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` (opcionais): use caso deseje sobrescrever a URL e a chave no build Vite

2. Suba o esquema do banco no Supabase:

   ```bash
   supabase db push
   ```

   Esse comando cria as tabelas `profiles` e `resource_progress`, configura gatilhos e habilita Row Level Security com políticas que restringem o acesso ao dono do registro.

3. No painel do Supabase, habilite o provedor de **Email/Password** em **Authentication → Providers** para permitir login tradicional.

4. Para gerar o bundle localmente:

   ```bash
   npm install
   npm run dev
   ```

   Acesse `http://localhost:5173` (ou a porta exibida no terminal).

## Fluxo de autenticação

- Usuários podem criar conta ou fazer login via email/senha.
- Após a criação da conta, um gatilho sincroniza metadados básicos com a tabela `profiles`.
- O progresso de leitura e videoaulas é armazenado em `resource_progress` com políticas que garantem que cada aluno só enxergue os próprios dados.

## Scripts úteis

- `npm run build`: gera o build de produção.
- `npm run lint`: executa a análise estática.

## Estrutura Supabase

Os arquivos de migração vivem em `supabase/migrations/`. Sempre que alterar o schema, adicione uma nova migração e execute `supabase db push` para sincronizar com o projeto remoto.
