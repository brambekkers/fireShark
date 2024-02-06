<script setup>
import useUserStore from '@/stores/userStore';
import { computed } from 'vue';

const profileImageUrl = computed(
  () => useUserStore().user?.settings?.profileImageUrl || '',
);

const profileStyle = computed(() => ({
  backgroundImage: `url(${profileImageUrl})`,
}));
</script>

<template>
  <div
    class="profileImage rounded-full h-36 w-36 bg-accent shadow-2xl"
    :style="profileStyle"
  />
</template>
