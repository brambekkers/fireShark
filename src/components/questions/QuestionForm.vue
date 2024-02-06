<template>
  <section>
    <form>
      <fieldset>
        <legend>{{ title }}</legend>
        <Answer v-for="answer in questionData?.answers || []" :answer="answer" :type="questionData?.type" />
      </fieldset>
      <Button title="Save my answer" :styleType="answerIsGiven ? 'primary' : 'disabled'" :disable="answerIsGiven" @on-clicked="saveAnswer" />
    </form>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useQuestionStore } from '@stores/question';
import Answer from './Answer.vue';
import Button from '../Button.vue';

const props = defineProps({
  questionData: Object,
});

const store = useQuestionStore();
const answerIsGiven = computed(() => store.answerIsGiven);

const title = computed(() => props?.questionData?.type === 'singleChoice' ? 'Choose one option.' : 'You may choose multiple options.');

async function saveAnswer() {
  const isSuccess = await store.checkAnswer();
  console.log(isSuccess)
  store.saveAnswer(isSuccess);
};
</script>
