<script setup>
  import MainLayout from '@/layouts/MainLayout.vue'
  import QuestionPage from './pages/QuestionPage.vue';
</script>

<template>
  <MainLayout class="bg-sharp-body-bg">
    <router-view />
    <QuestionPage/>
  </MainLayout>
</template>
