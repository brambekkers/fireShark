<script setup>
import { useQuestionStore } from '@stores/question';

const props = defineProps({
  answer: { type: Object, required: true },
  type: { type: String, required: true },
});
const { givenAnswer, hasAnswered } = storeToRefs(useQuestionStore());

const answerId = `q-${props.answer?.text}`;
const isSelected = computed(() =>
  givenAnswer.value.some((a) => a.text === props.answer.text),
);

const giveAnswer = () => {
  useQuestionStore().setAnswer(props?.answer);
};
</script>

<template>
  <fieldset class="space-y-5">
    <legend class="sr-only">Answer</legend>
    <div>
      <label
        :for="answerId"
        class="flex cursor-pointer items-center justify-between gap-6 rounded-2xl border-gray-100 bg-white py-8 px-6 font-medium shadow-md hover:border-gray-200 has-[:checked]:shadow-xl has-[:checked]:ring-1 has-[:checked]:border-2"
        :class="{
          ' has-[:checked]:border-app-primary has-[:checked]:ring-app-primary':
            !hasAnswered || (hasAnswered && isSelected === answer.value),
          'has-[:checked]:border-app-danger has-[:checked]:ring-app-danger':
            hasAnswered && isSelected !== answer.value,
        }"
      >
        <p class="text-gray-700">{{ answer.text }}</p>
        <input
          :id="answerId"
          type="checkbox"
          :value="answer.value"
          @input="giveAnswer()"
          :checked="isSelected"
          :disabled="hasAnswered"
          class="sr-only"
        />
      </label>
    </div>
  </fieldset>
</template>
