import { defineConfig } from 'vitepress'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  title: 'Lab Equipment Management System',
  description: 'Complete documentation for LEMS - Lab Equipment Management System',
  
  // Theme configuration
  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Frontend', link: '/frontend/' },
      { text: 'Backend', link: '/backend/' },
      { text: 'Deployment', link: '/deployment/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Configuration', link: '/guide/configuration' }
          ]
        },
        {
          text: 'User Guide',
          items: [
            { text: 'User Roles', link: '/guide/user-roles' },
            { text: 'Request Process', link: '/guide/request-process' },
            { text: 'Admin Panel', link: '/guide/admin-panel' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Authentication', link: '/api/authentication' },
            { text: 'Products', link: '/api/products' },
            { text: 'Requests', link: '/api/requests' },
            { text: 'Users', link: '/api/users' },
            { text: 'Notifications', link: '/api/notifications' }
          ]
        }
      ],
      '/frontend/': [
        {
          text: 'Frontend',
          items: [
            { text: 'Overview', link: '/frontend/' },
            { text: 'Components', link: '/frontend/components' },
            { text: 'Pages', link: '/frontend/pages' },
            { text: 'State Management', link: '/frontend/state' },
            { text: 'Styling', link: '/frontend/styling' }
          ]
        }
      ],
      '/backend/': [
        {
          text: 'Backend',
          items: [
            { text: 'Overview', link: '/backend/' },
            { text: 'Controllers', link: '/backend/controllers' },
            { text: 'Models', link: '/backend/models' },
            { text: 'Middleware', link: '/backend/middleware' },
            { text: 'Database', link: '/backend/database' }
          ]
        }
      ],
      '/deployment/': [
        {
          text: 'Deployment',
          items: [
            { text: 'Docker Setup', link: '/deployment/docker' },
            { text: 'Environment Variables', link: '/deployment/environment' },
            { text: 'Production', link: '/deployment/production' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/knightempire/lab-backend' },
      { icon: 'github', link: 'https://github.com/knightempire/lab-frontend' }
    ],

    footer: {
      message: 'Lab Equipment Management System Documentation',
      copyright: 'Copyright © 2025 LEMS Team'
    }
  },

  // Vite configuration
  vite: {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
  },

  // Custom CSS
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/styles.css' }]
  ],

  ignoreDeadLinks: true
})
