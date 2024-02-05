import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useQuestionStore = defineStore('question', () => {
  const selectedTopics = ref(['general', 'javascript', 'debug']);

  return { selectedTopics };
});

export default useQuestionStore;
