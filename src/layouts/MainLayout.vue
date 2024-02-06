<script setup>
import { computed } from 'vue';
import { useLayoutStore } from '@stores/layout';
import Navbar from '@components/Navbar.vue';
import OverviewHeader from '@/components/overview/Header.vue';

const layoutStore = useLayoutStore();
const background = computed(() =>
  layoutStore.isDarkMode ? '#242424' : '#f2f9f9',
);
const text = computed(() => (layoutStore.isDarkMode ? '#f2f9f9' : '#242424'));
</script>

<template>
  <Navbar />
  <div id="main" class="mt-12">
    <!-- Accent on top -->
    <OverviewHeader />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
#main {
  min-height: 100vh;

  background-color: v-bind(background);
  color: v-bind(text);
}
</style>
