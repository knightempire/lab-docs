---
layout: home

hero:
  name: "VitePress"
  text: "Modern Documentation"
  tagline: "Built with Tailwind CSS for beautiful, responsive design"
  image:
    src: /hero-image.png
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress

features:
  - icon: ⚡
    title: Fast & Lightweight
    details: Built with Vite for lightning-fast development and optimized builds
  - icon: 🎨
    title: Beautiful Design
    details: Styled with Tailwind CSS for modern, responsive, and customizable design
  - icon: 📝
    title: Markdown-Powered
    details: Write content in Markdown with Vue components support
  - icon: 🔧
    title: Highly Customizable
    details: Flexible theming system with full control over appearance
  - icon: 🚀
    title: Production Ready
    details: Optimized for performance with static site generation
  - icon: 🌙
    title: Dark Mode
    details: Built-in dark mode support for better user experience
---

<div class="max-w-4xl mx-auto mt-16 px-4">
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
      Why Choose VitePress?
    </h2>
    <p class="text-xl text-gray-600 dark:text-gray-300">
      The perfect combination of performance, flexibility, and beautiful design
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    <CustomCard title="Developer Experience">
      <p class="mb-4">Hot module replacement, instant server start, and optimized build process make development a breeze.</p>
      <div class="flex space-x-2">
        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Fast</span>
        <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Modern</span>
        <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Efficient</span>
      </div>
    </CustomCard>

    <CustomCard title="Customization">
      <p class="mb-4">Full control over styling with Tailwind CSS and Vue components integration.</p>
      <CustomButton size="sm" @click="alert('Customizable!')">
        Try Me!
      </CustomButton>
    </CustomCard>
  </div>

  <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 text-center">
    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Ready to Get Started?
    </h3>
    <p class="text-gray-600 dark:text-gray-300 mb-6">
      Build your documentation site in minutes, not hours
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <CustomButton size="lg">
        <a href="/guide/" class="text-white no-underline">Get Started</a>
      </CustomButton>
      <CustomButton size="lg" variant="secondary">
        <a href="/components/" class="text-white no-underline">View Components</a>
      </CustomButton>
    </div>
  </div>
</div>
