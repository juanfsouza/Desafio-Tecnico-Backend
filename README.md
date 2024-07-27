# Mentorship Platform

## Configuração

1. Configure as variáveis de ambiente no arquivo `.env`:
    ```env
    DATABASE_URL="postgresql://postgres:123@localhost:5432/mentorship"
    JWT_SECRET="your_jwt_secret_key"
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Execute as migrações do Prisma:
    ```bash
    npx prisma migrate dev --name init
    ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run start:dev
    ```

## Uso da API

### Autenticação
- Registro de usuário: `POST /auth/register`
- Login de usuário: `POST /auth/login`

### Usuários
- Listar usuários: `GET /users`
- Obter usuário por ID: `GET /users/:id`

### Habilidades
- Listar habilidades: `GET /skills`
- Adicionar habilidade: `POST /skills`

### Sessões
- Agendar sessão: `POST /sessions`
- Listar sessões: `GET /sessions`

### Avaliações
- Adicionar avaliação: `POST /ratings`
- Listar avaliações: `GET /ratings`
