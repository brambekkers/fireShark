<script setup>
import { useQuestionStore } from '@stores/question';

import QuestionHeader from '../components/questions/QuestionHeader.vue';
import QuestionForm from '../components/questions/QuestionForm.vue';
import QuestionSlideIn from '../components/questions/SlideIn/SlideIn.vue';
import GenericModal from '../components/GenericModal.vue';
import LevelUp from '../components/LevelUp.vue';

const store = useQuestionStore();
const { selectedQuestion, showQuestionSlideIn, givenAnswer } = storeToRefs(store);
const { getQuestions } = store;
const content = ref(
  'very long content with a lot of text',
);
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
  <div v-if="!scoreMessage" class="question">
    <div class="max-w-[610px]">
      <QuestionHeader :question-data="selectedQuestion" />
      <QuestionForm :question-data="selectedQuestion" />
    </div>
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
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -48px;
  z-index: 20;
  position: relative;
}
</style>
