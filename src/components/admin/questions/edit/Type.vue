<script setup>
import IconTarget from '~icons/lucide/target';

import Select from '@/components/generic/inputs/Select.vue';
import Type from '@/components/admin/questions/Type.vue';

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
    <div class="flex">
      <Select
        v-model="Qtype"
        size="md"
        elevation="none"
        class="grow-1 min-w-52"
      >
        <option
          v-for="questionType of questionTypes"
          :key="questionType"
          :value="questionType"
        >
          {{ questionType }}
        </option>
      </Select>
      <div class="mx-4 flex items-center">
        <Type :type="Qtype" />
      </div>
    </div>
  </div>
</template>
