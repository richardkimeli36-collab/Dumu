# Dumu API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.dumu.co.ke/api
```

## Authentication

Currently, the API is open. For production, implement JWT-based authentication.

## Products

### List Products

**Endpoint:** `GET /products`

**Query Parameters:**
- `page` (integer, default: 1) - Page number
- `limit` (integer, default: 20, max: 100) - Items per page
- `category` (string, optional) - Filter by category
- `supplier` (string, optional) - Filter by supplier
- `minPrice` (number, optional) - Minimum price
- `maxPrice` (number, optional) - Maximum price
- `search` (string, optional) - Search query
- `sort` (string, default: '-createdAt') - Sort field (-field for descending)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "prod_123",
        "name": "Corrugated Roofing Sheet - 26 Gauge",
        "description": "High-quality corrugated metal roofing sheet",
        "price": 2500,
        "currency": "KES",
        "category": "Roofing Sheets",
        "supplier": "Mabati Rolling Mills",
        "images": [
          {
            "url": "https://cdn.dumu.co.ke/products/sheet-001.jpg",
            "alt": "Product image",
            "width": 800,
            "height": 600
          }
        ],
        "specs": [
          {
            "key": "Length",
            "value": "3 meters"
          },
          {
            "key": "Gauge",
            "value": "26"
          }
        ],
        "inStock": true,
        "rating": 4.5,
        "reviews": 124
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 450,
      "pages": 23
    }
  }
}
```

### Get Product Details

**Endpoint:** `GET /products/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "prod_123",
    "name": "Corrugated Roofing Sheet - 26 Gauge",
    "description": "...",
    "longDescription": "Detailed product description...",
    "price": 2500,
    "currency": "KES",
    "category": "Roofing Sheets",
    "supplier": "Mabati Rolling Mills",
    "images": [...],
    "specs": [...],
    "inStock": true,
    "rating": 4.5,
    "reviews": 124,
    "relatedProducts": [...],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

## Categories

### List Categories

**Endpoint:** `GET /categories`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cat_001",
      "name": "Roofing Sheets",
      "description": "...",
      "productCount": 150,
      "icon": "🏠"
    }
  ]
}
```

## Suppliers

### List Suppliers

**Endpoint:** `GET /suppliers`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "sup_001",
      "name": "Mabati Rolling Mills SKE",
      "location": "Nairobi, Kenya",
      "productCount": 85,
      "rating": 4.7,
      "verified": true
    }
  ]
}
```

## Orders / Inquiries

### Create Order Inquiry

**Endpoint:** `POST /orders/inquiry`

**Request Body:**
```json
{
  "customerName": "John Doe",
  "phoneNumber": "+254712345678",
  "email": "john@example.com",
  "products": [
    {
      "productId": "prod_123",
      "quantity": 50
    },
    {
      "productId": "prod_456",
      "quantity": 30
    }
  ],
  "message": "Please provide a quote for bulk order"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "ord_789",
    "status": "pending",
    "whatsappUrl": "https://wa.me/254712345678?text=...",
    "message": "Inquiry created successfully. You will receive a quote via WhatsApp."
  }
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "phoneNumber",
        "message": "Invalid phone number format"
      }
    ]
  }
}
```

### Error Codes

- `VALIDATION_ERROR` (400) - Invalid request data
- `NOT_FOUND` (404) - Resource not found
- `RATE_LIMIT` (429) - Too many requests
- `INTERNAL_ERROR` (500) - Server error

## Rate Limiting

- Requests per minute: 60 (per IP)
- Requests per hour: 1000 (per IP)

Rate limit info is included in response headers:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1234567890
```
