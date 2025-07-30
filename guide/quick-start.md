# Quick Start

Get your Lab Equipment Management System up and running in just a few minutes.

> **Note:** This guide assumes you have basic familiarity with Node.js, Docker, and Git.

## 1. Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **Git**

## 2. Clone the Repositories

```bash
# Backend
git clone https://github.com/knightempire/lab-backend.git
cd lab-backend

# Frontend (in a new terminal)
git clone https://github.com/knightempire/lab-frontend.git
cd lab-frontend
```

## 3. Environment Setup

### Backend: Create `.env` in `lab-backend`

```bash
# Database
DB_HOST=localhost
DB_PORT=27017
DB_NAME=lems_db
# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
# PASETO
PASETO_SECRET=your-paseto-secret-key
# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
# Server
PORT=5000
NODE_ENV=development
```

### Frontend: Create `.env.local` in `lab-frontend`

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Lab Equipment Management System
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 4. Start the Services

**Option A: Docker Compose (Recommended)**

```bash
# Backend
cd lab-backend
docker-compose up --build

# Frontend (new terminal)
cd lab-frontend
docker-compose up --build
```

**Option B: Manual**

```bash
# Backend
cd lab-backend
npm install
npm run dev

# Frontend (new terminal)
cd lab-frontend
npm install
npm run dev
```

## 5. Access the Application

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API Docs:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)


## 6. Default Login Credentials

| Role   | Email              | Password   |
|--------|--------------------|------------|
| Admin  | admin@lems.com     | admin123   |
| User   | user@lems.com      | user123    |


## 7. Verify Installation

1. **Login** with the default credentials
2. **Dashboard** should load correctly
3. **API** endpoints should be accessible
4. **Database** should store data

## 8. Troubleshooting

### ❌ Port Already in Use
If ports 3000 or 5000 are already in use:
- Backend: Change `PORT` in `.env`
- Frontend: Use `npm run dev -- -p 3001`

### ❌ Database Connection Failed
Make sure MongoDB is running:
- Docker: `docker run -d -p 27017:27017 mongo`
- Local: Start MongoDB service

### ❌ Module Not Found
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- [Configuration Guide](/guide/configuration) — Detailed configuration options
- [User Guide](/guide/user-roles) — Learn about user roles and permissions
- [API Reference](/api/) — Explore the API endpoints
- [Development Guide](/frontend/) — Start developing with LEMS

## Need Help?

- Check the [FAQ](/guide/faq)
- Browse the [API Documentation](/api/)
- Contact the team lead: Abinesh
- Open an issue on GitHub
