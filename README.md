# Zero to AI Hub

Aplicação web para a comunidade IA do Zero com autenticação Supabase e sincronização de progresso de estudos.

## Configuração rápida

1. Copie o arquivo `.env.example` para `.env` e preencha os valores do seu projeto Supabase:

   ```bash
   cp .env.example .env
   ```

   - `SUPABASE_KEY`: chave `anon` disponível em **Settings → API**. Ao defini-la, o Vite replica automaticamente o valor para `VITE_SUPABASE_PUBLISHABLE_KEY`, liberando o login no navegador.
   - `SUPABASE_SERVICE_ROLE_KEY`: chave de serviço utilizada pelo script de migrações
   - `SUPABASE_URL`: use caso deseje apontar para outro projeto Supabase (por padrão usamos `https://yhxkudknfpagrrlsparr.supabase.co`). Quando preenchido, o Vite também replica o valor para `VITE_SUPABASE_URL`.
   - `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`: apenas se quiser sobrescrever manualmente os valores expostos para o bundle do navegador.
   - `VITE_WHATSAPP_CONTACT`: número do WhatsApp (somente dígitos) usado na tela de pagamento pendente.
   - `VITE_WHATSAPP_CONTACT_MESSAGE`: mensagem opcional pré-preenchida no link do WhatsApp.

2. Suba o esquema do banco no Supabase (requer a chave **Service Role**, disponível em **Settings → API → Project API keys** e preenchida no `.env`):

   ```bash
   npm run supabase:deploy
   ```

   O script carrega automaticamente as variáveis definidas no `.env`, envia todas as migrações em `supabase/migrations/` para o projeto remoto usando a SQL API, grava o histórico em `supabase_migrations` e pode ser executado quantas vezes for necessário (migrations já aplicadas serão ignoradas).

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
- `npm run students:access -- aluno@email.com`: libera o acesso do aluno informado (adicione `--revoke` para bloquear novamente).

## Liberação manual após pagamento

O conteúdo da Área do Aluno só é exibido quando o campo `access_granted` do perfil está marcado como `true`. Esse flag é definido manualmente assim que o pagamento for confirmado no WhatsApp:

1. Localize o aluno no Supabase (tabela `profiles` ou menu **Authentication → Users**).
2. Marque `access_granted` como `true` para liberar imediatamente o dashboard.
3. Se preferir a linha de comando, execute:

   ```bash
   npm run students:access -- aluno@email.com
   ```

   Use `--revoke` para voltar o acesso ao estado pendente:

   ```bash
   npm run students:access -- aluno@email.com --revoke
   ```

Na interface, alunos sem liberação veem um aviso solicitando contato via WhatsApp (configurado por `VITE_WHATSAPP_CONTACT`). Assim que o flag é marcado, basta atualizar a página para liberar todo o conteúdo.

## Estrutura Supabase

Os arquivos de migração vivem em `supabase/migrations/`. Sempre que alterar o schema, adicione uma nova migração e execute `npm run supabase:deploy` para sincronizar com o projeto remoto.
