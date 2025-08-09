import { defineConfig } from 'vitepress'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  title: 'Lab Equipment Management System',
  description: 'Complete documentation for LEMS - Lab Equipment Management System',

  themeConfig: {
    logo: '/logo.png',

    search: {
      provider: 'local',
      options: {
        placeholder: 'Search documentation...',
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search documentation'
          },
          modal: {
            searchBox: {
              resetButtonTitle: 'Clear',
              resetButtonAriaLabel: 'Clear',
              cancelButtonText: 'Cancel',
              cancelButtonAriaLabel: 'Cancel'
            },
            startScreen: {
              recentSearchesTitle: 'Recent',
              noRecentSearchesText: 'No recent searches',
              saveRecentSearchButtonTitle: 'Save to recent searches',
              removeRecentSearchButtonTitle: 'Remove from recent searches',
              favoriteSearchesTitle: 'Favorites',
              removeFavoriteSearchButtonTitle: 'Remove from favorites'
            },
            errorScreen: {
              titleText: 'Unable to fetch results',
              helpText: 'You might want to check your network connection.'
            },
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            },
            noResultsScreen: {
              noResultsText: 'No results for',
              suggestedQueryText: 'Try searching for',
              reportMissingResultsText: 'Believe this query should return results?',
              reportMissingResultsLinkText: 'Let us know.'
            }
          }
        }
      }
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Development', link: '/development/' },
      { text: 'API', link: '/api/' },
      { text: 'Deployment', link: '/deployment/' },
      { text: 'Team', link: '/team' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Quick Start', link: '/guide/quick-start' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Authentication', link: '/api/authentication' }
          ]
        }
      ],
      '/development/': [
        {
          text: 'Development',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/development/' },
            { text: 'Frontend', link: '/development/frontend' },
            { text: 'Backend', link: '/development/backend' }
          ]
        }
      ],
      '/deployment/': [
        {
          text: 'Deployment Guide',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/deployment/' }
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

  vite: {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: '/styles.css' }]
  ],

  ignoreDeadLinks: true
})
