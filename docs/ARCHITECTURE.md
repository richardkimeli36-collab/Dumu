# Dumu Architecture Guide

## System Overview

Dumu is a full-stack e-commerce platform with a clear separation between frontend and backend:

```
┌─────────────────┐
│   Web Browser   │
│   (Next.js)     │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  Express API    │
│  (Backend)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Data Store    │
│ (JSON/MongoDB)  │
└─────────────────┘
```

## Frontend Architecture (Next.js)

### Directory Structure
```
app/
├── page.tsx                 # Home page
├── products/
│   ├── page.tsx            # Products listing
│   └── [id]/page.tsx       # Product detail
├── cart/
│   └── page.tsx            # Shopping cart
├── layout.tsx              # Root layout
└── api/                    # Route handlers

components/
├── ProductCard.tsx         # Reusable product component
├── ProductGrid.tsx         # Grid layout with infinite scroll
├── ImageOptimizer.tsx      # Image optimization wrapper
├── FilterPanel.tsx         # Product filters
└── WhatsAppButton.tsx      # WhatsApp integration

services/
├── api.ts                  # API client
└── products.ts             # Product service

huoks/
├── useInfiniteScroll.ts    # Infinite scroll logic
└── useImageOptimization.ts # Image optimization hook

types/
└── product.ts              # TypeScript interfaces
```

### Data Flow
1. User loads products page
2. `ProductGrid` component fetches initial products via `api.ts`
3. React Query caches the data
4. As user scrolls, `useInfiniteScroll` hook triggers API call for next page
5. Images are optimized via `next/image` with lazy loading
6. User can filter/sort using `FilterPanel`
7. Product details available on click

## Backend Architecture (Express)

### Directory Structure
```
routes/
├── products.ts            # Product endpoints
├── categories.ts          # Category endpoints
├── orders.ts              # Order/inquiry endpoints
└── index.ts               # Route aggregation

controllers/
├── productController.ts    # Product logic
├── orderController.ts      # Order logic
└── filterController.ts     # Filter/search logic

services/
├── productService.ts       # Data access
├── imageService.ts         # Image optimization metadata
└── whatsappService.ts      # WhatsApp integration

middleware/
├── validation.ts           # Request validation
├── errorHandler.ts         # Error handling
└── cors.ts                 # CORS configuration

data/
├── products.json           # Product catalogue
├── categories.json         # Product categories
└── suppliers.json          # Supplier information
```

### API Endpoints

```
GET  /api/products              # List all products (paginated)
GET  /api/products/:id          # Get product details
GET  /api/products/search       # Search products
GET  /api/categories            # List categories
GET  /api/suppliers             # List suppliers
POST /api/orders/inquiry        # Create WhatsApp inquiry
```

## Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  supplier: string;
  images: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];
  specs: {
    key: string;
    value: string;
  }[];
  inStock: boolean;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order Inquiry
```typescript
interface OrderInquiry {
  id: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: Date;
}
```

## Key Features Implementation

### Infinite Scroll
- **Frontend**: Intersection Observer API detects when user scrolls near bottom
- **Backend**: Offset-based pagination (page + limit parameters)
- **Caching**: React Query manages infinite query state

### Image Optimization
- **Format**: WebP with JPEG fallback
- **Responsive**: Multiple sizes via srcset
- **Lazy Loading**: Loading="lazy" attribute
- **CDN Ready**: Image URLs can point to CDN

### WhatsApp Integration
- **Frontend**: Pre-fills order details in WhatsApp message
- **Backend**: Validates inquiry and logs to database
- **Format**: Formatted message with product info and pricing

## Performance Considerations

1. **Image Optimization**: Automatic format conversion (WebP/AVIF)
2. **Code Splitting**: Dynamic imports for heavy components
3. **Caching**: React Query for API responses
4. **Virtual Scrolling**: Only render visible items in large lists
5. **API Rate Limiting**: Prevent abuse of endpoints

## Security

1. **CORS**: Configured to allow only trusted origins
2. **Input Validation**: All user inputs validated on backend
3. **Rate Limiting**: Prevent brute force attacks
4. **Environment Variables**: Sensitive data in .env files
5. **HTTPS**: Required for production

## Scalability

1. **Database**: MongoDB for horizontal scaling
2. **Caching**: Redis for frequently accessed data
3. **CDN**: Image delivery via CDN
4. **Load Balancing**: Multiple server instances
5. **Async Processing**: Queue system for heavy tasks
