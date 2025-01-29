# Welcome to Boardcamp API
The API for the lovers of board games.
## About
Boardcamp is a REST API to manage board games rentals.

## How to run for development
1. Clone this repository
```
git clone https://github.com/TSaytson/boardcamp-node
```
2. Install the dependencies (remove pnpm-lock.yaml if using other package manager than pnpm)
```
pnpm i
```
3. Create a PostgreSQL database with the name you want
4. Configure the .env file using the .env.example file
5. Run all migrations
```
pnpm dlx prisma migrate dev
```
6. Run the back-end in a development environment:
```
pnpm dev
```
## How to run tests
1. Configure the .env.test file using the .env.example file
2. Run all migrations
```
pnpm test:migration:generate
```
3. Run tests: (locally)
```
pnpm test
```
## How to run with docker
1. Configure the .env file accordingly to .env.example file
2. Run docker compose
```
docker compose up -d (Ubuntu)
```
3. Run migration script
```
docker exec boardcamp_api pnpm deploy:migration:generate
```

Boardcamp API handles REST requests for board games rentals as described below

## Categories

### GET /categories
```
[
  {
    "id": 1,
    "name": 'strategy'
  },
  {
    "id": 2,
    "name": "criminal"
  },
]
```

### POST /categories
#### body
```
{
  "name": 'strategy',
}
```
#### Response
#### status 201
```
{
  "message": "Category strategy created"
}
```
## Customers

### GET /customers
#### Response
```
{
  "id": 1,
  "name": 'João Alfredo',
  "cpf": '01234567890'
  "birthday": '1994-04-28',
  "phone": '31999999999'
}
```
### GET /customers/:customerId
#### Response
```
{
  "id": 1,
  "name": 'João Alfredo',
  "cpf": '01234567890'
  "birthday": '1994-04-28',
  "phone": '31999999999'
}
```
### POST /customers
#### body
```
{
  "name": 'João Alfredo',
  "cpf": '01234567890',
  "birthday": '1994-04-28',
  "phone": '31999999999'
}
```
#### Response
#### status 201
```
{
	"message": "Client João Alfredo registered"
}
```
### PUT /customers/:customerId
#### body
```
{
  "name": 'João Alfredo',
  "birthday": '1994-04-28',
  "phone": '31999999999'
}
```
#### Response
#### status 200
```
{
	"message": "Client data updated"
}
```
## Games

### GET /games
```
[
  {
    "id": 1,
    "name": 'Banco Imobiliário',
    "image": 'http://www.imagem.com.br/banco_imobiliario.jpg',
    "stockTotal": 3,
    "categoryId": 1,
    "pricePerDay": 1500,
    "categories": {
      "name": "strategy"
    }
  },
  {
    "id": 2,
    "name": 'Detetive',
    "image": 'http://',
    "stockTotal": 1,
    "categoryId": 2,
    "pricePerDay": 2500,
    "categories": {
      "name": "criminal"
    }
  },
]
```

### POST /games
#### body
```
{
  "name": 'Banco Imobiliário',
  "image": 'http://www.imagem.com.br/banco_imobiliario.jpg',
  "stockTotal": 3,
  "pricePerDay": 1500,
  "categoryId": 1
}
```
#### Response
#### status 201
```
{
	"message": "Game Banco Imobiliário saved"
}
```
## Rentals
### GET /rentals
```
[
  {
    "id": 1,
    "rentDate": '2021-06-20T00:00.000Z',
    "customerId": 1,
    "gameId": 1,
    "daysRented": 3,
    "returnDate": null, // Changes to the date the game is returned
    "originalPrice": 4500,
    "delayFee": 0, // Changes to pricePerDay*delayedDays in case the game is returned with delay
    "customers": {
      id: 1,
      name: 'João Alfredo'
    },
    "games": {
      "id": 1,
		  "name": 'Banco Imobiliário',
		  "categories": {
        "id": 1,
        "name": "strategy"
      }
    }
  }
]
```
### POST /rentals
```
{
  customerId: 1,
  gameId: 1,
  daysRented: 3
}
```
#### Response
#### status 201
```
{
  "message": "Rental on 19/01/2025 registered"
}
```
### POST /rentals/:rentalId/return
```
{
  "message": "Rental of Banco Imobiliário returned at 21/01/2025"
}
```