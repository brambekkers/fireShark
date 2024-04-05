<script setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    v-motion-pop
    class="bg-app-danger/10 border-l-4 border-app-danger text-app-danger p-4 rounded-r-xl"
    role="alert"
  >
    <p v-if="title" class="font-bold">{{ title }}</p>
    <p>{{ message }}</p>
  </div>
</template>
