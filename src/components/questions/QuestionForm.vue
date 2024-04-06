<script setup>
import { useQuestionStore } from '@stores/question';
import Answer from './Answer.vue';
import Button from '@/components/generic/base/Button.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const { hasAnswered, answerIsGiven } = storeToRefs(useQuestionStore());

const title = computed(() =>
  props?.question?.type === 'singleAnswer'
    ? 'Choose one option.'
    : 'You may choose multiple options.',
);
</script>

<template>
  <form class="w-full">
    <fieldset>
      <legend class="my-1 font-bold italic border-l-yellow-400 border-l-2 pl-2">
        {{ title }}
      </legend>
      <Answer
        v-for="answer in question?.answers || []"
        :key="answer"
        :answer="answer"
        :type="question?.type"
      />
    </fieldset>
    <div class="flex justify-center my-12">
      <Button
        title="Save my answer"
        :type="!answerIsGiven || hasAnswered ? 'disabled' : 'primary'"
        :disabled="!answerIsGiven || hasAnswered"
        @click="useQuestionStore().saveAnswer()"
      />
    </div>
  </form>
</template>
