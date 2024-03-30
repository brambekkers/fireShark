<script setup>
defineEmits(['on-clicked']);
const props = defineProps({
  title: { type: String, required: true },
  disable: { type: Boolean, required: false },
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
  if (props.disable)
    return 'bg-app-button-disabled-bg border-app-button-disabled-bg text-app-button-disabled-text';

  switch (props.type) {
    case 'primary':
      return 'bg-app-button-primary-bg border-app-button-primary-bg text-app-button-primary-front border-2 hover:bg-app-button-primary-focus';
    case 'secondary':
      return 'border-app-button-secondary-border-color text-app-button-secondary-text border-2 hover:bg-app-button-secondary-border-color/10';
    default:
      return 'bg-app-button-primary-bg text-app-button-primary-front';
  }
});
</script>

<template>
  <button
    type="button"
    :disabled="props.disable"
    :class="`${sizeClasses} ${typeClasses}`"
    class="flex items-center justify-center font-medium rounded-full"
    @click="$emit('on-clicked')"
  >
    {{ title }}
  </button>
</template>
