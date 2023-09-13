<script setup>
  import { ref } from 'vue'
  const world = ref('world')
</script>

<template>
  <div>
    <h1>Hello {{ world }}</h1>
  </div>
</template>
