<template>
  <section>
    <form>
      <fieldset>
        <legend class="my-1 font-bold italic text-sm border-l-yellow-400 border-l-2 pl-2">
          {{ title }}
        </legend>
        <Answer
          v-for="answer in questionData?.answers || []"
          :key="answer"
          :answer="answer"
          :type="questionData?.type"
        />
      </fieldset>
      <Button title="Save my answer" style-type="disabled" @on-clicked="saveAnswer" />
    </form>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import Answer from './Answer.vue';
import Button from '../Button.vue';

const props = defineProps({
  questionData: {
    type: Object,
    required: true,
  },
});

const title = computed(() => (props?.questionData?.type === 'singleChoice' ? 'Choose one option.' : 'You may choose multiple options.'));

function saveAnswer(par) {
  console.log('hi', par);
}
</script>
