<template>
  <button 
    :class="[
      'btn-primary',
      size === 'sm' ? 'py-1 px-3 text-sm' : '',
      size === 'lg' ? 'py-3 px-6 text-lg' : '',
      variant === 'secondary' ? 'btn-secondary' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>
