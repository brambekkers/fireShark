<template>
  <input 
  :id="questionId" 
  :type="inputType" 
  :name="inputType" 
  :value="value"
  @input="giveAnswer($event)" 
  :selected="isSelected"
  >
  <label :for="questionId">{{ text }}</label>
</template>

<script setup>
import {ref, computed} from 'vue';
import { useQuestionStore } from '@stores/question';

const props = defineProps({
  answer: { type: Object, required: true },
  type: { type: String, required: true },
});

const store = useQuestionStore();

const inputType = props?.type === 'singleChoice' ? 'radio' : 'checkbox';
const text = computed(() => props?.answer.text);
const value = computed(() => props?.answer.value);
const questionId = `q-${text.value}`;
const isSelected = ref(false);

function giveAnswer() {
  store.setAnswer(isSelected, props?.answer)
  isSelected.value = !isSelected.value;
}
</script>
