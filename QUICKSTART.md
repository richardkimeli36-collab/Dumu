# Dumu - Quick Start Guide

🎉 **Welcome to Dumu!** A full-stack e-commerce platform for roofing materials and building supplies in Kenya.

## ⚡ 5-Minute Setup

### Step 1: Clone & Install

```bash
# You already have the repo, so just install dependencies
cd Dumu
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Configure Environment Variables

**Frontend** (`client/.env.local`):
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend** (`server/.env.local`):
```bash
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### Step 3: Start Development Servers

**Terminal 1 - Frontend (Next.js):**
```bash
cd client
npm run dev
# Opens at http://localhost:3000
```

**Terminal 2 - Backend (Express):**
```bash
cd server
npm run dev
# Starts at http://localhost:5000
```

**Or run both together:**
```bash
npm run dev  # From root directory (requires concurrently)
```

✅ **That's it!** Your e-commerce platform is now running!

---

## 🌐 Access Your Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

---

## 📁 Project Structure

```
Dumu/
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/              # Pages and layouts
│   │   ├── components/       # Reusable React components
│   │   ├── hooks/            # Custom React hooks (useProducts, useCart)
│   │   ├── services/         # API client
│   │   ├── types/            # TypeScript interfaces
│   │   └── styles/           # Global CSS
│   ├── public/               # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
├── server/                    # Express Backend
│   ├── src/
│   │   ├── controllers/      # Business logic handlers
│   │   ├── services/         # Data access layer
│   │   ├── routes/           # API endpoints
│   │   ├── middleware/       # Error handling, validation
│   │   ├── types/            # TypeScript interfaces
│   │   ├── data/             # JSON data (products, categories)
│   │   └── index.ts          # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── docs/                      # Documentation
│   ├── API.md                # API endpoints reference
│   ├── ARCHITECTURE.md        # System design
│   └── DEPLOYMENT.md          # Production deployment
│
├── package.json              # Root package.json
├── README.md                 # Main README
└── CONTRIBUTING.md           # Contribution guidelines
```

---

## 🔑 Key Features

### Frontend (Next.js)
✅ **Infinite Scroll** - Browse products seamlessly
✅ **Image Optimization** - Automatic WebP/AVIF conversion
✅ **Lazy Loading** - Fast page loads with IntersectionObserver
✅ **Shopping Cart** - Zustand-based state management
✅ **Responsive Design** - Mobile-first Tailwind CSS
✅ **TypeScript** - Full type safety

### Backend (Express)
✅ **Product API** - Filter, search, paginate products
✅ **Categories & Suppliers** - Browse by category or supplier
✅ **WhatsApp Integration** - Direct order inquiries via WhatsApp
✅ **Rate Limiting** - API protection against abuse
✅ **Error Handling** - Consistent error responses
✅ **CORS** - Cross-origin resource sharing configured

---

## 📚 Available NPM Scripts

### Frontend
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
```

### Backend
```bash
cd server
npm run dev          # Start development server with ts-node
npm run build        # Compile TypeScript to JavaScript
npm start            # Run compiled JavaScript
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
```

### Root
```bash
npm run dev          # Run both frontend and backend
npm run build        # Build both frontend and backend
npm run start        # Start production server
```

---

## 🧪 Test the Application

### 1. View Products
Visit http://localhost:3000 and see the featured products grid.

### 2. Infinite Scroll
Scroll down to load more products automatically.

### 3. Browse Products Page
Go to http://localhost:3000/products for the full catalogue.

### 4. Add to Cart
Click "Add to Cart" on any product.

### 5. View Cart
Click the cart icon and fill in your details.

### 6. WhatsApp Inquiry
Submit the form to generate a WhatsApp message pre-filled with your order.

---

## 🔌 API Endpoints

### Products
```bash
GET /api/products              # List products (paginated, 20 per page)
GET /api/products/:id          # Get product details
GET /api/products/search?q=    # Search products
```

### Categories
```bash
GET /api/categories            # List all categories
```

### Suppliers
```bash
GET /api/suppliers             # List all suppliers
```

### Orders
```bash
POST /api/orders/inquiry       # Create WhatsApp order inquiry
```

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/orders/inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "phoneNumber": "+254712345678",
    "email": "john@example.com",
    "products": [{"productId": "prod_001", "quantity": 50}],
    "message": "Please provide a quote"
  }'
```

---

## 🛠️ Customization

### Adding Products
Edit `server/src/data/products.json` to add more products.

### Changing Styles
Modify `client/tailwind.config.js` to customize colors and themes.

### Configuring API URL
Update `NEXT_PUBLIC_API_URL` in `client/.env.local`.

### Changing Port
Update `PORT` in `server/.env.local`.

---

## 📦 Building for Production

### Frontend
```bash
cd client
npm run build
npm start  # Runs optimized production build
```

### Backend
```bash
cd server
npm run build
npm start  # Runs compiled JavaScript
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### CORS Errors
Make sure `CORS_ORIGIN` in server `.env.local` matches your frontend URL.

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend Not Starting
Check that port 5000 is not in use and Node.js is installed (v18+).

---

## 📚 Full Documentation

- **[API Documentation](./docs/API.md)** - Complete API reference
- **[Architecture Guide](./docs/ARCHITECTURE.md)** - System design and data flow
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment steps

---

## 💡 Next Steps

1. **Explore the Code** - Check out the components and services
2. **Add More Products** - Populate the database with real products
3. **Customize Styles** - Match your brand colors and design
4. **Integrate Database** - Connect MongoDB for production
5. **Deploy** - Follow the deployment guide for your hosting platform

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute.

---

## 📝 License

MIT License - See LICENSE file for details.

---

## 💬 Need Help?

- Check the documentation files in `/docs`
- Review the API documentation
- Check the architecture guide for system design

**Happy coding! 🚀**
