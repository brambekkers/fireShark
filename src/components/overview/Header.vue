<script setup>
import ImageProgress from '@/components/overview/ImageProgress.vue';
import useUserStore from '@/stores/userStore';

const { user } = storeToRefs(useUserStore());
</script>

<template>
  <div class="h-44 w-screen relative">
    <div
      aria-hidden="true"
      style="clip-path: ellipse(130% 248% at 50% -150%)"
      class="bg-secondary absolute inset-0"
    ></div>

    <section
      class="h-44 flex justify-between relative z-10 pt-8 max-w-screen-lg mx-auto"
    >
      <div class="mt-4">
        <h1 class="font-extrabold text-2xl text-white">
          Hi {{ user.name }}!
        </h1>
        <p class="text-xl font-bold text-white">
          Welcome back.
        </p>
      </div>
      <ImageProgress />
    </section>
  </div>
</template>
