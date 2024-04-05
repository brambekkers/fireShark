<script setup>
import Select from '@/components/generic/inputs/Select.vue';
import IconTarget from '~icons/lucide/target';

import { questionTypes } from '@/constants/questions';
const Qtype = defineModel('type', {
  type: String,
  required: true,
});
</script>

<template>
  <div class="flex items-center justify-between gap-10 w-full">
    <div class="flex gap-2 items-center">
      <IconTarget class="w-5 text-app-primary" />
      <h4>Question type</h4>
    </div>
    <Select v-model="Qtype" size="md" elevation="none" class="w-1/2">
      <option
        :value="questionType"
        v-for="questionType of questionTypes"
        :key="questionType"
      >
        {{ questionType }}
      </option>
      <option value="editor">Editor</option>
      <option value="moderator">Moderator</option>
      <option value="admin">Admin</option>
    </Select>
  </div>
</template>
