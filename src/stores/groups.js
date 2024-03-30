import { useCollection } from 'vuefire';
import { getFirestore, collection } from 'firebase/firestore';

export const useGroupStore = defineStore('groups', () => {
  const db = getFirestore();

  const groups = useCollection(collection(db, 'questions'))
  const groupsObject = computed(() => groups.value?.reduce((acc, obj) => acc[obj.id] = obj, {}));

  watch(groups, () => {
    console.log('groups updated:', groups.value);
  }, { immidiate: true });


  return {
    groups,
    groupsObject
  };
});

export default useGroupStore;
