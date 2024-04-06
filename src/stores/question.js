import { rand } from '@vueuse/core';
import { computed } from 'vue';

export const useQuestionStore = defineStore('question', () => {

  const selectedTopics = ref([]);
  const selectedQuestions = ref([]);
  const selectedQuestion = ref({});
  const givenAnswer = ref([]);
  const showQuestionSlideIn = ref(false);
  const answerIsGiven = computed(() => givenAnswer.value.length > 0)

  const updateSelectedTopics = (isSelected, title) => {
    if (isSelected) selectedTopics.value.push(title);
    else {
      const index = selectedTopics.value.indexOf(title);
      if (index !== -1) {
        selectedTopics.value.splice(index, 1);
      }
    }
  }

  const getQuestions = async () => {
    try {
      // const res = await fetch('http://localhost:3000/questions');
      // const data = await res.json();

      const randomNr = rand(0, selectedTopics.value.length - 1);
      const topic = selectedTopics.value[randomNr];
      console.log(topic);

      selectedQuestions.value = data?.subjects?.[topic];

      const randomNumber = rand(0, data?.subjects?.[topic]?.questions.length - 1);
      selectedQuestion.value = data?.subjects?.[topic].questions[randomNumber];
    } catch (error) {
      console.log('error', error);
    }
  }

  const setAnswer = (wasSelected, answer) => {
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

  const checkAnswer = () => {
    if (givenAnswer.value.length <= 0) {
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

  const saveAnswer = () => {
    showQuestionSlideIn.value = !showQuestionSlideIn.value;
    const isSuccess = checkAnswer();
    console.log(`The answer was ${isSuccess ? 'correct' : 'incorrect'}`);
  }

  return {
    selectedQuestion, selectedQuestions, selectedTopics, givenAnswer, showQuestionSlideIn, answerIsGiven, updateSelectedTopics, getQuestions, setAnswer, checkAnswer, saveAnswer,
  };
});

export default useQuestionStore;
