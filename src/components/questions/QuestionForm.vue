<template>
  <section>
    <form>
      <fieldset>
        <legend
          class="my-1 font-bold italic text-sm border-l-yellow-400 border-l-2 pl-2"
        >
          {{ title }}
        </legend>
        <Answer
          v-for="answer in questionData?.answers || []"
          :key="answer"
          :answer="answer"
          :type="questionData?.type"
        />
      </fieldset>
      <div class="button-save-answer">
        <Button
          title="Save my answer"
          :style-type="answerIsGiven ? 'primary' : 'disabled'"
          :disabled="!answerIsGiven"
          @on-clicked="saveAnswer"
        />
      </div>
    </form>
  </section>
</template>

<script setup>
import { useQuestionStore } from '@stores/question';
import Answer from './Answer.vue';
import Button from '@/components/generic/Button.vue';

const props = defineProps({
  questionData: {
    type: Object,
    required: true,
  },
});

const store = useQuestionStore();
const answerIsGiven = computed(() => store.answerIsGiven);
const title = computed(() =>
  props?.questionData?.type === 'singleChoice'
    ? 'Choose one option.'
    : 'You may choose multiple options.',
);

async function saveAnswer() {
  store.saveAnswer();
}
</script>

<style lang="scss" scoped>
.button-save-answer {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  margin-top: 3rem;
}
</style>
