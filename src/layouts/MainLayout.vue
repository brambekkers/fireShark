<script setup>
import { computed } from 'vue';
import { useLayoutStore } from '@stores/layout';
import Navbar from '@components/layout/Navbar.vue';
import ExitConfirm from '@/components/generic/modals/ExitConfirm.vue';
import useModal from '@/composable/modal';
import HeaderMain from '@/components/layout/header/HeaderMain.vue';

const router = useRouter();

const { isModalOpen, toggleModal } = useModal();

const selectedRoute = ref('');

const goToSelectedRoute = () => {
  router.push(selectedRoute.value);
};

const clearRouteDestination = () => {
  toggleModal();
  selectedRoute.value = '';
};

router.beforeEach((to, from) => {
  if (from.name === 'Practice') {
    if (selectedRoute.value !== '') {
      selectedRoute.value = '';
      toggleModal();
      return true;
    }
    selectedRoute.value = to.path;
    toggleModal();
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
  <ExitConfirm
    :is-open="isModalOpen"
    @confirm="goToSelectedRoute()"
    @cancel="clearRouteDestination()"
  />
  <Navbar />

  <div id="main" class="mt-12">
    <!-- Accent on top -->
    <HeaderMain />
    <main class="px-4 lg:px-10 pb-10">
      <slot></slot>
    </main>
  </div>
</template>

<style lang="scss" scoped>
#main {
  min-height: calc(100dvh - 48px);

  background-color: v-bind(background);
  color: v-bind(text);
}
</style>
