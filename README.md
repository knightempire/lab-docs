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

## Configuration

The documentation is configured in `.vitepress/config.js` with:
- Navigation structure
- Sidebar organization
- Theme customization
- Plugin configuration

## Deployment

The documentation can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Build the site with `npm run build` and deploy the `dist` folder.

## Development

To add new pages:
1. Create a new `.md` file in the appropriate directory
2. Add it to the sidebar configuration in `config.js`
3. Use React components where needed for interactivity

## Styling

The documentation uses Tailwind CSS with custom color schemes and components defined in `public/styles.css`.

## Contributing

1. Add or update documentation files
2. Test locally with `npm run dev`
3. Build and verify with `npm run build`
4. Submit pull request
