<script setup>
import QuestionHeader from "../components/questions/QuestionHeader.vue"
import { ref } from "vue"

const questions = ref({})
const fetchQuestions = async () =>
  await fetch("http://localhost:3000/questions")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      questions.value = json.subjects.General.questions
    })
fetchQuestions()
</script>

<template>
  <div>
    <h1>Q1</h1>
    <QuestionHeader :questions="questions"/>
  </div>
</template>
