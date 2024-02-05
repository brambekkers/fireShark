<script setup>
//import { storeToRefs } from 'pinia';
// import { useQuestionStore } from '@stores/question';

defineProps({
  questionData: Object,
})

// const {selectedQuestion} = storeToRefs(useQuestionStore());
</script>

<template>
      <div class="questionHeader">
       <img :src="questionData.headerImg" class="image"/>
       <div>
       <p>{{ questionData.question }}</p>
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
</style>
