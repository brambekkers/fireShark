import { useCollection } from 'vuefire';
import { useSessionStorage } from '@vueuse/core';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

// Composables
import { useImage } from '@/composable/image';

export const useCurriculumStore = defineStore('curriculum', () => {
  const db = getFirestore();

  const selectedGroup = useSessionStorage('sharkSelectedGroup', '');
  const selectedTopic = useSessionStorage('sharkSelectedTopic', '');
  const selectedQuestions = ref([]);

  const questionsRef = computed(() => {
    if (!selectedGroup.value || !selectedTopic.value) return null;
    return collection(
      db,
      `groups/${selectedGroup.value}/topics/${selectedTopic.value}/questions`,
    );
  });

  const questions = useCollection(questionsRef);
  const questionsMap = computed(() => {
    return questions.value.reduce((acc, obj) => {
      acc[obj.id] = obj;
      return acc;
    }, {});
  });

  watch(selectedGroup, () => {
    selectedTopic.value = '';
  });

  const getQuestionRef = (id) => {
    const path = `groups/${selectedGroup.value}/topics/${selectedTopic.value}/questions/${id}`;
    return doc(db, path);
  };

  const addQuestion = (question) => {
    const questionRef = getQuestionRef(question.id);
    setDoc(questionRef, question);
  };

  const deleteQuestion = (id) => {
    const question = questionsMap.value[id];
    if (!question) return;
    
    // Delete image
    if (question.imageRef) {
      const { deletePicture } = useImage(question?.imageRef || '');
      deletePicture();
    }

    // Delete the group
    const questionRef = getQuestionRef(question.id);
    deleteDoc(questionRef);
  };

  return {
    addQuestion,
    deleteQuestion,
    getQuestionRef,
    selectedGroup,
    selectedTopic,
    selectedQuestions,
    questions,
  };
});

export default useCurriculumStore;
