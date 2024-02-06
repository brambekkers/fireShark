<template>
  <input :id="questionId" :type="inputType" :name="questionId" :value="value">
  <label :for="questionId">{{ text }}</label>
</template>

<script setup>
const props = defineProps({
  answer: { type: Object, required: true },
  type: { type: String, required: true },
});

const inputType = props?.type === 'singleChoice' ? 'radio' : 'checkbox';
const { text, value } = props?.answer || '';
const questionId = `q-${props?.text}`;
</script>
