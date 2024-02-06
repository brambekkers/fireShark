<script setup>
// import { storeToRefs } from 'pinia';
// import { useQuestionStore } from '@stores/question';

defineProps({
  questionData: { type: Object, required: true },
});

// const {selectedQuestion} = storeToRefs(useQuestionStore());
</script>

<template>
  <div v-if="questionData" class="questionHeader">
    <img :src="questionData.headerImg" alt="question-picture" class="image" />
    <div>
      <p class="questionText">
        {{ questionData.question }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.questionHeader {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 86px
}
.image {
  width: 570px;
  height: 291px;
}
.questionText {
  margin-top: 0;
  margin-bottom: 1rem;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  font-weight: 400;
  font-size: 1.5rem;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  max-width: 570px;
}
</style>
