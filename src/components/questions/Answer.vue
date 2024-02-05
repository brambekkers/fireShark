<template>
  <input :type="inputType" :name="questionId" :id="questionId" :value="value">
  <label :for="questionId">{{ text }}</label>
</template>

<script setup>
  const props = defineProps({
    answer: Object,
    type: String,
  });

  const inputType = props?.type === 'singleChoice' ? 'radio' : 'checkbox';
  const {text, value} = props?.answer || '';
  const questionId = `q-${props?.text}`;
</script>