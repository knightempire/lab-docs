import DefaultTheme from 'vitepress/theme'
import './style.css'
import CustomButton from './components/CustomButton.vue'
import CustomCard from './components/CustomCard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // Register global components
    app.component('CustomButton', CustomButton)
    app.component('CustomCard', CustomCard)
  }
}
