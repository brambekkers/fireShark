<script setup>
const props = defineProps({
  questionData: { type: Object, required: true },
});

const imageStyle = computed(() => ({
  backgroundImage: `url(${props.questionData.headerImg})`,
}));
</script>

<template>
  <div v-if="questionData" class="mt-2 w-full">
    <div
      alt="question-picture"
      class="rounded-3xl shadow-xl h-64 bg-center bg-cover"
      :style="imageStyle"
    />
    <p class="my-6">
      {{ questionData.question }}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
