<script setup>
import { useQuestionStore } from '@stores/question';

import HeaderButtons from '@/components/questions/HeaderButtons.vue';
import QuestionHeader from '@/components/questions/Header.vue';
import QuestionForm from '@/components/questions/QuestionForm.vue';
import QuestionSlideIn from '@/components/questions/SlideIn/SlideIn.vue';
import GenericModal from '@/components/GenericModal.vue';
import LevelUp from '@/components/LevelUp.vue';

const store = useQuestionStore();
const { selectedQuestion, showQuestionSlideIn, givenAnswer } =
  storeToRefs(store);
const { getQuestions } = store;
const content = ref('very long content with a lot of text');
const nextQuestion = ref('Continue practicing');
const scoreMessage = ref(false);

getQuestions();

const showMessage = () => {
  if (store.checkAnswer()) {
    scoreMessage.value = true;
    setTimeout(() => {
      scoreMessage.value = false;
      getQuestions();
    }, 3000);
  }
};

const toNextQuestion = () => {
  getQuestions();
  showMessage();
  showQuestionSlideIn.value = false;
  givenAnswer.value = [];
};
</script>

<template>
  <div class="h-44 max-w-2xl mx-auto relative -mt-40">
    <div v-if="!scoreMessage" class="question relative flex flex-col">
      <HeaderButtons />
      <QuestionHeader :question-data="selectedQuestion" />
      <QuestionForm :question-data="selectedQuestion" />
      <QuestionSlideIn
        v-if="showQuestionSlideIn"
        :next-question="nextQuestion"
        :content="content"
        @emit-next-question="toNextQuestion()"
      />
    </div>
    <GenericModal :is-open="scoreMessage" :fireworks="true">
      <LevelUp />
    </GenericModal>
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
