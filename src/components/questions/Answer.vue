<template>
  <fieldset class="space-y-4">
    <legend class="sr-only">
      Answer
    </legend>
    <div>
      <label
        :for="questionId"
        class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
      >
        <p class="text-gray-700">{{ text }}</p>
        <input :id="questionId" :type="inputType" :name="questionId" :value="value" class="sr-only">
      </label>
    </div>
  </fieldset>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  answer: { type: Object, required: true },
  type: { type: String, required: true },
});

const inputType = props?.type === 'singleChoice' ? 'radio' : 'checkbox';
const text = computed(() => props?.answer.text);
const value = computed(() => props?.answer.value);
const questionId = `q-${text.value}`;
</script>
