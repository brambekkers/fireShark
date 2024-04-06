import { getFunctions, httpsCallable } from 'firebase/functions';
import { rand } from '@vueuse/core';
import { useUserStore } from '@/stores/user'

export const useQuestionStore = defineStore('question', () => {
  const isLoading = ref(true);
  const selectedTopics = ref([]);
  const selectedQuestion = ref({});
  const givenAnswer = ref([]);
  const hasAnswered = ref(false);
  const isAnswerCorrect = ref(true)
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
  const getQuestion = async () => {
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

  const toNextQuestion = async () => {
    // reset state
    hasAnswered.value = false;
    isAnswerCorrect.value = true
    givenAnswer.value = [];
    isLoading.value = true;

    // Load next question
    await getQuestion();
    isLoading.value = false;
  };

  

  const setAnswer = (answer) => {
    const questionType = selectedQuestion.value.type;

    if (questionType === 'singleAnswer') {
      const index = givenAnswer.value.findIndex((item) => item.text === answer.text);
      if (index === -1) {
        givenAnswer.value = [answer];
        return 
      }
      givenAnswer.value.splice(index, 1);
      return;
    }
    
    if (questionType === 'multipleAnswer') {
      const index = givenAnswer.value.findIndex((item) => item.text === answer.text);
      if (index === -1) return givenAnswer.value.push(answer);
      givenAnswer.value.splice(index, 1);
      return;
    }
  };

  const checkAnswer = () => {
    if (givenAnswer.value.length <= 0) {
      return false;
    }

    const questionType = selectedQuestion.value.type;

    if (questionType === 'singleAnswer') {
      return givenAnswer.value[0].value;
    }

    if (questionType === 'multipleAnswer') {
      const answerValues = givenAnswer.value.filter((item) => {
        return item.value === false;
      });
      return !!answerValues.indexOf(false) === -1;
    }
  };

  const saveAnswer = () => {
    const isSuccess = checkAnswer();
    hasAnswered.value = !hasAnswered.value;
    isAnswerCorrect.value = isSuccess
  };

  return {
    isLoading,
    selectedQuestion,
    selectedTopics,
    givenAnswer,
    isAnswerCorrect,
    hasAnswered,
    answerIsGiven,
    toggleSelectedTopics,
    toNextQuestion,
    setAnswer,
    checkAnswer,
    saveAnswer,
  };
});

export default useQuestionStore;
