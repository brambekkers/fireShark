import { getFunctions, httpsCallable } from 'firebase/functions';
import { rand } from '@vueuse/core';
import { useUserStore } from '@/stores/user'

export const useQuestionStore = defineStore('question', () => {
  const selectedTopics = ref([]);
  const selectedQuestion = ref({});
  const givenAnswer = ref([]);
  const showQuestionSlideIn = ref(false);
  const answerIsGiven = computed(() => givenAnswer.value.length > 0);

  const cloudFunctions = getFunctions();
  const getRandomQuestion = httpsCallable(cloudFunctions, 'getRandomQuestion');

  const toggleSelectedTopics = (id) => {
    const index = selectedTopics.value.indexOf(id);
    if (index !== -1) {
      selectedTopics.value.splice(index, 1);
      return;
    }
    selectedTopics.value.push(id);
  };

  const getQuestions = async () => {
    try {
      const randomNr = rand(0, selectedTopics.value.length - 1);
      const topicId = selectedTopics.value[randomNr];
      const { topics } = useUserStore()
      const questionsRef = topics[topicId].questionsRef
      const { data } = await getRandomQuestion(questionsRef)
      selectedQuestion.value = data
    } catch (error) {
      console.log('error', error);
    }
  };

  const setAnswer = (wasSelected, answer) => {
    const questionType = selectedQuestion.value.type;

    if (questionType === 'singleChoice') {
      givenAnswer.value = [answer];
      return;
    }

    if (questionType === 'multipleChoice') {
      if (!wasSelected) {
        givenAnswer.value.push(answer);
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
  };

  const checkAnswer = () => {
    if (givenAnswer.value.length <= 0) {
      return false;
    }

    const questionType = selectedQuestion.value.type;

    if (questionType === 'singleChoice') {
      return givenAnswer.value[0].value;
    }

    if (questionType === 'multipleChoice') {
      const answerValues = givenAnswer.value.filter((item) => {
        return item.value === false;
      });
      return !!answerValues.indexOf(false) === -1;
    }
  };

  const saveAnswer = () => {
    showQuestionSlideIn.value = !showQuestionSlideIn.value;
    const isSuccess = checkAnswer();
    console.log(`The answer was ${isSuccess ? 'correct' : 'incorrect'}`);
  };

  return {
    selectedQuestion,
    selectedTopics,
    givenAnswer,
    showQuestionSlideIn,
    answerIsGiven,
    toggleSelectedTopics,
    getQuestions,
    setAnswer,
    checkAnswer,
    saveAnswer,
  };
});

export default useQuestionStore;
