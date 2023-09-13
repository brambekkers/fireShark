<script setup>
  import { computed } from 'vue'
  import { useLayoutStore } from '@stores/layout'
  import Navbar from '@components/Navbar.vue'

  const layoutStore = useLayoutStore()
  const background = computed(() => (layoutStore.isDarkMode ? '#242424' : '#fefefe'))
  const text = computed(() => (layoutStore.isDarkMode ? '#fefefe' : '#242424'))
</script>

<template>
  <div id="main">
    <Navbar />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  #main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    background-color: v-bind(background);
    color: v-bind(text);
  }
</style>
