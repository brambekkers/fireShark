<script setup>
defineEmits(['on-clicked']);
const props = defineProps({
  title: { type: String, required: true },
  disable: { type: Boolean, required: false },
});

</script>

<template>
  <button
    type="button"
    :disabled="props.disable"
    @click="$emit('on-clicked')"
  >
    {{ title }}
  </button>
</template>
