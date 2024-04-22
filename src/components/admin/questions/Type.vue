<script setup>
import SingleAnswer from '@/assets/img/bearIcons/single.png';

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
</template>

<style lang="scss" scoped>
.question-type-icon {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
