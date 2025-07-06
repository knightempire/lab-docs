# Deployment Guide

Complete guide for deploying the Lab Equipment Management System in production environments.

## Prerequisites

Before deploying LEMS, ensure you have:

- **Server**: VPS or cloud instance with minimum 2GB RAM
- **Domain**: Registered domain name with DNS access
- **SSL Certificate**: Let's Encrypt or commercial SSL
- **Database**: MongoDB Atlas or self-hosted MongoDB
- **Email Service**: SMTP provider (Gmail, SendGrid, etc.)

## Quick Deployment

### 1. Server Preparation

```bash
# Clone repositories
git clone https://github.com/knightempire/lab-backend.git
git clone https://github.com/knightempire/lab-frontend.git

# Create production environment files
cp backend/.env.example backend/.env.production
cp frontend/.env.example frontend/.env.production
```

### Docker Compose Configuration

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  # MongoDB Database
  mongodb:
    image: mongo:6.0
    container_name: lems-mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: lems_db
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - lems-network
    ports:
      - "27017:27017"

  # Backend API
  backend:
    build: ./lab-backend
    container_name: lems-backend
    restart: unless-stopped
    depends_on:
      - mongodb
    environment:
      NODE_ENV: production
      DB_HOST: mongodb
      DB_PORT: 27017
      DB_NAME: lems_db
      DB_USER: ${DB_USER}
      DB_PASS: ${DB_PASS}
      JWT_SECRET: ${JWT_SECRET}
      PASETO_SECRET: ${PASETO_SECRET}
      EMAIL_HOST: ${EMAIL_HOST}
      EMAIL_PORT: ${EMAIL_PORT}
      EMAIL_USER: ${EMAIL_USER}
      EMAIL_PASS: ${EMAIL_PASS}
    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads
    networks:
      - lems-network
    ports:
      - "5000:5000"

  # Frontend Application
  frontend:
    build: ./lab-frontend
    container_name: lems-frontend
    restart: unless-stopped
    depends_on:
      - backend
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_API_URL: https://api.yourdomain.com
      NEXT_PUBLIC_SOCKET_URL: https://api.yourdomain.com
    networks:
      - lems-network
    ports:
      - "3000:3000"

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: lems-nginx
    restart: unless-stopped
    depends_on:
      - frontend
      - backend
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - ./logs/nginx:/var/log/nginx
    networks:
      - lems-network
    ports:
      - "80:80"
      - "443:443"

volumes:
  mongodb_data:

networks:
  lems-network:
    driver: bridge
```

## Environment Configuration

### Production Environment File

```bash
# .env.production
NODE_ENV=production

# Database Configuration
DB_HOST=mongodb
DB_PORT=27017
DB_NAME=lems_db
DB_USER=lems_user
DB_PASS=your_secure_password

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=7d

# PASETO Configuration
PASETO_SECRET=your_paseto_secret_key_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
CORS_ORIGIN=https://yourdomain.com

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# File Upload
MAX_FILE_SIZE=5MB
UPLOAD_PATH=/app/uploads

# Logging
LOG_LEVEL=info
LOG_FILE=/app/logs/app.log
```

## Nginx Configuration

```nginx
# nginx.conf
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
        server_name yourdomain.com www.yourdomain.com;
        return 301 https://$server_name$request_uri;
    }

    # Main application
    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256;

        # Security Headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

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

        # File uploads
        location /uploads/ {
            proxy_pass http://backend;
            client_max_body_size 10M;
        }
    }
}
```

## Deployment Steps

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create application directory
sudo mkdir -p /opt/lems
cd /opt/lems
```

### 2. SSL Certificate Setup

```bash
# Install Certbot
sudo apt install certbot -y

# Get SSL certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates
sudo mkdir -p ssl
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/
```

### 3. Deploy Application

```bash
# Clone repositories
git clone https://github.com/knightempire/lab-backend.git
git clone https://github.com/knightempire/lab-frontend.git

# Copy configuration files
cp docker-compose.prod.yml docker-compose.yml
cp .env.production .env

# Build and start services
docker-compose up -d --build

# Verify deployment
docker-compose ps
```

## Platform-Specific Deployments

### AWS EC2

#### EC2 Instance Setup

```bash
# Launch EC2 instance (t3.medium or larger)
# Security Group: Allow HTTP (80), HTTPS (443), SSH (22)

# Connect to instance
ssh -i your-key.pem ubuntu@your-instance-ip

# Install dependencies
sudo apt update
sudo apt install docker.io docker-compose git -y
sudo usermod -aG docker ubuntu
```

#### RDS Database (Optional)

```bash
# Use AWS RDS for MongoDB or DocumentDB
# Update connection string in .env:
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=27017
```

### DigitalOcean Droplet

```bash
# Create droplet (2GB+ RAM recommended)
# Enable monitoring and backups

# Connect and setup
ssh root@your-droplet-ip

# Install Docker (one-click apps available)
curl -sSL https://repos.insights.digitalocean.com/install.sh | sudo bash

# Deploy application
git clone https://github.com/knightempire/lab-backend.git
cd lab-backend
docker-compose -f docker-compose.prod.yml up -d
```

### Google Cloud Platform

