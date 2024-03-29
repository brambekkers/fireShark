<script setup>
import RoundedBackground from './RoundedBackground.vue';
</script>

<template>
  <div class="h-36 w-screen absolute z-10 flex justify-center items-center">
    <RoundedBackground />
    <h1
      class="h-44 text-3xl flex text-white font-semibold justify-between items-center relative pt-8 max-w-screen-lg pb-4"
    >
      {{ $t('general.admin') }} dashboard
    </h1>
  </div>
</template>
