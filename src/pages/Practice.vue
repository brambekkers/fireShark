<script setup>
import FullPageLoader from '@/components/generic/FullPageLoader.vue';

import { useQuestionStore } from '@stores/question';

import HeaderButtons from '@/components/questions/HeaderButtons.vue';
import QuestionHeader from '@/components/questions/Header.vue';
import QuestionForm from '@/components/questions/QuestionForm.vue';
import QuestionSlideIn from '@/components/questions/SlideIn/SlideIn.vue';
import GenericModal from '@/components/GenericModal.vue';
import LevelUp from '@/components/LevelUp.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const {
  selectedTopics,
  isLoading,
  selectedQuestion,
  hasAnswered,
  isAnswerCorrect,
} = storeToRefs(useQuestionStore());
const content = ref(
  'very long content with a lot of text, lorem ipsum and stuff like that to test the slide in component and see how it behaves with a lot of text and stuff like that',
);
const nextQuestion = ref('Continue practicing');
const showScoreMessage = ref(false);

watch(hasAnswered, () => {
  const random = Math.random();
  if (hasAnswered.value && isAnswerCorrect.value && random > 0.5) {
    showScoreMessage.value = true;
    // random number 0-1

    setTimeout(() => {
      showScoreMessage.value = false;
      useQuestionStore().toNextQuestion();
    }, 3000);
  }
});

onMounted(async () => {
  // To do: Force navigation and skip the modal
  if (!selectedTopics.value.length) {
    console.log('No topics selected');
    router.push({ path: '/overview', query: { skipModal: true } });
    return;
  }
  await useQuestionStore().toNextQuestion();
  isLoading.value = false;
  return;
});
</script>

<template>
  <div class="h-44 max-w-2xl mx-auto relative -mt-40">
    <div v-if="!showScoreMessage" class="question relative flex flex-col">
      <HeaderButtons />
      <QuestionHeader :question="selectedQuestion" />
      <QuestionForm :question="selectedQuestion" />
      <QuestionSlideIn
        v-if="hasAnswered"
        :next-question="nextQuestion"
        :content="content"
        @emit-next-question="useQuestionStore().toNextQuestion()"
      />
    </div>
    <GenericModal :is-open="showScoreMessage" :fireworks="true">
      <LevelUp />
    </GenericModal>
    <FullPageLoader :is-loading="isLoading" />
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  display: flex;
  flex-direction: column;
}
</style>
