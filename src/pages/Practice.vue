<script setup>
import QuestionHeader from "../components/questions/QuestionHeader.vue"
import QuestionForm from "../components/questions/QuestionForm.vue"
import QuestionSlideIn from "../components/questions/SlideIn/SlideIn.vue"
import { ref } from "vue"

const questions = ref({})
const fetchQuestions = async () =>
  await fetch("http://192.168.0.172:3000/questions")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      questions.value = json.subjects.General.questions
    })
fetchQuestions()
</script>

<template>
  <div class="question">
    <QuestionHeader :questionData="questions[0]" />
    <QuestionForm :questionData="questions[0]" />
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
