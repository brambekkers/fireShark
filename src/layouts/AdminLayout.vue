<script setup>
import { computed } from 'vue';
import { useLayoutStore } from '@stores/layout';
import Navbar from '@components/layout/Navbar.vue';

import HeaderAdmin from '@/components/layout/header/HeaderAdmin.vue';
import AdminSidebar from '@/components/layout/sidebar/AdminSidebar.vue';

const layoutStore = useLayoutStore();
const background = computed(() =>
  layoutStore.isDarkMode ? '#242424' : '#f2f9f9',
);
const text = computed(() => (layoutStore.isDarkMode ? '#f2f9f9' : '#242424'));
</script>

<template>
  <Navbar />
  <div id="main" class="mt-12 scrollbar-thin">
    <!-- Accent on top -->
    <HeaderAdmin />
    <div class="flex flex-col sm:flex-row absolute inset-0 pt-12 z-0">
      <aside
        class="transition-all duration-150 min-w-full md:min-w-48 h-52 md:h-full flex items-center md:items-start justify-center md:justify-start xl:min-w-72 bg-app-secondary pt-36 pb-4"
      >
        <AdminSidebar />
      </aside>

      <main class="pt-6 md:pt-36 pb-10 flex-grow px-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#main {
  min-height: calc(100dvh - 48px);

  background-color: v-bind(background);
  color: v-bind(text);
}
</style>
