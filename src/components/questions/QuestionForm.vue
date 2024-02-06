<template>
  <section>
    <form>
      <fieldset>
        <legend>{{ title }}</legend>
        <Answer v-for="answer in questionData?.answers || []" :answer="answer" :type="questionData?.type" />
      </fieldset>
      <Button title="Save my answer" style-type="disabled" @on-clicked="saveAnswer" />
    </form>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import Answer from './Answer.vue';
import Button from '../Button.vue';

const props = defineProps({
  questionData: Object,
});

const title = computed(() => (props?.questionData?.type === 'singleChoice' ? 'Choose one option.' : 'You may choose multiple options.'));

function saveAnswer(par) {
  console.log('hi', par);
}
</script>
