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
- **Endpoint:** `DELETE /users/{id}`

### Listagem de Habilidades
- **Endpoint:** `POST /skills`
- **Exemplo de Requisição:**
    ```json
    {
      "name": "Nestjs"
    }
    ```
- **Endpoint:** `PUT /skills/{id}`
- **Exemplo de Requisição:**
    ```json
    {
      "name": "Java"
    }
    ```
- **Endpoint:** `DELETE /skills/{id}`

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
- **Endpoint:** `PUT /ratings/{id}`
- **Exemplo de Requisição:**
    ```json
    {
      "score": 4,
      "comment": "nice session."
    }
    ```
- **Endpoint:** `DELETE /ratings/{id}`
  
### Integração com Google Calendar

#### Autenticação e Armazenamento de Tokens
1. **Obtenção da URL de Autorização:**
   - **Endpoint:** `GET /google-calendar/auth`
   - Este endpoint retorna uma URL para o usuário autorizar o acesso ao Google Calendar.

2. **Criação de Eventos:**
   - **Endpoint:** `POST /google-calendarcreate-event?accessToken={TOKEN}`
   - **Exemplo de Requisição:**
     ```json
     {
    	 "sessionId": 1
     }
     ```
   - Este endpoint cria um evento no Google Calendar usando o token de acesso e o ID da sessão.

3. **Criação de Eventos:**
   - **Endpoint:** `GET /google-calendar/tokens`
   - Este endpoint acessa todos tokens salvo no banco de dados.

### Calendar Criado
![Screenshot_1](https://github.com/user-attachments/assets/d19541db-d64e-4cc7-a086-87a0a67279ed)

![Screenshot_4](https://github.com/user-attachments/assets/4d74dbdd-f390-43ec-80fa-fcebd3000e43)
</br>

## Considerações Finais
- **Qualidade do Código:** Segui boas práticas de programação, incluindo Clean Code e Clean Architecture.
- **Documentação:** Esta documentação cobre todas as funcionalidades e explica como configurar e utilizar a API.
- **Opcional:** A integração com o Google Calendar foi uma escolha estratégica para facilitar o agendamento de sessões

## INSOMNIA - Json com todos endpoints prontos
- ** Link: https://drive.google.com/file/d/12FFZm82JFctQnI3_PzZ7CU-DiQv8Awpx/view?usp=sharing

## SWAGGER - Documentação teste
- ** Link: http://localhost:3000/api#/
- ** observão os endpoits de calendario não esta definido use o insomnia para testar agendamento do calendario
