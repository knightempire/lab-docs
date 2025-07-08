# LEMS Documentation

This directory contains the VitePress documentation site for the Lab Equipment Management System.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Features

- ✨ Modern documentation with VitePress
- 🎨 Tailwind CSS styling
- ⚛️ React components for interactive elements
- 📱 Responsive design
- 🌙 Dark mode support
- 🔍 Built-in search
- 📊 API testing tools
- 🔄 System status monitoring

## Structure

```
docs/
├── .vitepress/
│   ├── config.js          # VitePress configuration
│   └── components/        # React components
├── guide/                 # User guides
├── api/                   # API documentation
├── frontend/              # Frontend docs
├── backend/               # Backend docs
├── deployment/            # Deployment guides
├── public/                # Static assets
└── index.md              # Homepage
```

## Components

### ApiTester
Interactive component for testing API endpoints directly from the documentation.

### SystemStatus
Real-time system status monitoring dashboard.

---