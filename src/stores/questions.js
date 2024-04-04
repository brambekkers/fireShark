import { useCollection } from 'vuefire';
import { getFirestore, collection, doc } from 'firebase/firestore';
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

  const questions = useCollection(questionsRef)

  return {
    selectedGroup,
    selectedTopic,
    questions
  };
});

export default useQuestionsStore;
