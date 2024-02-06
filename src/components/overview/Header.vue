<script setup>
import ImageProgress from '@/components/overview/ImageProgress.vue';
import useUserStore from '@/stores/userStore';
import { useRoute } from 'vue-router';

const { user } = storeToRefs(useUserStore());
const route = useRoute();
const { t } = useI18n();

const title = computed(() => {
  if (route.name === 'Overview' || route.name === 'Settings') {
    return `${t('general.hi')} ${user.value.name}!`;
  }
  if (route.name === 'Duel') {
    return `Duelscore: 1.202`;
  }
});

const subtitle = computed(() => {
  if (route.name === 'Overview') {
    return `${t('overview.welcomeBack')}!`;
  }
  if (route.name === 'Duel') {
    return `${t('duel.rdyToDuel')}`;
  }
  if (route.name === 'Settings') {
    return `${t('settings.changeYourProfileHere')}`;
  }
});
</script>

<template>
  <div class="h-44 w-screen relative">
    <div
      aria-hidden="true"
      style="clip-path: ellipse(130% 248% at 50% -150%)"
      class="bg-secondary background absolute inset-0"
    ></div>

    <section
      class="h-44 flex justify-between relative z-10 pt-8 max-w-screen-lg mx-auto"
    >
      <div class="mt-4">
        <h1 class="font-extrabold text-3xl text-white">{{ title }}</h1>
        <p class="text-2xl text-white">
          {{ subtitle }}
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.background {
  background: linear-gradient(
      0deg,
      rgba(0, 146, 134, 0.95),
      rgba(0, 94, 93, 0.95)
    ),
    url('@/assets/backgroundHeader.jpg');
  background-size: cover;
  background-position: 50%;
}
</style>
