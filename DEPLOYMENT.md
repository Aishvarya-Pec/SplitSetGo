# SplitSetGo - Deployment Guide

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Database (SQLite for development, PostgreSQL/MySQL for production)
- Clerk account for authentication

## Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Configure your environment variables in `.env`:
   - `DATABASE_URL`: Your database connection string
   - `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
   - `CLERK_SECRET_KEY`: Your Clerk secret key
   - `NEXT_PUBLIC_APP_URL`: Your application URL

## Development

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

## Production Build

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate deploy

# Build for production
npm run build:prod

# Start production server
npm run start
```

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build command: `npm run build:prod`
2. Publish directory: `dist`
3. Set environment variables in Netlify dashboard

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build:prod
EXPOSE 8080
CMD ["npm", "run", "start"]
```

## Database Setup

### Production Database
- Use PostgreSQL or MySQL for production
- Update `DATABASE_URL` in your environment
- Run migrations: `npx prisma migrate deploy`

### Environment Variables for Production
- Set `NODE_ENV=production`
- Ensure all required environment variables are set
- Use secure values for all keys and secrets

## Performance Optimization

The build is optimized with:
- Code splitting for vendor libraries
- Terser minification
- Console removal in production
- Source maps only in development

## Security Checklist

- [ ] All environment variables are set securely
- [ ] Database credentials are not exposed
- [ ] HTTPS is enabled in production
- [ ] Clerk authentication is properly configured
- [ ] CORS settings are configured if needed

## Monitoring

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring
- Uptime monitoring

## Support

For deployment issues, check:
1. Environment variables are correctly set
2. Database is accessible
3. Clerk configuration is valid
4. Build logs for any errors