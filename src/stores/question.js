import { rand } from '@vueuse/core';
import { computed } from 'vue';

export const useQuestionStore = defineStore('question', () => {
  const selectedTopics = ref(['vue', 'javascript', 'general']);
  const selectedQuestions = ref([]);
  const selectedQuestion = ref({});
  const givenAnswer = ref([]);
  const showQuestionSlideIn = ref(false);
  const answerIsGiven = computed(() => givenAnswer.value.length > 0)

  function updateSelectedTopics(isSelected, title) {
    if (isSelected) selectedTopics.value.push(title);

    else {
      const index = selectedTopics.value.indexOf(title);
      if (index !== -1) {
        selectedTopics.value.splice(index, 1);
      }
    }
  }

  async function getQuestions() {
    try {
      const res = await fetch('http://192.168.0.192:3000/questions');
      const data = await res.json();
      const randomNr = rand(0, selectedTopics.value.length - 1);
      const topic = selectedTopics.value[randomNr];
      selectedQuestions.value = data?.subjects?.[topic];

      const randomNumber = rand(0, data?.subjects?.[topic]?.questions.length - 1);
      selectedQuestion.value = data?.subjects?.[topic].questions[randomNumber];
    } catch (error) {
      console.log('error', error);
    }
  }

  function setAnswer(wasSelected, answer) {
    const questionType = selectedQuestion.value.type

    if (questionType === 'singleChoice') {
      givenAnswer.value = [answer];
      return;
    }

    if (questionType === 'multipleChoice') {
      if (!wasSelected) {
        givenAnswer.value.push(answer)
        return;
      }

      if (wasSelected) {
        const currentAnswer = givenAnswer.value;
        let foundIndex;

        for (let i = 0; i < currentAnswer.length; i++) {
          if (currentAnswer[i].text === answer.text) {
            foundIndex = i;
          }
        }

        currentAnswer.splice(foundIndex, 1);
        givenAnswer.value = currentAnswer;
      }
      return;
    }
  }

  function checkAnswer() {
    if (!answerIsGiven.value) {
      return false;
    }

    const questionType = selectedQuestion.value.type

    if (questionType === 'singleChoice') {
      return givenAnswer.value[0].value
    }

    if (questionType === 'multipleChoice') {
      const answerValues = givenAnswer.value.filter((item) => {
        return item.value === false;
      });
      return !!answerValues.indexOf(false) === -1;
    }
  }

  function saveAnswer(isSuccess) {
    showQuestionSlideIn.value = !showQuestionSlideIn.value;
    console.log(`The answer was ${isSuccess ? 'correct' : 'incorrect'}`);
  }

  return {
    selectedQuestion, selectedQuestions, selectedTopics, givenAnswer, showQuestionSlideIn, answerIsGiven, updateSelectedTopics, getQuestions, setAnswer, checkAnswer, saveAnswer,
  };
});

export default useQuestionStore;
