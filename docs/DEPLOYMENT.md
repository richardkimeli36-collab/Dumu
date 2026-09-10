# Dumu Deployment Guide

## Prerequisites

- Node.js 18+
- npm/yarn
- Git
- A hosting platform (Heroku, Railway, Vercel, AWS, etc.)
- MongoDB (optional, can use JSON for small datasets)

## Environment Setup

### Required Environment Variables

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.dumu.co.ke/api
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
NEXT_IMAGE_DOMAINS=cdn.dumu.co.ke,images.dumu.co.ke
```

#### Backend (.env.local)
```
NODE_ENV=production
PORT=5000
API_URL=https://api.dumu.co.ke
FRONTEND_URL=https://dumu.co.ke
MONGODB_URI=mongodb://user:pass@host:port/dumu
WHATSAPP_API_KEY=your_whatsapp_key
CORS_ORIGIN=https://dumu.co.ke
```

## Local Deployment Testing

### Build for Production

```bash
# Install dependencies
npm install

# Build both frontend and backend
npm run build

# Start production server
npm start
```

## Cloud Deployment

### Option 1: Vercel (Frontend) + Railway/Heroku (Backend)

#### Deploy Frontend to Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
# Or deploy via CLI
vercel --prod
```

#### Deploy Backend to Railway

1. Connect GitHub repo to Railway
2. Create new service, select Node.js
3. Set environment variables
4. Deploy

### Option 2: Docker + Any Cloud Provider

#### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install dependencies
RUN npm install
RUN cd server && npm install
RUN cd client && npm install

# Copy source code
COPY . .

# Build
RUN npm run build

# Expose ports
EXPOSE 3000 5000

# Start application
CMD ["npm", "start"]
```

#### Build and Push Image

```bash
docker build -t dumu-ecommerce .
docker tag dumu-ecommerce your-registry/dumu-ecommerce:latest
docker push your-registry/dumu-ecommerce:latest
```

### Option 3: AWS (Full Stack)

#### Frontend on CloudFront + S3

1. Build Next.js: `npm run build:client`
2. Upload `out/` directory to S3
3. Configure CloudFront distribution
4. Set S3 bucket as origin

#### Backend on EC2 or ECS

1. Create EC2 instance (Ubuntu 22.04)
2. Install Node.js and dependencies
3. Clone repository
4. Install PM2 for process management
5. Start application

```bash
# On EC2 instance
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

git clone https://github.com/richardkimeli36-collab/Dumu.git
cd Dumu
npm install
npm run build

npm install -g pm2
pm2 start "npm start" --name dumu-api
pm2 startup
pm2 save
```

## Database Setup

### MongoDB Atlas (Cloud)

1. Create account at mongodb.com/cloud
2. Create new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string
6. Set `MONGODB_URI` in environment

### Local MongoDB

```bash
# Install MongoDB
sudo apt-get install -y mongodb-org

# Start service
sudo systemctl start mongod

# Connection string
MONGODB_URI=mongodb://localhost:27017/dumu
```

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm install -g @railway/cli
          railway up
```

## SSL/TLS Certificate

For production, use Let's Encrypt:

```bash
# Using Certbot
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d dumu.co.ke -d api.dumu.co.ke
```

## Monitoring & Logging

### Application Monitoring

- **Error Tracking**: Sentry or LogRocket
- **Performance**: New Relic or DataDog
- **Uptime**: UptimeRobot or Pingdom

### Log Aggregation

```bash
# Using Winston for logging
npm install winston
```

## Performance Optimization

1. **Enable Caching**
   - CloudFlare for CDN
   - Redis for API caching
   - Browser caching headers

2. **Compression**
   - Enable gzip compression
   - Minify CSS/JS

3. **Image Optimization**
   - CloudFlare Image Optimization
   - ImageKit for dynamic resizing

4. **Database**
   - Create indexes
   - Enable replication
   - Regular backups

## Backup & Recovery

### Database Backup

```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/dumu" --out=./backup

# MongoDB restore
mongorestore --uri="mongodb://localhost:27017/dumu" ./backup
```

### Scheduled Backups

```bash
# Add to crontab
0 2 * * * mongodump --uri="mongodb://..." --out=/backups/$(date +%Y%m%d)
```

## Troubleshooting

### Common Issues

1. **Connection Timeout**
   - Check firewall rules
   - Verify database connection string
   - Check network connectivity

2. **Out of Memory**
   - Increase Node.js heap size: `NODE_OPTIONS=--max-old-space-size=4096`
   - Implement pagination
   - Use streaming for large datasets

3. **High CPU Usage**
   - Profile with Node.js profiler
   - Optimize database queries
   - Add caching layer

## Support

For deployment issues, check:
- Application logs
- Platform documentation
- GitHub Issues
