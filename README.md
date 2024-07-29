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
      "mentorId": 2,
      "menteeId": 1,
      "skillId": 1,
      "startTime": "2024-07-30T16:00:00.000Z",
      "endTime": "2024-07-31T18:00:00.000Z"
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
- **Criação de Evento:** `POST /google-calendar/create-event/{TOKEN}`
- **Exemplo de Requisição:**
    ```json
    {
      "sessionId": 3
    }
    ```

### Calendar Criado:**
![Screenshot_1](https://github.com/user-attachments/assets/d19541db-d64e-4cc7-a086-87a0a67279ed)

![Screenshot_4](https://github.com/user-attachments/assets/4d74dbdd-f390-43ec-80fa-fcebd3000e43)
</br>

## Considerações Finais
- **Qualidade do Código:** Segui boas práticas de programação, incluindo Clean Code e Clean Architecture.
- **Documentação:** Esta documentação cobre todas as funcionalidades e explica como configurar e utilizar a API.
- **Opcional:** A integração com o Google Calendar foi uma escolha estratégica para facilitar o agendamento de sessões

## INSOMNIA - Com todos endpoits prontos
- ** Link: https://drive.google.com/file/d/1w_88YKLHBFIhKpQWby2w2SPxupb7dE3b/view?usp=sharing
