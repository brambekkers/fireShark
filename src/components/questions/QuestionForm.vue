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
const title = data.type === 'singleChoice' ? 'Choose one option.' : 'You may choose multiple options.'
</script>