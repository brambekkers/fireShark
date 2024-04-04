import { useCollection } from 'vuefire';
import { getFirestore, collection } from 'firebase/firestore';

export const useGroupStore = defineStore('groups', () => {
  const db = getFirestore();

  const groups = useCollection(collection(db, 'groups'))
  const groupsObject = computed(() => {
    const result = {};
    groups.value.forEach((group) => {
      result[group.id] = group;
    });
    return result;
  });

  return {
    groups,
    groupsObject
  };
});

export default useGroupStore;
