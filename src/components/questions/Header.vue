<script setup>
import banner from '@/assets/img/default/banner.jpg';

const props = defineProps({
  question: { type: Object, required: true },
});

const imageStyle = computed(() => ({
  backgroundImage: `url('${props.question.headerImg || banner}')`,
}));
</script>

<template>
  <div v-if="question" class="mt-2 w-full">
    <div
      alt="question-picture"
      class="rounded-3xl shadow-xl h-64 bg-center bg-cover"
      :style="imageStyle"
    />
    <p class="my-6">
      {{ question.question }}
    </p>
  </div>
</template>
