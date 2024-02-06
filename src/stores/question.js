import { defineStore } from 'pinia';
import { rand } from '@vueuse/core';
import { ref } from 'vue';

export const useQuestionStore = defineStore('question', () => {
  const selectedTopics = ref([]);
  const selectedQuestions = ref([]);
  const selectedQuestion = ref({});

  async function getQuestions() {
    try {
      return await fetch('http://192.168.0.192:3000/questions')
        .then((res) => res.json())
        .then((data) => {
          const randomNr = rand(0, selectedTopics.value.length);
          const topic = selectedTopics.value[randomNr];
          selectedQuestions.value = data?.subjects?.[topic];
          console.log(data?.subjects?.[topic].questions);

          const randomNumber = rand(0, data?.subjects?.[topic].questions.length);
          selectedQuestion.value = data?.subjects?.[topic].questions[randomNumber];
        });
    } catch (error) {
      console.log(error);
    }
  }

  function updateSelectedTopics(isSelected, title) {
    if (isSelected) selectedTopics.value.push(title);

    else {
      const index = selectedTopics.value.indexOf(title);
      if (index !== -1) {
        selectedTopics.value.splice(index, 1);
      }
    }
  }

  return {
    selectedQuestion, selectedQuestions, selectedTopics, getQuestions, updateSelectedTopics,
  };
});

export default useQuestionStore;
