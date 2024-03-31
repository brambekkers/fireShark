import { useCollection } from 'vuefire';
import { getFirestore, collection } from 'firebase/firestore';

export const useGroupStore = defineStore('groups', () => {
  const db = getFirestore();

  const groups = useCollection(collection(db, 'questions'))
  const groupsObject = computed(() => {
    const result = {};
    groups.value.forEach((group) => {
      result[group.id] = group;
    });
    return result;
  });

  watch(groups, () => {
    console.log('groups updated:', groups.value);
  }, { immidiate: true });


  return {
    groups,
    groupsObject
  };
});

export default useGroupStore;
