<script setup>
import { useTimeout } from '@vueuse/core';
const ready = useTimeout(10);

defineProps({
  progress: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <section class="percentage-section flex mt-4 align-center">
    <div class="h-2 mt-2 rounded bg-slate-300 relative grow">
      <div
        :style="{
          width: ready ? `${progress}%` : '0px',
          transitionDelay: `${(50 - progress / 2) * 8}ms`,
        }"
        class="from-primary to-secondary bg-gradient-to-r h-[10px] -mt-[1px] rounded-l-full rounded-r-full transition-all duration-500 ease-in-out"
      ></div>
    </div>
    <p class="text-app-primary font-bold ms-4">{{ progress }}%</p>
  </section>
</template>
