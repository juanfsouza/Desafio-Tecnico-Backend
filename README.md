<div align="center">
    
# Mentorship Platform

![Screenshot_3](https://github.com/user-attachments/assets/873c3566-2212-46da-98aa-46c444a29314)

</div>

## Decisões Tomadas
- **NestJS:** Utilizado por sua arquitetura modular e suporte a TypeScript.
- **Prisma:** Utilizado para ORM devido à sua facilidade de uso e integração com PostgreSQL.
- **Opicional Google Calendar API:** Escolhido para integração com calendários devido à sua popularidade e robustez.

## Configuração e Execução do Projeto

### Pré-requisitos
- Node.js
- PostgreSQL
- Conta de desenvolvedor do Google para integração com o Google Calendar

### Configuração
1. Clone o repositório:
    ```sh
    git clone https://github.com/your-repo/mentoring-platform.git
    cd mentor-platform
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Opcional Configure as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
        ```
        DATABASE_URL="sua_string_de_conexao_do_postgresql"
        GOOGLE_CLIENT_ID="seu_client_id_do_google"
        GOOGLE_CLIENT_SECRET="seu_client_secret_do_google"
        ```

4. Execute as migrações do banco de dados:
    ```sh
    npx prisma migrate dev
    ```

5. Inicie o servidor:
    ```sh
    npm run start:dev
    ```

## Utilização da API

### Cadastro de Usuários (Mentores e Mentorados)
- **Endpoint:** `POST /users`
- **Exemplo de Requisição:**
    ```json
    {
      "name": "Ju",
      "email": "Ju@example.com",
      "password": "securepassword",
      "role": "mentor" // ou "mentee"
    }
    ```

### Listagem de Habilidades
- **Endpoint:** `POST /skills`
- **Exemplo de Requisição:**
    ```json
    {
      "name": "Nestjs"
    }
    ```

### Agendamento de Sessões de Mentoria
- **Endpoint:** `POST /sessions`
- **Exemplo de Requisição:**
    ```json
    {
      "mentorId": 1,
      "menteeId": 2,
      "startTime": "2024-07-27T20:00:00Z",
      "endTime": "2024-07-27T21:00:00Z"
    }
    ```

### Sistema de Avaliação de Mentorias
- **Endpoint:** `POST /ratings`
- **Exemplo de Requisição:**
    ```json
    {
      "sessionId": 1,
      "rating": 5,
      "comment": "Great session!"
    }
    ```

### Integração com Google Calendar
- **Autenticação:** `GET /google-calendar/auth`
- **Criação de Evento:** `POST /google-calendar/create-event`
- **Listagem de Eventos:** `GET /google-calendar/list-events`
- **Atualização de Evento:** `PUT /google-calendar/update-event`
- **Exclusão de Evento:** `DELETE /google-calendar/delete-event`

## Considerações Finais
- **Qualidade do Código:** Segui boas práticas de programação, incluindo Clean Code e Clean Architecture.
- **Documentação:** Esta documentação cobre todas as funcionalidades e explica como configurar e utilizar a API.
- **Opcional:** A integração com o Google Calendar foi uma escolha estratégica para facilitar o agendamento de sessões
