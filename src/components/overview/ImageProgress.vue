<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import useUserStore from '@/stores/userStore';

const { settings, stats } = storeToRefs(useUserStore());

const profileImageUrl = computed(() => settings?.value?.profileImageUrl || '');
const profileStyle = computed(() => ({
  backgroundImage: `url('${profileImageUrl.value}')`,
}));
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
          class="text-sharp-warning progress-ring__circle stroke-current"
          stroke-width="7"
          stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          :stroke-dashoffset="`calc(400 - (200 * ${stats.percentage}) / 100)`"
        />
      </svg>
    </div>

    <div
      class="absolute bg-sharp-warning w-14 h-14 -bottom-4 right-0 font-bold text-lg rounded-full flex items-center justify-center"
    >
      {{ stats?.percentage || 0 }}%
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-image {
  background-size: cover;
  background-position: center;

  .progress-ring__circle {
    stroke-dasharray: 400, 400;
    transition: stroke-dashoffset 0.35s;
    transform: rotate(130deg);
    transform-origin: 50% 50%;
  }
}
</style>
