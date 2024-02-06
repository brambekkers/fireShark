<script setup>
import { useQuestionStore } from '@stores/question';

import QuestionHeader from '../components/questions/QuestionHeader.vue';
import QuestionForm from '../components/questions/QuestionForm.vue';
import QuestionSlideIn from '../components/questions/SlideIn/SlideIn.vue';

const store = useQuestionStore();
const { selectedQuestion } = storeToRefs(store);
const { getQuestions } = store;
const content = ref(
  'very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of textvery long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text',
);
const nextQuestion = ref('Continue practicing');

const toNextQuestion = () => {
  console.log('emitNextQuestion');
};

const title = computed(() => 'Title');

getQuestions();
</script>

<template>
  <div class="question">
    <QuestionHeader :question-data="selectedQuestion" />
    <QuestionForm :question-data="selectedQuestion" />
    <QuestionSlideIn
      :next-question="nextQuestion"
      :title="title"
      :content="content"
      @emit-next-question="toNextQuestion"
    />
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
