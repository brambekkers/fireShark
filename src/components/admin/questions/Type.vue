<script setup>
import SingleAnswer from '@/assets/img/bearIcons/single.png';
import MultipleAnswer from '@/assets/img/bearIcons/multiple.png';
import TrueFalse from '@/assets/img/bearIcons/trueFalse.png';
import Code from '@/assets/img/bearIcons/code.png';
import Opinion from '@/assets/img/bearIcons/opinion.png';
import Input from '@/assets/img/bearIcons/input.png';
import Order from '@/assets/img/bearIcons/order.png';
import Match from '@/assets/img/bearIcons/match.png';

defineProps({
  type: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <img
    v-if="type === 'singleAnswer'"
    class="question-type-icon"
    :src="SingleAnswer"
    alt="Single answer"
  />

  <img
    v-else-if="type === 'multipleAnswer'"
    class="question-type-icon"
    :src="MultipleAnswer"
    alt="Multiple answer"
  />

  <img
    v-else-if="type === 'trueFalse'"
    class="question-type-icon"
    :src="TrueFalse"
    alt="True/false answer"
  />

  <img
    v-else-if="type === 'opinion'"
    class="question-type-icon"
    :src="Opinion"
    alt="Opinion answer"
  />

  <img
    v-else-if="type === 'coding'"
    class="question-type-icon"
    :src="Code"
    alt="Coding answer"
  />

  <img
    v-else-if="type === 'fillInTheBlank'"
    class="question-type-icon"
    :src="Input"
    alt="Fill in the blanks"
  />

  <img
    v-else-if="type === 'ordering'"
    class="question-type-icon"
    :src="Order"
    alt="Order answer"
  />

  <img
    v-else-if="type === 'matching'"
    class="question-type-icon"
    :src="Match"
    alt="Match answer"
  />
</template>

<style lang="scss" scoped>
.question-type-icon {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
