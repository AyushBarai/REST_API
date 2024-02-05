## REST_API_TEST AND E-Commerce API ##

## Table of Contents ##
- Features
- Technologies Used
- Getting Started
- API Endpoints
- Testing
- Postman

## Product and Product Variant CRUD Operations: ##

- Endpoints for creating, updating, deleting, and retrieving products.
- Products have a name, description, and price, and can have multiple variants.
- Variants have a name, SKU, additional cost, and stock count.

## Search Functionality: ##

- Endpoint for searching products by name, description, or variant name.

## Test Driven Development: ##

- Unit tests for models.
- Integration tests for each API endpoint.
- Tests for search functionality.

## Technologies Used ##
- Node.js
- Express.js
- MongoDB (Mongoose)
- Jest (Testing)
- REST API



## Getting Started ##

1. Clone the repository:

- Use VS Code or any other IDE and then clone the project locally using:
```bash
    git clone https://github.com/AyushBarai/REST_API.git
```

2. Install dependencies:

- Go to the project file and install dependencies using:
```bash
    cd {filename}
    npm install
```

3. Install and run MongoDB Compass in the background.

4. Run the server:
```bash
    npm start
```

5. Testing:

- Run tests using Jest:
```bash
   npm test
```

## API Endpoints ##

- POST /api/products: Create a new product.
- GET /api/products: Get all products.
- GET /api/products/:id: Get a product by ID.
- PUT /api/products/:id: Update a product.
- DELETE /api/products/:id: Delete a product.
- GET /api/products/search/:query: Search for products.

## Postman ##

- POST Product Operation
Endpoint:
```bash
http://localhost:3000/api/products
```
```bash
Json Body:
{
  "name": "New Product",
  "description": "This is a new product",
  "price": 19.99,
  "variants": [
    {
      "name": "Variant 1",
      "sku": "V1SKU",
      "additional_cost": 5.00,
      "stock_count": 100
    }
  ]
}
```


- GET Product Operation
Endpoint:
```bash
http://localhost:3000/api/products/
```


- GET Product Operation by ID
Endpoint:
```bash
http://localhost:3000/api/products/{ProductID}
```


- PUT Operation
Endpoint:
```bash
http://localhost:3000/api/products/65bde6a39ee5e92c36125561
```
```bash
Json Body:
{
  "name": "New Product 2",
  "description": "This is a new product 2",
  "price": 29.99,
  "variants": [
    {
      "name": "Variant 2",
      "sku": "V2SKU",
      "additional_cost": 10.00,
      "stock_count": 200
    }
  ]
}
```


- DELETE Operation
Endpoint:
```bash
http://localhost:3000/api/products/{ProductID}
```


- GET Search Query
Endpoint:
```bash
http://localhost:3000/api/products/search/{name, description, or variant name}
```
