# Frontend Overview

The LEMS frontend is built with Next.js, React, and Tailwind CSS, providing a modern and responsive user interface.

## Architecture

### 🏗️ Frontend Architecture
- **Framework**: Next.js 14+ with App Router
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **HTTP Client**: Fetch API with custom hooks

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── admin/          # Admin-specific pages
│   │   ├── auth/           # Authentication pages
│   │   ├── user/           # User-specific pages
│   │   ├── layout.js       # Root layout
│   │   └── page.js         # Home page
│   ├── components/         # Reusable components
│   │   ├── ui/            # Basic UI components
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Dashboard components
│   │   └── common/        # Common components
│   └── utils/             # Utility functions
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── next.config.mjs        # Next.js configuration
└── package.json
```

## Key Features

### 🎨 Modern UI Components
- **Responsive Design**: Works on all device sizes
- **Dark Mode Support**: Toggle between light and dark themes
- **Accessibility**: WCAG 2.1 compliant components
- **Interactive Elements**: Smooth animations and transitions

### 🔒 Authentication Flow
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Role-based Access**: Different interfaces for users, faculty, and admins
- **Session Management**: Secure token storage and refresh

### 📊 Dashboard Features
- **Real-time Updates**: Live data refresh without page reload
- **Interactive Charts**: Equipment usage and analytics
- **Notification Center**: In-app notifications and alerts
- **Quick Actions**: Common tasks accessible from dashboard

## Component Library

### Basic Components
- **Button**: Various styles and sizes
- **Input**: Form inputs with validation
- **Modal**: Overlay dialogs and popups
- **Card**: Content containers
- **Badge**: Status indicators
- **Dropdown**: Select menus and dropdowns

### Complex Components
- **DataTable**: Sortable and filterable tables
- **Calendar**: Date picker and event calendar
- **Chart**: Analytics and reporting charts
- **Timeline**: Request status tracking
- **Pagination**: Large dataset navigation

## State Management

```javascript
// Context example
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  const value = {
    user: state.user,
    notifications: state.notifications,
    theme: state.theme,
    login: (userData) => dispatch({ type: 'LOGIN', payload: userData }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' })
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
```

## API Integration

### Custom Hooks

```javascript
// useApi hook example
export const useApi = () => {
  const { token } = useContext(AppContext);
  
  const apiCall = async (endpoint, options = {}) => {
    const response = await fetch(`/api${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      },
      ...options
    });
    
    return response.json();
  };
  
  return { apiCall };
};

// Usage
const { apiCall } = useApi();
const products = await apiCall('/products');
```

## Styling System

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        }
      }
    }
  }
};
```

### Component Styling

```javascript
// Button component example
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  const baseClasses = 'font-medium rounded-lg transition-colors';
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  };
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

## Performance Optimization

### Code Splitting
- **Dynamic Imports**: Load components on demand
- **Route-based Splitting**: Separate bundles for each page
- **Component Lazy Loading**: Defer loading of heavy components

### Image Optimization
- **Next.js Image**: Automatic optimization and lazy loading
- **WebP Support**: Modern image formats for better compression
- **Responsive Images**: Different sizes for different devices

### Caching Strategy
- **Static Generation**: Pre-render pages at build time
- **Incremental Static Regeneration**: Update static pages on demand
- **Client-side Caching**: Cache API responses and user data

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

### Code Quality
- **ESLint**: JavaScript/React linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **Conventional Commits**: Standardized commit messages

## Next Steps

- [Component Library](/frontend/components) - Explore available components
- [Page Structure](/frontend/pages) - Learn about page organization
- [State Management](/frontend/state) - Understand state patterns
- [Styling Guide](/frontend/styling) - Master the styling system
