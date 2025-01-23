# Welcome to Boardcamp API
The API for the lovers of board games. Boardcamp API handles REST requests for board games rentals as described below

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
	"message": "Client João Alfredo registred"
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
  "message": "Rental on 19/01/2025 registred"
}
```
### POST /rentals/:rentalId/return
```
{
  "message": "Rental of Banco Imobiliário returned at 21/01/2025"
}
```