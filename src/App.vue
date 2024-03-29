<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <component class="bg-sharp-body-bg" :is="route.meta.layout || div">
    <router-view />
  </component>
</template>
