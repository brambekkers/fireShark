<script setup>
import { computed } from 'vue';
import { useLayoutStore } from '@stores/layout';
import Navbar from '@components/layout/Navbar.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import useModalInteractions from '@/composable/useModalInteractions';
import HeaderMain from '@/components/layout/header/HeaderMain.vue';

const router = useRouter();

const { isModalOpen, toggleModal } = useModalInteractions();

const selectedRoute = ref('');

const goToSelectedRoute = () => {
  router.push(selectedRoute.value);
};

const clearRouteDestination = () => {
  toggleModal(false);
  selectedRoute.value = '';
};

// TODO: below method split up does not wait with routing, try async?
// const setModalAndSelectedRoute = (to) => {
//   if (selectedRoute.value !== '') {
//     selectedRoute.value = '';
//     toggleModal(false);
//     return true;
//   }
//   selectedRoute.value = to.path;
//   toggleModal(true);
//   return false;
// };

// const shouldUserBeRouted = (to, from) => {
//   if (from.name === 'Practice') {
//     return setModalAndSelectedRoute(to);
//   }
//   return true;
// };

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
  <ConfirmationModal
    :is-open="isModalOpen"
    @close-modal="toggleModal(false)"
    @confirm-routing="goToSelectedRoute()"
    @cancel-routing="clearRouteDestination()"
  />
  <Navbar />

  <div id="main" class="mt-12">
    <!-- Accent on top -->
    <HeaderMain />
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
#main {
  min-height: calc(100dvh - 48px);

  background-color: v-bind(background);
  color: v-bind(text);
}
</style>
