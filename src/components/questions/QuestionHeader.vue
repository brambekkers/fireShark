<script setup>
//import { storeToRefs } from 'pinia';
// import { useQuestionStore } from '@stores/question';

defineProps({
  questionData: Object,
})

// const {selectedQuestion} = storeToRefs(useQuestionStore());
</script>

<template>
      <div>
       <img :src="questionData.headerImg"/>
       <p>{{ questionData.question }}</p>
      </div>
</template>

<style lang="scss" scoped>

</style>
