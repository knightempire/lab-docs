# Frontend Overview

The LEMS frontend is built with **Next.js**, **React**, and **Tailwind CSS** for a modern, responsive, and accessible user experience.

## 🏗️ Architecture
- **Framework:** Next.js 14+ (App Router)
- **UI Library:** React 18+
- **Styling:** Tailwind CSS
- **State:** React Context + useReducer
- **API:** Fetch API with custom hooks

## Project Structure

```text
lab-frontend/
├── .env
├── Dockerfile
├── LICENSE
├── README.md
├── docker-compose.yml
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── node_modules/
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
├── public/
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.js
    │   ├── not-found.js
    │   ├── page.js
    │   ├── admin/
    │   │   ├── dashboard/
    │   │   ├── issued/
    │   │   ├── product/
    │   │   ├── profile/
    │   │   ├── request/
    │   │   ├── return/
    │   │   ├── review/
    │   │   └── users/
    │   ├── auth/
    │   │   ├── forgetpassword/
    │   │   ├── login/
    │   │   ├── password/
    │   │   └── register/
    │   └── user/
    │       ├── checkout/
    │       ├── dashboard/
    │       ├── product/
    │       ├── request/
    │       └── review/
    ├── components/
    └── utils/
```

## ✨ Key Features

- **Responsive Design**: Works on all device sizes
- **Role-based Access**: User, faculty, and admin interfaces
- **Real-time Dashboard**: Live data, charts, notifications
- **Reusable Components**: Button, Input, Modal, Card, DataTable, Chart, etc.

## 🧩 State Management Example

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

## 🔗 API Integration Example

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

## 🎨 Tailwind Configuration Example

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

## 🖲️ Button Component Example

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

## 🛠️ Development Workflow

```bash
npm install      # Install dependencies
npm run dev      # Start development server
npm run lint     # Lint code
npm run build    # Build for production
```

## 📚 Learn More

- [Quick Start Guide](/guide/quick-start)
- [User Roles & Permissions](/guide/user-roles)
- [API Reference](/api/)
- [Component Library](/frontend/components)
