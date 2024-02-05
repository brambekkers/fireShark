<script setup>
defineProps({
  title: { type: String, required: true },
  progress: { type: Number, required: true },
});
</script>

<template>
  <div class="bg-white px-12 py-8 rounded-2xl shadow-xl cursor-pointer transition-all duration-500 hover:shadow-2xl">
    <h3 class="text-xl text-center font-bold text-primary">
      {{ title }}
    </h3>
    <div class="mt-6 h-2 rounded bg-slate-200 relative overflow-hidden">
      <div :style="{ width: `${progress}%` }" class="from-primary to-secondary bg-gradient-to-r h-full"></div>
    </div>
  </div>
</template>
