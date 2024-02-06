<script setup>
import { useQuestionStore } from '@stores/question';

import QuestionHeader from '../components/questions/QuestionHeader.vue';
import QuestionForm from '../components/questions/QuestionForm.vue';
import QuestionSlideIn from '../components/questions/SlideIn/SlideIn.vue';
import GenericModal from '../components/GenericModal.vue';
import LevelUp from '../components/LevelUp.vue';

const store = useQuestionStore();
const { selectedQuestion, showQuestionSlideIn } = storeToRefs(store);
const { getQuestions } = store;
const content = ref(
  'very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of textvery long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text',
);
const nextQuestion = ref('Continue practicing');
const scoreMessage = ref(false);

const title = computed(() => 'Title');

getQuestions();

const showMessage = () => {
  if (Math.random() > 0.5) {
    scoreMessage.value = true;
    setTimeout(() => {
      scoreMessage.value = false;
      getQuestions();
    }, 3000);
  }

  return false;
};

const toNextQuestion = () => {
  showMessage();
};
</script>

<template>
  <div v-if="!scoreMessage" class="question">
    <QuestionHeader :question-data="selectedQuestion" />
    <QuestionForm :question-data="selectedQuestion" />
    <QuestionSlideIn
    v-if="showQuestionSlideIn"
      :next-question="nextQuestion"
      :title="title"
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
  justify-content: center;
}
</style>
