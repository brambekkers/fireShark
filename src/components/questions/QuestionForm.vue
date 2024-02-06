<template>
  <section>
    <form>
      <fieldset>
        <legend>{{title}}</legend>
        <Answer v-for="answer in questionData?.answers || []" :answer="answer" :type="questionData?.type" />
      </fieldset>
      <Button @on-clicked="saveAnswer" title="Save my answer" styleType="disabled"/>
    </form>
  </section>
</template>

<script setup>
import {computed} from "vue";
import { useQuestionStore } from '@stores/question';
import Answer from "./Answer.vue";
import Button from "../Button.vue";

const props = defineProps({
  questionData: Object,
});

const store = useQuestionStore();
const title = computed(() => props?.questionData?.type === 'singleChoice' ? 'Choose one option.' : 'You may choose multiple options.');

async function saveAnswer() {
  const isSuccess = await store.checkAnswer();
  store.saveAnswer(isSuccess);
};
</script>