<script setup>
  import { storeToRefs } from 'pinia'
  import { useLayoutStore } from '@stores/layout'

  const { isDarkMode } = storeToRefs(useLayoutStore())
</script>

<template>
  <nav>
    <router-link to="/">Go to Home</router-link>
    <router-link to="/pageOne">Go to page ONE</router-link>
    <div class="ms-auto">
      <input
        v-model="isDarkMode"
        type="checkbox" />
      Darkmode
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  /* Style the header */
  nav {
    padding: 1rem 3rem;
    background: #555;
    color: #f1f1f1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    display: flex;
    gap: 1rem;
  }
</style>
