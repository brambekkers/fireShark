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
    <div class="progress absolute w-48 h-48 -top-6 -left-6">
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <!-- Background circle -->
        <circle
          class="text-gray-200 rogress-ring__circle stroke-current"
          stroke-width="3"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          :stroke-dashoffset="`calc(400 - (200 * ${stats.percentage}) / 100)`"
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

        <!-- Center text -->
        <text
          x="50"
          y="50"
          font-family="Verdana"
          font-size="12"
          text-anchor="middle"
          alignment-baseline="middle"
        >
          {{ stats?.percentage || 0 }}%
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-image {
  background-image: url('https://t4.ftcdn.net/jpg/02/87/35/99/360_F_287359914_HU3P7rhmyJMyyhBBcILcWd2S7DDwkJSs.jpg');
  background-size: cover;
  background-position: center;

  .progress {
    .progress-ring__circle {
      stroke-dasharray: 400, 400;
      transition: stroke-dashoffset 0.35s;
      transform: rotate(130deg);
      transform-origin: 50% 50%;
    }
  }
}
</style>
