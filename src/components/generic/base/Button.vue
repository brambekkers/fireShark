<script setup>
const props = defineProps({
  title: { type: String, required: true },
  disabled: { type: Boolean, required: false },
  type: { type: String, required: false, default: 'primary' },
  size: { type: String, required: false, default: 'lg' },
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-6 px-5 py-3 text-sm';
    case 'md':
      return 'h-8 px-7 py-5 text-md';
    case 'lg':
      return 'h-10 px-10 py-7 text-lg';
    default:
      return 'h-8 px-7 py-5';
  }
});

const typeClasses = computed(() => {
  if (props.disabled)
    return 'bg-app-button-disabled-bg border-app-button-disabled-bg text-app-button-disabled-text';

  switch (props.type) {
    case 'primary':
      return 'bg-app-button-primary-bg border-app-button-primary-bg text-app-button-primary-front  hover:bg-app-button-primary-focus';
    case 'secondary':
      return 'border-app-button-secondary-border-color text-app-button-secondary-text hover:bg-app-button-secondary-border-color/10';
    case 'danger':
      return 'bg-app-button-danger-bg border-app-button-danger-bg text-white hover:bg-app-button-danger-bg-focus hover:border-app-button-danger-bg-focus';
    default:
      return 'bg-app-button-primary-bg border-app-button-primary-bg text-app-button-primary-front  hover:bg-app-button-primary-focus';
  }
});
</script>

<template>
  <button
    type="button"
    :class="`${sizeClasses} ${typeClasses}`"
    :disabled="disabled"
    class="flex items-center justify-center font-medium border-2 rounded-full transition-all duration-200 ease-in-out text-nowrap"
  >
    {{ title }}
  </button>
</template>
