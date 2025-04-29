# API de Produtos com Node.js e PostgreSQL

![Badge de Linguagem](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Badge de Framework](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Badge de Banco de Dados](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Badge de Status](https://img.shields.io/badge/Status-Desenvolvimento-yellow)

## Descrição do Projeto

Este projeto consiste em uma API RESTful simples para gerenciamento de produtos com integração a um banco de dados. Desenvolvida como um estudo guiado pelas aulas da OneBitCode, a API oferece funcionalidades básicas de operação de dados (CRUD), utilizando Node.js, o framework Express.js.

O objetivo principal deste projeto foi solidificar o entendimento sobre:

- Criação de rotas e controllers com Express.js.
- Interação com um banco de dados relacional (PostgreSQL) utilizando queries SQL diretas.
- Implementação das operações CRUD de forma eficiente e organizada.
- Estrutura básica de uma API RESTful.

## Observações
Tendo em vista que esse projeto foi criado para o estudo para um caso específico de integração de uma API com banco de dados, existem pontos não tratados propositalmente visando a agilidade no desenvolvimento, como o tratamento de erros e exceções e a arquitetura apropriada. Esses são pontos são tratados em outros projetos.

Assim como já utilizei em outros casos de estudo, seria utilizado a biblioteca **ZOD** para ajudar na validação de dados e o uso de **middlewares de erro** para o tratamento de erros que pudessem aparecer em algum lugar da aplicação.

## Funcionalidades

A API de Produtos oferece os seguintes endpoints:

- **`GET /api/products`**: Lista todos os produtos cadastrados.
- **`GET /api/products/:id`**: Exibe os detalhes de um produto específico, identificado pelo seu ID.
- **`POST /api/products`**: Cadastra um novo produto. Espera um corpo de requisição no formato JSON com os campos: `name` (string, obrigatório), `description` (string), `price` (number, obrigatório), `stockQuantity` (number, obrigatório), e `isActive` (boolean, opcional, default: true).
- **`PUT /api/products/:id`**: Atualiza os dados de um produto existente, identificado pelo seu ID. Espera um corpo de requisição JSON com os campos a serem atualizados.
- **`DELETE /api/products/:id`**: Remove um produto do banco de dados, identificado pelo seu ID.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para o backend.
- **Express.js**: Flexível para Node.js simples de se utilizar e adequado para o projeto realizado.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.
- **`pg`**: Driver PostgreSQL para Node.js, utilizado para interação com o banco de dados.
- **dotenv**: Para gerenciamento de variáveis de ambiente.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão >= 18)
- **npm** (geralmente instalado com o Node.js)
- **PostgreSQL** (com um servidor rodando)

## Configuração e Execução

1.  **Clone o repositório:**
    ```bash
    gh repo clone marcus-soares1/api-com-postgres
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` (ou renomeie e edite o arquivo `.env-exemple`) na raiz do projeto com as suas informações de conexão com o banco de dados PostgreSQL. Exemplo:
    ```env
    PORT=porta_da_api
    POSTGRE_USER=nome_usuario
    POSTGRE_PASSWORD=senha_do_usuario
    #HOST=localhost
    #POSTGRE_PORT=porta_do_banco
    DATABASE_NAME=nome_banco
    ```

4.  **Crie e sincronize o banco de dados:**
    Execute o script para criar as tabelas no seu banco de dados PostgreSQL:
    ```bash
    npm run db:sync
    ```

5.  **Inicie o servidor:**
    ```bash
    npm start
    ```
    Ou, para desenvolvimento com hot-reloading:
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:3000` por padrão, mas é possível mudar a porta através do arquivo de variáveis de ambiente.

## Como Utilizar a API

Você pode interagir com a API utilizando ferramentas como `curl`, Postman, Insomnia ou qualquer outra ferramenta HTTP client. Abaixo estão alguns exemplos:

**Listar todos os produtos:**

```bash
curl http://localhost:3000/api/products
````

**Buscar produto pelo ID:**

```bash
curl http://localhost:3000/api/products/1
````

**Criar um novo produto:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "name": "Novo Produto",
    "description": "Descrição do novo produto",
    "price": 25.99,
    "stockQuantity": 100
}' http://localhost:3000/api/products
````

**Atualizar um produto:**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
    "price": 29.99,
    "stockQuantity": 150
}' http://localhost:3000/api/products/1
````

**Deletar um produto:**

```bash
curl -X DELETE http://localhost:3000/api/products/1
````