# Quick Start

Get your Lab Equipment Management System up and running in just a few minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **Git**

## 1. Clone the Repositories

<div class="code-block">
<pre><code># Clone backend repository
git clone https://github.com/knightempire/lab-backend.git
cd lab-backend

# Clone frontend repository (in a new terminal)
git clone https://github.com/knightempire/lab-frontend.git
cd lab-frontend
</code></pre>
</div>

## 2. Environment Setup

### Backend Configuration

Create a `.env` file in the backend directory:

<div class="code-block">
<pre><code># Database Configuration
DB_HOST=localhost
DB_PORT=27017
DB_NAME=lems_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# PASETO Configuration
PASETO_SECRET=your-paseto-secret-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=5000
NODE_ENV=development
</code></pre>
</div>

### Frontend Configuration

Create a `.env.local` file in the frontend directory:

<div class="code-block">
<pre><code># API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# App Configuration
NEXT_PUBLIC_APP_NAME=Lab Equipment Management System
NEXT_PUBLIC_APP_VERSION=1.0.0
</code></pre>
</div>

## 3. Docker Setup (Recommended)

### Option A: Using Docker Compose

<div class="code-block">
<pre><code># Backend
cd lab-backend
docker-compose up --build

# Frontend (in a new terminal)
cd lab-frontend
docker-compose up --build
</code></pre>
</div>

### Option B: Manual Setup

<div class="code-block">
<pre><code># Backend
cd lab-backend
npm install
npm run dev

# Frontend (in a new terminal)
cd lab-frontend
npm install
npm run dev
</code></pre>
</div>

## 4. Access the Application

Once both services are running:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Documentation**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## 5. Default Login Credentials

<div class="api-endpoint">
  <h3>🔐 Default Admin Account</h3>
  <ul>
    <li><strong>Email</strong>: admin@lems.com</li>
    <li><strong>Password</strong>: admin123</li>
  </ul>
</div>

<div class="api-endpoint">
  <h3>👤 Default User Account</h3>
  <ul>
    <li><strong>Email</strong>: user@lems.com</li>
    <li><strong>Password</strong>: user123</li>
  </ul>
</div>

## 6. Verify Installation

Test the installation by:

1. **Login**: Use the default credentials to log in
2. **Dashboard**: Check that the dashboard loads correctly
3. **API**: Visit the API endpoints to ensure they're working
4. **Database**: Verify that data is being stored correctly

## Troubleshooting

### Common Issues

<div class="api-endpoint">
  <h4>❌ Port Already in Use</h4>
  <p>If ports 3000 or 5000 are already in use, you can change them:</p>
  <ul>
    <li>Backend: Change <code>PORT</code> in <code>.env</code></li>
    <li>Frontend: Use <code>npm run dev -- -p 3001</code></li>
  </ul>
</div>

<div class="api-endpoint">
  <h4>❌ Database Connection Failed</h4>
  <p>Ensure MongoDB is running:</p>
  <ul>
    <li>Docker: <code>docker run -d -p 27017:27017 mongo</code></li>
    <li>Local: Start MongoDB service</li>
  </ul>
</div>

<div class="api-endpoint">
  <h4>❌ Module Not Found</h4>
  <p>Clear node_modules and reinstall:</p>
  <ul>
    <li><code>rm -rf node_modules package-lock.json</code></li>
    <li><code>npm install</code></li>
  </ul>
</div>

## Next Steps

- [Configuration Guide](/guide/configuration) - Detailed configuration options
- [User Guide](/guide/user-roles) - Learn about user roles and permissions
- [API Reference](/api/) - Explore the API endpoints
- [Development Guide](/frontend/) - Start developing with LEMS

## Need Help?

- Check the [FAQ](/guide/faq)
- Browse the [API Documentation](/api/)
- Contact the team lead: Abinesh
- Open an issue on GitHub
