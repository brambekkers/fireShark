import { defineStore } from 'pinia'
import { rand } from '@vueuse/core';
import { ref } from 'vue'

export const useQuestionStore = defineStore('question', () => {
  const selectedTopics = ref(['general', 'javascript', 'vue']);
  const selectedQuestions = ref([]);
  const selectedQuestion = ref({});

  async function getQuestions() {
    try {
      const res = await fetch("http://192.168.0.192:3000/questions");
      const data = await res.json();
      const randomNr = rand(0, selectedTopics.value.length - 1);
      const topic = selectedTopics.value[randomNr];

      console.log(selectedTopics.value, randomNr, topic)
      selectedQuestions.value = data?.subjects?.[topic];
      console.log(data?.subjects)
      const randomNumber = rand(0, data?.subjects?.[topic]?.questions.length - 1);
      selectedQuestion.value = data?.subjects?.[topic].questions[randomNumber];
    } catch (error) {
      console.log("error", error)
    }
  }

  return { selectedQuestion, selectedQuestions, selectedTopics, getQuestions }
})

export default useQuestionStore;
