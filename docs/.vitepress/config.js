export default {
  title: 'Lab Component Docs',
  description: 'Modern documentation for Lab Components built with VitePress and Tailwind CSS',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap', rel: 'stylesheet' }]
  ],
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Components', link: '/components/' },
      { text: 'API', link: '/api/' },
      {
        text: 'Resources',
        items: [
          { text: 'GitHub', link: 'https://github.com' },
          { text: 'Discord', link: 'https://discord.com' }
        ]
      }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' }
          ]
        },
        {
          text: 'Configuration',
          items: [
            { text: 'Basic Config', link: '/guide/configuration' },
            { text: 'Theming', link: '/guide/theming' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'Buttons', link: '/components/buttons' },
            { text: 'Cards', link: '/components/cards' },
            { text: 'Forms', link: '/components/forms' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Methods', link: '/api/methods' },
            { text: 'Events', link: '/api/events' },
            { text: 'Types', link: '/api/types' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/your-repo' },
      { icon: 'twitter', link: 'https://twitter.com/yourusername' }
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Your Name'
    },
    
    search: {
      provider: 'local'
    }
  }
}
