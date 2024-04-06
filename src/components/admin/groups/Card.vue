<script setup>
import banner from '@/assets/img/default/banner.jpg';
const props = defineProps({
  group: {
    type: Object,
    required: true,
  },
});
const { t } = useI18n();

const formatNumber = (number) => {
  const usformatter = Intl.NumberFormat('en-US', { notation: 'compact' });
  return usformatter.format(number);
};

const imageStyle = computed(() => ({
  backgroundImage: `url('${props.group.imageUrl || banner}')`,
}));

const questionAmount = computed(() =>
  props.group.topics.reduce((num, t) => {
    num += t.questionAmount || 0;
    return num;
  }, 0),
);

const stats = computed(() => [
  {
    name: t('general.topics'),
    amount: props.group.topics.length,
  },
  {
    name: t('general.questions'),
    amount: questionAmount.value,
  },
  {
    name: t('general.users'),
    amount: 1234,
  },
]);
</script>

<template>
  <button
    class="text-left bg-white rounded-xl grid grid-cols-6 overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 ease-in-out"
  >
    <div
      :style="imageStyle"
      class="col-span-2 bg-cover bg-center h-full bg-primary bg-opacity-10"
    />
    <div class="col-span-4 flex flex-col h-full">
      <div class="p-4 flex-grow">
        <h3 class="text-lg font-semibold tracking-wider">{{ group.name }}</h3>
        <p class="text-sm">
          {{ group.description }}
        </p>
      </div>
      <div class="bg-slate-100 h-24 p-4 flex justify-between divide-x">
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="flex flex-col px-6 justify-center items-end flex-grow"
        >
          <span class="text-4xl font-bold -mb-1">
            {{ formatNumber(stat.amount) }}
          </span>
          <span class="text-sm font-bold">
            {{ stat.name }}
          </span>
        </div>
      </div>
    </div>
  </button>
</template>
