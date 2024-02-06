<template>
  <input :id="questionId" :type="inputType" :name="questionId" :value="value">
  <label :for="questionId">{{ text }}</label>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
  answer: { type: Object, required: true },
  type: { type: String, required: true },
});

const inputType = props?.type === 'singleChoice' ? 'radio' : 'checkbox';
const text = computed(() => props?.answer.text);
const value = computed(() => props?.answer.value);
const questionId = `q-${text.value}`;
</script>
