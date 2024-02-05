<script setup>
import { computed } from 'vue';
import { useLayoutStore } from '@stores/layout';
import Navbar from '@components/Navbar.vue';

const layoutStore = useLayoutStore();
const background = computed(() => (layoutStore.isDarkMode ? '#242424' : '#f2f9f9'));
const text = computed(() => (layoutStore.isDarkMode ? '#f2f9f9' : '#242424'));
</script>

<template>
  <Navbar />
  <div id="main" class="mt-12">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
#main {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    min-height: 100vh;

    background-color: v-bind(background);
    color: v-bind(text);
}
</style>
