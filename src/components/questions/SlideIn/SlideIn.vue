<template>
  <div ref="myHoverableElement" class="fixed inset-x-0 flex flex-col items-center bottom-0 slide-in-container" :class="{ show: show || isHovered }">
    <div class="btn-container relative z-30 -mb-6">
      <div class="bg-[#F3C000] rounded-full p-2 w-14 h-14 cursor-pointer flex justify-center items-center" @click="show = !show" @keydown="show = !show">
        <div class="border-2 border-black rounded-full w-8 h-8 flex justify-center items-center">
          <ArrowUpward class="transition-all duration-300 icon-size" :class="{ 'rotate-180': show }" />
        </div>
      </div>
    </div>
    <div class="max-w-2xl w-full p-10 bg-[#005e5d] text-white rounded-t-md">
      <h3 class="text-xl font-bold title">
        {{ title }}
      </h3>
      <p v-if="question.answerText" class="text-sm mt-2 content">
        {{ question.answerText }}
      </p>

      <Button title="Continue practicing" class="mx-auto mt-8" @click="emitNextQuestion" />
    </div>
  </div>
</template>

<script setup>
import { useElementHover } from '@vueuse/core';
import { useQuestionStore } from '@stores/question';
import ArrowUpward from '~icons/material-symbols/arrow-upward';
import Button from '@/components/generic/base/Button.vue';

const myHoverableElement = ref(null);
const isHovered = useElementHover(myHoverableElement);

defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const { isAnswerCorrect } = storeToRefs(useQuestionStore());
const show = ref(false);
const title = computed(() => (isAnswerCorrect.value ? 'Correct!' : 'Incorrect'));

const emit = defineEmits(['nextQuestion']);

const emitNextQuestion = () => {
  show.value = false;
  emit('nextQuestion');
};

onMounted(() => {
  useQuestionStore().checkAnswer();
});
</script>

<style scoped lang="scss">
.slide-in-container {
  transform: translateY(calc(100% - 64px));
  transition: bottom 0.35s ease, opacity 0.35s ease, transform 0.35s ease;
  will-change: opacity, transform;
}

.slide-in-container.show {
  transform: none;
}
</style>
