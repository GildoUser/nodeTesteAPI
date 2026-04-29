projeto simples com o intuito de aprender API

tecnologias:

Node.js
Express
Zod
SQLite3
Morgan
Dotenv


instalação:

1. git clone https://github.com/GildoUser/nodeTesteAPI
2. cd nodeTesteAPI
3. npm install
4. >> criar arquivo .env na raiz do projeto com a chave PORT=3000 OU PORT="SUA PORTA PREFERIDA"
5. rodar o arquivo com > node index.js

o servidor estará disponível em localhost:3000 ou na sua porta de escolha

Endpoints

CUSTOMERS

GET /customers -> lista todos os customers
GET /customers/:id -> busca customer pelo id
POST /customers -> cria um novo customer !!! esperado > {name, address, email}
PATCH /customers/:id -> atualiza dados do customer
DELETE /customers/:id -> deleta um customer

exemplo novo customer 

{
 "email": "gil@gmail.com",
    "name": "gil teste",
 "address": "rua dos users"
 }

PRODUCTS

GET /products -> lista todos os produtos
GET /products/:id -> busca produto pelo id
POST /products -> cria um novo produto !!! esperado > {name, price} > também pode receber {name, price, description} se houver descrição
PATCH /products/:id -> atualiza dados do produto
DELETE /products/:id -> deleta um produto SE ELE NÃO ESTIVER SENDO UTILIZADO

exemplo novo produto

{
"name": "banana",
"price": 100
}

ORDERS

GET /orders -> lista todas as orders
GET /orders/:id -> busca order pelo id
GET /orders/:id/full -> busca order completa com os itens
POST /orders cria uma nova order 
exemplo
{   
  "customer_id":2,
  "order_items":[
      {"product_id": 12, "quantity": 3},
      {"product_id": 2, "quantity": 2}
  ]
}



Códigos de status utilizados: 200, 201, 400, 404, 500.