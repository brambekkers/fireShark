<script setup>
defineEmits(['on-clicked']);
const props = defineProps({
  title: { type: String, required: true },
  disable: { type: Boolean, required: false },
  styleType: { type: String, required: false, default: 'primary' },
});

const styleClasses = computed(() => {
  switch (props.styleType) {
    case 'primary':
      return 'bg-sharp-button-primary-bg text-sharp-button-primary-front rounded-full h-10 px-2';
    case 'secondary':
      return 'border-sharp-button-secondary-border-color text-sharp-button-secondary-text rounded-full h-10 px-2 border-2';
    case 'disabled':
      return 'border-0 bg-sharp-button-disabled-bg text-sharp-button-disabled-text rounded-full h-10 px-2';
    default:
      return 'bg-sharp-button-primary-bg text-sharp-button-primary-front rounded-full h-10 px-2';
  }
});
</script>

<template>
  <button
    type="button"
    :disabled="props.disable"
    :class="styleClasses"
    class="px-10 py-7 flex items-center justify-center font-medium text-lg"
    @click="$emit('on-clicked')"
  >
    {{ title }}
  </button>
</template>
