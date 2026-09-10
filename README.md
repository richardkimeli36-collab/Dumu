# Dumu - Roofing Materials E-Commerce Platform

A full-stack e-commerce platform for selling roofing materials (Mabati) and related products in Kenya.

## 🚀 Features

- **Product Catalogue**: Browse extensive product listings with multiple suppliers
- **Infinite Scroll**: Seamless product discovery without pagination
- **Lazy Loading**: Optimized image loading for better performance
- **Responsive Design**: Mobile-first approach with modern UI
- **Image Optimization**: WebP/AVIF support with automatic fallbacks
- **WhatsApp Integration**: Direct customer inquiry via WhatsApp
- **Product Filtering**: Filter by price, category, and more
- **JSON API**: RESTful API for product data management

## 📋 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **Framer Motion** - Smooth animations
- **next/image** - Automatic image optimization

### Backend
- **Node.js + Express** - REST API server
- **TypeScript** - Type safety
- **MongoDB** - Database (optional, can use JSON files)
- **Joi** - Schema validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Dumu/
├── client/                    # Next.js frontend
│   ├── src/
│   │   ├── app/              # App Router pages and layouts
│   │   ├── components/       # Reusable React components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service clients
│   │   ├── types/            # TypeScript types
│   │   └── styles/           # Global styles
│   ├── public/               # Static assets (images, logos)
│   ├── next.config.js        # Next.js configuration
│   └── package.json
│
├── server/                    # Express API backend
│   ├── src/
│   │   ├── routes/           # API route handlers
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Express middleware
│   │   ├── services/         # Data services
│   │   ├── types/            # TypeScript types
│   │   ├── data/             # Product data (JSON/MongoDB)
│   │   └── index.ts          # Entry point
│   ├── .env.example          # Environment variables template
│   └── package.json
│
├── docs/                      # Documentation
│   ├── API.md                # API documentation
│   ├── ARCHITECTURE.md       # System architecture
│   └── DEPLOYMENT.md         # Deployment guide
│
└── README.md
```

## 🏃 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/richardkimeli36-collab/Dumu.git
cd Dumu
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cd server
cp .env.example .env.local
cd ../client
cp .env.example .env.local
cd ..
```

4. Start development servers:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- API: http://localhost:5000

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Implementation Guides](./docs/) - Technical implementation details

## 🎯 Key Optimizations

### Image Optimization
- Automatic WebP/AVIF conversion
- Responsive images with srcset
- Lazy loading with IntersectionObserver
- CDN-ready image delivery

### Performance
- Infinite scroll with virtual scrolling for large lists
- Server-side pagination API
- Client-side caching with React Query
- Code splitting and dynamic imports

### UX Features
- Real-time product filtering
- Price range sorting
- WhatsApp order inquiry
- Product comparison
- Wishlist functionality

## 🔧 Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Linting and Formatting
```bash
npm run lint
npm run format
```

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📞 Support

For issues and questions, please open an issue on GitHub or contact us via WhatsApp.
