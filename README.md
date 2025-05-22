# API de Gerenciamento de clientes✨

Este projeto é uma API de Gerenciamento de Clientes desenvolvida com Node.js e TypeScript, utilizando como banco de dados MongoDb e tomando de base a arquitetura MVC. A Api conta com o CRUD de clientes, onde é possível cadastrar, listar, editar e excluir clientes. Um projeto simples, mas que demonstra a utilização de boas práticas de desenvolvimento e a criação de uma API RESTful e utilização de banco de dados NoSQL hospedados online (MongoDb Atlas).

## Funcionalidades da API
A API permite o gerenciamento de clientes forma eficiente e segura. As principais funcionalidades incluem:

- Cadastro de clientes
- Atualização do cadastro dos clientes
- Deleção do cadastro de clientes
- Exibir cadastro de cliente
- Exibir cadastro de todos os clientes

## Tecnologias Utilizadas
- NodeJs
- Typescript
- NestJS
- TypeORM
- MongoDb
## Regras de Uso
Para usar a API de Lista de Tarefas, siga os passos abaixo:

1. Clone este repositório:
```
    git clone https://github.com/italomsilva/nest-customer-manager.git
```
2. Instale as dependências:
```
cd nest-customer-manager
npm install
```
3. Configure as variáveis de ambiente:
- Crie um arquivo .env na raiz do projeto
- Adicione as variáveis
```
    PORT= 3000 #(Fica a sua escolha)
    DB_URL= https://urldosebanco.com 
```

4. Inicie a aplicação:
```
npm run start
```
5. Acesse a API
A API estará disponível em http://localhost:3000 (porta escolhida no arquivo .env). Utilize ferramentas como Postman ou Insomnia para interagir com a API.

## Endpoints
- __GET /customer/all:__ Retorna uma lista de todos os clientes.
- __GET /customer?page=1&limit=20:__ Retorna uma lista de todos os clientes com paginação
- __GET /customer/:customerNumber:__ Retorna o cadastro de um cliente com base no seu numero de cliente.
- __POST /customer:__ Cadastra um novo cliente.
- __PUT /customer:__ Edita o cadastro de um cliente.
- __DELETE /customer:__ Deleta o cadastro de um cliente.

### Licença
Este projeto está licenciado sob a Licença MIT.


