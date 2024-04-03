<script setup>
import { computed } from 'vue';
import { useLayoutStore } from '@stores/layout';
import HeaderAuth from '@/components/layout/header/HeaderAuth.vue';

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
  <div id="main">
    <!-- Accent on top -->
    <HeaderAuth />
    <main class="px-4 lg:px-10 py-10">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="scss" scoped>
#main {
  min-height: calc(100dvh);

  background-color: v-bind(background);
  color: v-bind(text);
}
</style>
