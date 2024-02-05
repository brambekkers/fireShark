<template>
  <div class="absolute inset-x-0 bottom-0 flex flex-col items-center pb-4">

    <button @click="show = !show" class="bg-yellow text-white px-4 py-2 rounded-md">Toggle</button>
    <transition name="slide">
      <div v-if="show" class="p-4 bg-green-800 text-center py-4">
        Slide In
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref } from "vue";
const show = ref(false);
</script>

<style scoped lang="scss">
/* .slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,

.slide-leave-to {
  translate: translateY(100%);
} */
</style>