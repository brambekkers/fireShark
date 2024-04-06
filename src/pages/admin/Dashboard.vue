<script setup>
import IconPieChart from '~icons/lucide/pie-chart';
import IconUsers from '~icons/lucide/users';
import IconFiles from '~icons/lucide/files';
import IconCheck from '~icons/lucide/badge-check';
import IconX from '~icons/lucide/badge-x';

const stats = computed(() => [
  {
    color: 'bg-app-primary',
    text: 'Total members',
    icon: IconUsers,
    value: 12768,
  },
  {
    color: 'bg-app-warning',
    text: 'Total questions',
    icon: IconFiles,
    value: 982,
  },
  {
    color: 'bg-app-success',
    text: 'Total correct answers',
    icon: IconCheck,
    value: 928831,
  },
  {
    color: 'bg-app-danger',
    text: 'Total wrong answers',
    icon: IconX,
    value: 37213,
  },
]);

const formatNumber = (number) => {
  const usformatter = Intl.NumberFormat('en-US', { notation: 'compact' });
  return usformatter.format(number);
};
</script>

<template>
  <h1 class="text-3xl font-semibold mb-4">{{ $t('general.dashboard') }}</h1>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
    <div
      v-for="stat of stats"
      :key="stat.text"
      class="flex items-center bg-white rounded-lg overflow-hidden shadow-lg"
    >
      <div class="p-4" :class="stat.color">
        <component :is="stat.icon" class="h-12 w-12 text-white" />
      </div>
      <div class="px-4 text-gray-700 text-end flex-1">
        <h3 class="text-sm tracking-wider">{{ stat.text }}</h3>
        <p class="text-3xl font-bold">{{ formatNumber(stat.value) }}</p>
      </div>
    </div>
  </div>
</template>
