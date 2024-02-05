<script setup>
import QuestionHeader from "../components/questions/QuestionHeader.vue"
import QuestionForm from "../components/questions/QuestionForm.vue"
import QuestionSlideIn from "../components/questions/SlideIn/SlideIn.vue"
import { ref } from "vue"

// const questions = ref({})
// const fetchQuestions = async () =>
//   await fetch("http://localhost:3000/questions")
//     .then((res) => res.json())
//     .then((json) => {
//       console.log(json);
//       questions.value = json.subjects.General.questions
//     })
// fetchQuestions()
</script>

<template>
  <div>
    <!-- <QuestionHeader :questions="questions" /> -->
    <QuestionSlideIn />
  </div>
</template>
