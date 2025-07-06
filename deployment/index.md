# Deployment Guide

Complete guide for deploying the Lab Equipment Management System in production.

## Docker Deployment (Recommended)

### Prerequisites

- Docker Engine 20.0+
- Docker Compose 2.0+
- Domain name (for production)
- SSL certificate (recommended)

### Production Setup

<div class="code-block">
<pre><code># Clone repositories
git clone https://github.com/knightempire/lab-backend.git
git clone https://github.com/knightempire/lab-frontend.git

# Create production environment files
cp backend/.env.example backend/.env.production
cp frontend/.env.example frontend/.env.production
</code></pre>
</div>

### Docker Compose Configuration

<div class="code-block">
<pre><code># docker-compose.prod.yml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    container_name: lems-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - lems-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.prod
    container_name: lems-backend
    restart: unless-stopped
    environment:
      NODE_ENV: production
      DB_HOST: mongodb
      DB_PORT: 27017
      DB_NAME: ${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
      EMAIL_HOST: ${EMAIL_HOST}
      EMAIL_USER: ${EMAIL_USER}
      EMAIL_PASS: ${EMAIL_PASS}
    depends_on:
      - mongodb
    networks:
      - lems-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
      args:
        NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
    container_name: lems-frontend
    restart: unless-stopped
    depends_on:
      - backend
    networks:
      - lems-network

  nginx:
    image: nginx:alpine
    container_name: lems-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/ssl:ro
    depends_on:
      - frontend
      - backend
    networks:
      - lems-network

volumes:
  mongodb_data:

networks:
  lems-network:
    driver: bridge
</code></pre>
</div>

### Nginx Configuration

<div class="code-block">
<pre><code># nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:5000;
    }
    
    upstream frontend {
        server frontend:3000;
    }
    
    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name your-domain.com;
        return 301 https://$server_name$request_uri;
    }
    
    # HTTPS Configuration
    server {
        listen 443 ssl http2;
        server_name your-domain.com;
        
        ssl_certificate /etc/ssl/fullchain.pem;
        ssl_certificate_key /etc/ssl/privkey.pem;
        
        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        # Backend API
        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
</code></pre>
</div>

## Environment Variables

### Production Backend Environment

<div class="code-block">
<pre><code># .env.production (Backend)
NODE_ENV=production
PORT=5000

# Database
DB_HOST=mongodb
DB_PORT=27017
DB_NAME=lems_production
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=your-secure-password

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRE=7d
PASETO_SECRET=your-paseto-secret-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=your-app-password
FROM_NAME=LEMS Team
FROM_EMAIL=noreply@yourdomain.com

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
</code></pre>
</div>

### Production Frontend Environment

<div class="code-block">
<pre><code># .env.production (Frontend)
NEXT_PUBLIC_API_URL=https://your-domain.com/api
NEXT_PUBLIC_APP_NAME=Lab Equipment Management System
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
</code></pre>
</div>

## Cloud Deployment

### AWS Deployment

<div class="api-endpoint">
  <h3>☁️ AWS EC2 Setup</h3>
  <ol>
    <li>Launch EC2 instance (t3.medium or larger)</li>
    <li>Configure security groups (ports 80, 443, 22)</li>
    <li>Install Docker and Docker Compose</li>
    <li>Clone repositories and configure environment</li>
    <li>Set up Route 53 for domain management</li>
    <li>Configure Application Load Balancer</li>
  </ol>
</div>

### Digital Ocean Deployment

<div class="code-block">
<pre><code># Create Droplet
doctl compute droplet create lems-prod \
  --image docker-20-04 \
  --size s-2vcpu-4gb \
  --region nyc1 \
  --ssh-keys your-ssh-key-id

# Connect and deploy
ssh root@your-droplet-ip
git clone https://github.com/knightempire/lab-backend.git
git clone https://github.com/knightempire/lab-frontend.git
docker-compose -f docker-compose.prod.yml up -d
</code></pre>
</div>

## SSL Certificate Setup

### Let's Encrypt with Certbot

<div class="code-block">
<pre><code># Install certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
</code></pre>
</div>

## Monitoring and Logging

### Docker Logging

<div class="code-block">
<pre><code># View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Log rotation
version: '3.8'
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
</code></pre>
</div>

### Health Checks

<div class="code-block">
<pre><code># Health check endpoints
GET /api/health
{
  "status": "ok",
  "timestamp": "2025-01-06T10:30:00Z",
  "services": {
    "database": "connected",
    "email": "configured"
  }
}
</code></pre>
</div>

## Security Checklist

<div class="api-endpoint">
  <h3>🔒 Production Security</h3>
  <ul class="space-y-2">
    <li>✅ Enable HTTPS with valid SSL certificate</li>
    <li>✅ Configure strong passwords and secrets</li>
    <li>✅ Enable rate limiting on API endpoints</li>
    <li>✅ Set up firewall rules (UFW/iptables)</li>
    <li>✅ Configure MongoDB authentication</li>
    <li>✅ Enable CORS with specific origins</li>
    <li>✅ Set security headers in Nginx</li>
    <li>✅ Regular security updates</li>
  </ul>
</div>

## Backup Strategy

### Database Backup

<div class="code-block">
<pre><code># MongoDB backup script
#!/bin/bash
BACKUP_DIR="/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup
docker exec lems-mongodb mongodump \
  --username $MONGO_ROOT_USER \
  --password $MONGO_ROOT_PASSWORD \
  --authenticationDatabase admin \
  --out /backup

# Copy to host
docker cp lems-mongodb:/backup $BACKUP_DIR/$DATE

# Compress and cleanup
tar -czf $BACKUP_DIR/lems_backup_$DATE.tar.gz $BACKUP_DIR/$DATE
rm -rf $BACKUP_DIR/$DATE

# Keep only last 7 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
</code></pre>
</div>

## Performance Optimization

### Production Optimizations

<div class="code-block">
<pre><code># Backend optimizations
NODE_ENV=production
NODE_OPTIONS="--max-old-space-size=2048"

# Frontend build optimizations
NEXT_PUBLIC_DISABLE_STATIC_OPTIMIZATION=false
NEXT_PUBLIC_OPTIMIZE_IMAGES=true
NEXT_PUBLIC_COMPRESS=true
</code></pre>
</div>

## Troubleshooting

### Common Issues

<div class="api-endpoint">
  <h4>❌ Container Won't Start</h4>
  <ul>
    <li>Check Docker logs: <code>docker-compose logs service-name</code></li>
    <li>Verify environment variables</li>
    <li>Check port conflicts</li>
    <li>Ensure proper file permissions</li>
  </ul>
</div>

<div class="api-endpoint">
  <h4>❌ Database Connection Failed</h4>
  <ul>
    <li>Verify MongoDB container is running</li>
    <li>Check network connectivity between containers</li>
    <li>Verify database credentials</li>
    <li>Check MongoDB logs for errors</li>
  </ul>
</div>

## Deployment Checklist

- [ ] Domain name configured and DNS pointing to server
- [ ] SSL certificate installed and configured
- [ ] Environment variables set for production
- [ ] Database secured with authentication
- [ ] Firewall configured with necessary ports
- [ ] Backup strategy implemented
- [ ] Monitoring and logging set up
- [ ] Health checks configured
- [ ] Load testing completed
- [ ] Security audit performed

## Maintenance

### Regular Tasks
- **Weekly**: Review logs and performance metrics
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Full security audit and backup testing
- **Yearly**: Infrastructure review and capacity planning
