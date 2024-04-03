<script setup>
import BackgroundTitle from './BackgroundTitle.vue';
</script>

<template>
  <div class="h-72 w-screen relative">
    <BackgroundTitle />
    <section
      class="h-full flex justify-center items-end relative py-8 max-w-screen-lg mx-auto"
    >
      <img
        src="/shark.svg"
        alt="Shark icon"
        class="mr-4 -ml-4 h-16 drop-shadow-xl"
      />
      <h1 class="font-semibold text-5xl text-white drop-shadow-xl">
        {{ $t('general.appName') }}
      </h1>
    </section>
  </div>
</template>