```bash
# Create Compute Engine instance
gcloud compute instances create lems-server \
  --machine-type=e2-medium \
  --boot-disk-size=20GB \
  --image-family=ubuntu-2004-lts \
  --image-project=ubuntu-os-cloud

# Connect and deploy
gcloud compute ssh lems-server
```

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Choose your region and tier
3. **Setup User**: Create database user with read/write permissions
4. **Network Access**: Add your server IP to whitelist
5. **Get Connection String**: Copy the connection string

```bash
# Update .env file
DB_HOST=cluster0.mongodb.net
DB_USER=your_username
DB_PASS=your_password
DB_NAME=lems_production
```

### Self-Hosted MongoDB

```yaml
# Add to docker-compose.yml
mongodb:
  image: mongo:6.0
  environment:
    MONGO_INITDB_ROOT_USERNAME: admin
    MONGO_INITDB_ROOT_PASSWORD: secure_password
  volumes:
    - mongodb_data:/data/db
  ports:
    - "27017:27017"
```

## Security Checklist

### Server Security

- ✅ **Firewall**: Configure UFW or iptables
- ✅ **SSH Keys**: Disable password authentication
- ✅ **Updates**: Enable automatic security updates
- ✅ **Monitoring**: Setup log monitoring and alerts

```bash
# Basic firewall setup
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Application Security

- ✅ **Environment Variables**: Use strong, unique secrets
- ✅ **SSL/TLS**: Force HTTPS for all connections
- ✅ **CORS**: Configure proper CORS origins
- ✅ **Rate Limiting**: Implement API rate limits
- ✅ **Input Validation**: Validate all user inputs

### Database Security

- ✅ **Authentication**: Enable MongoDB authentication
- ✅ **Network**: Restrict database access by IP
- ✅ **Encryption**: Enable encryption at rest and in transit
- ✅ **Backups**: Setup automated backups

```javascript
// mongo-init.js
db = db.getSiblingDB('lems_db');
db.createUser({
  user: 'lems_user',
  pwd: 'secure_password_here',
  roles: [
    {
      role: 'readWrite',
      db: 'lems_db'
    }
  ]
});
```

## Monitoring and Maintenance

### Health Checks

```bash
# Check application status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Monitor resources
docker stats

# Database status
docker exec lems-mongodb mongo --eval "db.adminCommand('ismaster')"
```

### Backup Strategy

```bash
#!/bin/bash
# backup.sh

# Database backup
docker exec lems-mongodb mongodump --out /backup/$(date +%Y%m%d)

# Application backup
tar -czf /backup/app-$(date +%Y%m%d).tar.gz /opt/lems

# Upload to S3 (optional)
aws s3 cp /backup/ s3://your-backup-bucket/ --recursive
```

### Log Rotation

```bash
# /etc/logrotate.d/lems
/opt/lems/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    copytruncate
}
```

## Performance Optimization

### Application Optimization

- **Frontend**: Enable gzip compression, optimize images
- **Backend**: Implement caching, database indexing
- **Database**: Optimize queries, add proper indexes

### Server Optimization

```bash
# Increase file limits
echo "* soft nofile 65536" >> /etc/security/limits.conf
echo "* hard nofile 65536" >> /etc/security/limits.conf

# Optimize Docker
echo '{"log-driver": "json-file", "log-opts": {"max-size": "10m", "max-file": "3"}}' > /etc/docker/daemon.json
systemctl restart docker
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
sudo netstat -tulpn | grep :3000
sudo lsof -i :3000

# Kill process if needed
sudo kill -9 <PID>
```

#### SSL Certificate Issues
```bash
# Renew certificate
sudo certbot renew

# Test SSL configuration
openssl s_client -connect yourdomain.com:443
```

#### Database Connection Failed
```bash
# Check MongoDB status
docker exec lems-mongodb mongo --eval "db.adminCommand('ping')"

# Check network connectivity
docker network ls
docker network inspect lems_lems-network
```

#### Memory Issues
```bash
# Check memory usage
free -h
docker stats

# Restart services
docker-compose restart
```

## Scaling Considerations

### Horizontal Scaling

```yaml
# docker-compose.scale.yml
version: '3.8'

services:
  backend:
    deploy:
      replicas: 3
    
  frontend:
    deploy:
      replicas: 2

  nginx:
    volumes:
      - ./nginx-lb.conf:/etc/nginx/nginx.conf
```

### Load Balancing

```nginx
# nginx-lb.conf
upstream backend {
    server backend_1:5000;
    server backend_2:5000;
    server backend_3:5000;
}

upstream frontend {
    server frontend_1:3000;
    server frontend_2:3000;
}
```

## Support and Maintenance

### Regular Tasks

1. **Weekly**: Review logs and performance metrics
2. **Monthly**: Update dependencies and security patches
3. **Quarterly**: Review and update SSL certificates
4. **Annually**: Security audit and penetration testing

### Emergency Procedures

1. **Service Down**: Restart containers, check logs
2. **Database Issues**: Restore from backup, check disk space
3. **Security Incident**: Isolate system, review access logs
4. **Performance Issues**: Scale resources, optimize queries

## Conclusion

Following this guide ensures a secure, scalable, and maintainable deployment of LEMS. Regular monitoring and maintenance are crucial for optimal performance.

For additional support:
- Check the [troubleshooting guide](/guide/troubleshooting)
- Review [API documentation](/api/)
- Contact the development team
