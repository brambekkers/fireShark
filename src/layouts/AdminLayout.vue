<script setup>
import { computed } from 'vue';
import { useLayoutStore } from '@stores/layout';
import Navbar from '@components/layout/Navbar.vue';

import HeaderAdmin from '@/components/layout/header/HeaderAdmin.vue';
import AdminSidebar from '@/components/layout/sidebar/AdminSidebar.vue';

const router = useRouter();

const selectedRoute = ref('');

router.beforeEach((to, from) => {
  if (from.name === 'Practice') {
    if (selectedRoute.value !== '') {
      selectedRoute.value = '';
      toggleModal(false);
      return true;
    }
    selectedRoute.value = to.path;
    toggleModal(true);
    return false;
  }
  return true;
});

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
    <div class="flex absolute inset-0 pt-12 z-0">
      <aside class="min-w-72 bg-app-secondary pt-36">
        <AdminSidebar />
      </aside>

      <main class="pt-36 pb-10 flex-grow px-6">
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
