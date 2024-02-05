<script setup>
import { ref } from "vue"
import { storeToRefs } from 'pinia';
import { useQuestionStore } from '@stores/question';

import QuestionHeader from "../components/questions/QuestionHeader.vue"
import QuestionForm from "../components/questions/QuestionForm.vue"
import QuestionSlideIn from "../components/questions/SlideIn/SlideIn.vue"

const questions = ref({})
const title = ref("very long title with a lot of text");
const content = ref("very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of textvery long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text very long content with a lot of text");

const fetchQuestions = async () =>
  await fetch("http://192.168.0.172:3000/questions")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      questions.value = json.subjects.General.questions
    })
fetchQuestions()

const { selectedTopics } = storeToRefs(useQuestionStore());
</script>
<template>
  <div class="question">
    <h1>I'm the practice page</h1>
    <p>{{ selectedTopics }}</p>
    <QuestionHeader :questionData="questions[0]" />
    <QuestionForm :questionData="questions[0]" />
    <QuestionSlideIn :title="title" :content="content" />
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
