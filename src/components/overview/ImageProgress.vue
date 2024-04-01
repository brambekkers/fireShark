<script setup>
import { useTimeout } from '@vueuse/core';
import useUserStore from '@/stores/user';
import Person from '@/assets/img/default/person.svg';

const { settings, stats } = storeToRefs(useUserStore());

const profileImageUrl = computed(() => settings?.value?.profileImageUrl);
const profileStyle = computed(() => ({
  background: '#f2f9f9',
  backgroundImage: `url('${profileImageUrl.value || Person}') `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const ready = useTimeout(10);
</script>

<template>
  <div
    class="profile-image relative rounded-full h-36 w-36 bg-accent shadow-2xl"
    :style="profileStyle"
  >
    <div class="absolute w-48 h-48 -top-6 -left-6">
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <!-- Background circle -->
        <circle
          class="text-gray-200 progress-ring__circle stroke-current"
          stroke-width="3"
          stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          :stroke-dashoffset="`calc(400 - (200 * 100 / 100)`"
        />
        <!-- Progress circle -->
        <circle
          class="text-app-warning progress-ring__circle stroke-current"
          stroke-width="7"
          stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          :stroke-dashoffset="
            ready ? `calc(400 - (200 * ${stats.percentage}) / 100)` : '399'
          "
        />
      </svg>
    </div>

    <div
      class="absolute bg-app-warning w-14 h-14 -bottom-4 right-0 font-bold text-lg rounded-full flex items-center justify-center"
    >
      {{ Math.round(stats?.percentage) || 0 }}%
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-image {
  .progress-ring__circle {
    stroke-dasharray: 400, 400;
    transition: stroke-dashoffset 1.5s ease-in-out;
    transform: rotate(130deg);
    transform-origin: 50% 50%;
  }
}
</style>
