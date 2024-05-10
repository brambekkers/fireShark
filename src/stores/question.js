import {getFirestore, collection, query, where, limit, getDocs } from "firebase/firestore";  
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useCurrentUser } from 'vuefire'

import { rand } from '@vueuse/core';
import { useUserStore } from '@/stores/user'
import { generate32BitInt } from '@/utils/number';

export const useQuestionStore = defineStore('question', () => {
  const db = getFirestore();

  const startTime = ref(new Date());
  const isLoading = ref(true);
  const selectedTopics = ref([]);
  const selectedQuestion = ref({});
  const givenAnswer = ref([]);
  const hasAnswered = ref(false);
  const isAnswerCorrect = ref(true)
  const answerIsGiven = computed(() => givenAnswer.value.length > 0);
  const cloudFunctions = getFunctions();
  const handleQuestionOutcome = httpsCallable(cloudFunctions, 'handleQuestionOutcome');

  const toggleSelectedTopics = (id) => {
    const index = selectedTopics.value.indexOf(id);
    if (index !== -1) {
      selectedTopics.value.splice(index, 1);
      return;
    }
    selectedTopics.value.push(id);
  };

  const getRandomQuestion = async (collectionRef) => {
    const randomNum = generate32BitInt()
    console.log('randomNum', randomNum)
    const q = query(collection(db, collectionRef), where("random", ">=", randomNum), limit(1))
    const snapshot = await getDocs(q)
    if (snapshot.empty) {
      return getRandomQuestion(collectionRef)
    }
    return snapshot.docs[0].data()
  }

  const getQuestion = async () => {
    try {
      const randomNr = rand(0, selectedTopics.value.length - 1);
      const topicId = selectedTopics.value[randomNr];
      const { topics } = useUserStore()
      const questionsRef = topics[topicId].questionsRef
      const newQuestion = await getRandomQuestion(questionsRef)
      selectedQuestion.value = { ...newQuestion, questionsRef}
      startTime.value = new Date()
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
    const user = useCurrentUser()
    const isSuccess = checkAnswer();
    const refArr = selectedQuestion.value.questionsRef.split('/')
    const time = new Date() - startTime.value;

    handleQuestionOutcome({ 
      uid: user.value.uid,
      group: refArr[1], 
      topic: refArr[3], 
      question: selectedQuestion.value.id, 
      time, 
      isAnswerCorrect: isSuccess
    })

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
