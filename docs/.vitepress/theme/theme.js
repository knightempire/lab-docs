import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // Add custom JavaScript functionality here
    if (typeof window !== 'undefined') {
      // Custom JavaScript that runs in the browser
      
      // Example: Add smooth scrolling
      window.addEventListener('load', () => {
        const links = document.querySelectorAll('a[href^="#"]')
        links.forEach(link => {
          link.addEventListener('click', (e) => {
            e.preventDefault()
            const target = document.querySelector(link.getAttribute('href'))
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' })
            }
          })
        })
      })
      
      // Example: Add copy code functionality
      window.addEventListener('load', () => {
        const codeBlocks = document.querySelectorAll('pre code')
        codeBlocks.forEach(block => {
          const pre = block.parentNode
          const button = document.createElement('button')
          button.className = 'copy-code-btn'
          button.textContent = 'Copy'
          button.onclick = () => {
            navigator.clipboard.writeText(block.textContent)
            button.textContent = 'Copied!'
            setTimeout(() => {
              button.textContent = 'Copy'
            }, 2000)
          }
          pre.style.position = 'relative'
          pre.appendChild(button)
        })
      })
    }
  }
}
