<template>
  <section>
    <form>
      <fieldset>
        <legend>{{title}}</legend>
        <Answer v-for="answer in questionData.answers" :answer="answer" :type="questionData.type" />
      </fieldset>
    </form>
  </section>
</template>

<script setup>
import Answer from "./Answer.vue"

const props = defineProps({
  questionData: Object,
});

const title = props.questionData?.type === 'singleChoice' ? 'Choose one option.' : 'You may choose multiple options.'
</script>