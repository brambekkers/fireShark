import { rand } from '@vueuse/core';

export const useQuestionStore = defineStore('question', () => {
  const selectedTopics = ref(['vue', 'javascript', 'general']);
  const selectedQuestions = ref([]);
  const selectedQuestion = ref({});
  const givenAnswer = ref([]);
  const showQuestionSlideIn = ref(false);

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

  function updateSelectedTopics(isSelected, title) {
    if (isSelected) selectedTopics.value.push(title);

    else {
      const index = selectedTopics.value.indexOf(title);
      if (index !== -1) {
        selectedTopics.value.splice(index, 1);
      }
    }
  }

  function setAnswer(isSelected, answer) {
    const questionType = selectedQuestion.value.type
    console.log(isSelected, questionType, answer)
    if (questionType === 'singleChoice') {
      givenAnswer.value = [answer];
      return;
    }

    if (questionType === 'multipleChoice') {
      givenAnswer.value.push(answer)
      return;
    }
  }

  function checkQuestion() {
    return true;
  }

  function saveAnswer(isSuccess) {
    showQuestionSlideIn.value = !showQuestionSlideIn.value;
    console.log(`The answer was ${isSuccess}`);
  }

  return {
    selectedQuestion, selectedQuestions, selectedTopics, givenAnswer, showQuestionSlideIn, getQuestions, setAnswer, checkQuestion, saveAnswer,
  };
});

export default useQuestionStore;
