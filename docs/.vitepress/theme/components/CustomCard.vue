<template>
  <div class="card">
    <div v-if="title" class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
    </div>
    <div class="text-gray-600 dark:text-gray-300">
      <slot />
    </div>
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
