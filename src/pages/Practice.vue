<script setup>
import { ref } from "vue"
import { storeToRefs } from 'pinia';
import {useQuestionStore} from '@stores/question';

import QuestionHeader from "../components/questions/QuestionHeader.vue"
import QuestionForm from "../components/questions/QuestionForm.vue"
import QuestionSlideIn from "../components/questions/SlideIn/SlideIn.vue"

const store = useQuestionStore();
const { selectedTopics, selectedQuestion } = storeToRefs(store);
const {getQuestions} = store;

getQuestions();
</script>

<template>
  <div class="question">
    <h1>I'm the practice page</h1>
    <p>{{ selectedTopics }}</p>
    {{ questions }}
    <QuestionHeader :questionData="selectedQuestion" />
    <QuestionForm :questionData="selectedQuestion" />
    <QuestionSlideIn />
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
