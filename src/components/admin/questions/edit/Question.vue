<script setup>
import IconQuestion from '~icons/material-symbols/live-help-outline-rounded';
import TextArea from '@/components/generic/inputs/TextArea.vue';

const question = defineModel('question', {
  type: String,
  required: true,
});
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex gap-2 items-center">
      <IconQuestion class="w-5 text-app-primary" />
      <h4>The question:</h4>
    </div>
    <TextArea v-model="question" size="md" elevation="none" />
  </div>
</template>
