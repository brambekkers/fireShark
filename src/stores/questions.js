import { useCollection } from 'vuefire';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { watch } from 'vue';

export const useQuestionsStore = defineStore('questions', () => {
  const db = getFirestore();

  const selectedGroup = ref('');
  const selectedTopic = ref('');
 
  const questionsRef = computed(() => {
    if(!selectedGroup.value || !selectedTopic.value) return null
    return collection(db, `groups/${selectedGroup.value}/topics/${selectedTopic.value}/questions`)
  })

  watch(selectedGroup, () => {
    selectedTopic.value = ""
  })

  const addQuestion = (question) => {
    const path = `groups/${selectedGroup.value}/topics/${selectedTopic.value}/questions/${question.id}`
    const questionRef = doc(db, path);
    setDoc(questionRef, question);
  }

  const questions = useCollection(questionsRef)

  return {
    addQuestion,
    selectedGroup,
    selectedTopic,
    questions
  };
});

export default useQuestionsStore;
