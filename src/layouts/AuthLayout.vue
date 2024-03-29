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
