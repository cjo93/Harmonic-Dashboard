# Deployment Guide

This guide covers various deployment options for Harmonic Dashboard, from simple static hosting to production-ready environments.

## Quick Deployment Options

### 1. Vercel (Recommended)

Vercel provides the easiest deployment for Next.js applications:

#### Deploy from GitHub

1. **Connect Repository**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Import Project"
   - Select your Harmonic Dashboard repository

2. **Configure Project**:
   ```bash
   # Project settings (auto-detected)
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables** (if needed):
   ```bash
   NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
   ```

4. **Deploy**:
   - Click "Deploy"
   - Automatic deployment on every push to main

#### Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel

# Follow prompts for configuration
```

### 2. Netlify

Alternative static hosting option:

1. **Connect Repository**:
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**:
   ```bash
   Build command: npm run build
   Publish directory: out
   ```

3. **Next.js Configuration**:
   ```javascript
   // next.config.js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   module.exports = nextConfig
   ```

### 3. GitHub Pages

For documentation or demo purposes:

1. **Configure Next.js for Static Export**:
   ```javascript
   // next.config.js
   const nextConfig = {
     output: 'export',
     basePath: '/Harmonic-Dashboard',
     assetPrefix: '/Harmonic-Dashboard/',
   }
   ```

2. **GitHub Actions Workflow**:
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '20'
             
         - name: Install dependencies
           run: npm install
           
         - name: Build
           run: npm run build
           
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

## Production Deployment

### 1. Docker Deployment

#### Single Container

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://localhost:3000/api
    restart: unless-stopped

  # Optional: Add database
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: harmonic_dashboard
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

#### Build and Run

```bash
# Build image
docker build -t harmonic-dashboard .

# Run container
docker run -p 3000:3000 harmonic-dashboard

# Or use docker-compose
docker-compose up -d
```

### 2. Kubernetes Deployment

#### Deployment Manifest

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: harmonic-dashboard
spec:
  replicas: 3
  selector:
    matchLabels:
      app: harmonic-dashboard
  template:
    metadata:
      labels:
        app: harmonic-dashboard
    spec:
      containers:
      - name: app
        image: harmonic-dashboard:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: NEXT_PUBLIC_API_URL
          value: "https://your-domain.com/api"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: harmonic-dashboard-service
spec:
  selector:
    app: harmonic-dashboard
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: harmonic-dashboard-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - your-domain.com
    secretName: harmonic-dashboard-tls
  rules:
  - host: your-domain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: harmonic-dashboard-service
            port:
              number: 80
```

#### Deploy to Kubernetes

```bash
# Apply manifests
kubectl apply -f k8s-deployment.yaml

# Check deployment status
kubectl get pods
kubectl get services
kubectl get ingress

# View logs
kubectl logs -f deployment/harmonic-dashboard
```

### 3. AWS Deployment

#### Using AWS Amplify

1. **Connect Repository**:
   ```bash
   # Install Amplify CLI
   npm install -g @aws-amplify/cli
   
   # Initialize Amplify
   amplify init
   
   # Add hosting
   amplify add hosting
   
   # Deploy
   amplify publish
   ```

#### Using AWS ECS with Fargate

```yaml
# task-definition.json
{
  "family": "harmonic-dashboard",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "harmonic-dashboard",
      "image": "your-ecr-repo/harmonic-dashboard:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/harmonic-dashboard",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### 4. Google Cloud Platform

#### Using Cloud Run

```bash
# Build and push to Container Registry
docker build -t gcr.io/PROJECT-ID/harmonic-dashboard .
docker push gcr.io/PROJECT-ID/harmonic-dashboard

# Deploy to Cloud Run
gcloud run deploy harmonic-dashboard \
  --image gcr.io/PROJECT-ID/harmonic-dashboard \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Environment Configuration

### Environment Variables

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com/api

# Optional: Database configuration
DATABASE_URL=postgresql://user:password@host:port/database

# Optional: External service configuration
GITHUB_COPILOT_API_KEY=your_api_key
ANALYTICS_ID=your_analytics_id

# Optional: Security configuration
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://your-domain.com
```

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for production
  swcMinify: true,
  
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Configure redirects if needed
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/documentation',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

## Monitoring and Observability

### Application Monitoring

#### Using Vercel Analytics

```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

#### Custom Monitoring

```typescript
// lib/monitoring.ts
export const trackEvent = (eventName: string, properties?: object) => {
  if (typeof window !== 'undefined') {
    // Send to your analytics service
    console.log('Event:', eventName, properties)
  }
}

export const trackError = (error: Error, context?: object) => {
  console.error('Application Error:', error, context)
  // Send to error tracking service (Sentry, Bugsnag, etc.)
}
```

### Health Checks

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0'
  }
  
  return NextResponse.json(healthCheck)
}
```

## Database Integration

### PostgreSQL Setup

```typescript
// lib/database.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect()
  try {
    const result = await client.query(text, params)
    return result
  } finally {
    client.release()
  }
}
```

### Database Migrations

```sql
-- migrations/001_initial_setup.sql
CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS documentation (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Considerations

### Production Security Checklist

- [ ] HTTPS enforcement
- [ ] Security headers configuration
- [ ] Environment variables security
- [ ] Input validation and sanitization
- [ ] Rate limiting implementation
- [ ] CORS configuration
- [ ] Authentication and authorization
- [ ] Dependency vulnerability scanning
- [ ] Container security scanning
- [ ] Regular security updates

### Security Headers

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]
```

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

### Caching Strategy

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300'
          }
        ]
      }
    ]
  }
}
```

## Troubleshooting Deployment Issues

### Common Issues

1. **Build Failures**:
   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Clear npm cache
   npm cache clean --force
   
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Memory Issues**:
   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

3. **Environment Variable Issues**:
   - Ensure all required variables are set
   - Check variable naming (NEXT_PUBLIC_ prefix for client-side)
   - Verify values are properly escaped

### Debugging Production Issues

```typescript
// Add logging middleware
export function middleware(request: NextRequest) {
  console.log('Request:', {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries())
  })
}
```

---

For more deployment strategies and advanced configurations, see the [Development Guide](../guides/development.md) or reach out via [GitHub Issues](https://github.com/cjo93/Harmonic-Dashboard/issues).