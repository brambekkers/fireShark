<script setup>
defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    class="flex items-center p-1.5 rounded-lg transition-colors duration-200 ease-in-out app"
    :class="{
      'hover:bg-app-navbar-inactive/20 ': !disabled,
      'text-gray-400': disabled,
    }"
  >
    <slot />
  </button>
</template>
