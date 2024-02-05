<script setup>
//import { storeToRefs } from 'pinia';
// import { useQuestionStore } from '@stores/question';
import { ref } from "vue";

const selectedQuestion = ref( {
    "type": "singleChoice",
    "subject": "Javascript",
    "headerImg": "../images/background/javascript_code.png",
    "question": "In which year was Javascript developed",
    "answers": [
      {
        "text": "1994",
        "value": false
      },
      {
        "text": "1995",
        "value": true
      },
      {
        "text": "1996",
        "value": false
      },
      {
        "text": "1997",
        "value": false
      }
    ]
  })

// const {selectedQuestion} = storeToRefs(useQuestionStore());
</script>

<template>
      <div>
       <img :src="selectedQuestion.headerImg"/>
       <p>{{ selectedQuestion.question }}</p>
      </div>
</template>

<style lang="scss" scoped>

</style>
