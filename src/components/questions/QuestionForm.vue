<template>
  <section>
    <form>
      <fieldset>
        <legend>{{title}}</legend>
        <Answer v-for="answer in data.answers" :answer="answer" :type="data.type" />
      </fieldset>
    </form>
  </section>
</template>

<script setup>
import Answer from "./Answer.vue"
const data = {
  type: "singleChoice",
  subject: "Javascript",
  headerImg: "../images/background/javascript_code.png",
  question: "<div>In which year was Javascript developed</div>",
  answers: [
    {
      text: "1994",
      value: false
    },
    {
      text: "1995",
      value: true
    },
    {
      text: "1996",
      value: false
    },
    {
      text: "1997",
      value: false
    }
  ]
}
const title = data.type === 'singleChoice' ? 'Choose one option.' : 'You may choose multiple options.'
// const {answers} = data || [];
</script>