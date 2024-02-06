<script setup>
import useUserStore from '@/stores/userStore';
import MainLayout from '@/layouts/MainLayout.vue';

const userStore = useUserStore();
userStore.getRandomUser();
</script>

<template>
  <MainLayout class="bg-sharp-body-bg">
    <router-view />
  </MainLayout>
</template>
