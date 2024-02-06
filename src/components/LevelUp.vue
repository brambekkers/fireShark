<script setup>
import IconCross from '~icons/charm/cross';
import ImageProgress from './overview/ImageProgress.vue';

defineEmits(['closeModal']);
</script>

<template>
  <div class="h-96 w-full relative drop-shadow-2xl -z-10">
    <div class="relative h-full w-full cutout bg-sharp-body-bg rounded-3xl">
      <div
        aria-hidden="true"
        style="clip-path: ellipse(150% 210% at 48% -150%)"
        class="bg-secondary absolute inset-0 z-10"
      ></div>
      <div class="p-6 flex flex-col items-center justify-center relative z-10">
        <h2 class="mt-6 text-3xl font-extrabold text-sharp-body-bg">
          Well done!
        </h2>
        <p class="mt-2 text-xl text-sharp-body-bg">
          Another step forward!
        </p>
        <ImageProgress class="mt-8" />
      </div>
    </div>
    <div
      class="absolute flex items-center justify-center left-[calc(50%-24px)] -bottom-6 bg-sharp-primary h-12 aspect-square rounded-full cursor-pointer transition-all hover:bg-sharp-secondary hover:scale-105"
    >
      <IconCross class="h-8 w-8 text-white" @click="$emit('closeModal')" />
    </div>
  </div>
</template>

<style scoped>
.cutout {
  mask-image: radial-gradient(
    circle 1px at calc(50%) calc(100%),
    transparent 30px,
    red 0
  );
}
</style>
