<script setup>
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

const setSelected = () => {
  isSelected.value = !isSelected.value;
};

const giveAnswer = () => {
  store.setAnswer(isSelected.value, props?.answer);
  setSelected();
};
</script>

<template>
  <fieldset class="space-y-5">
    <legend class="sr-only">Answer</legend>
    <div>
      <label
        :for="questionId"
        class="flex cursor-pointer items-center justify-between gap-6 rounded-2xl border border-gray-100 bg-white py-8 px-6 font-medium shadow-md hover:border-gray-200 has-[:checked]:border-sharp-primary has-[:checked]:border-2 has-[:checked]:shadow-xl has-[:checked]:ring-1 has-[:checked]:ring-sharp-primary"
      >
        <p class="text-gray-700">{{ text }}</p>
        <input
          :id="questionId"
          :type="inputType"
          :name="inputType"
          :value="value"
          @input="giveAnswer($event)"
          :selected="isSelected"
          class="sr-only"
        />
      </label>
    </div>
  </fieldset>
</template>
