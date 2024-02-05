<template>
  <input :type="inputType" :name="questionId" :id="questionId" :value="value">
  <label :for="questionId">{{ text }}</label>
</template>

<script setup>
  defineProps({
    answer: Object,
    type: String,
  })

  const inputType = this?.type === 'singleChoice' ? 'radio' : 'checkbox';
  const {text, value} = this.answer;
  const questionId = `q-${this?.text}`;
</script>