import { useCurrentUser, useDocument } from 'vuefire';
import { doc, getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useGroupStore } from '@/stores/groups'

export const useUserStore = defineStore('user', () => {
  const db = getFirestore();
  const fbUser = useCurrentUser();

  const userRef = computed(() => {
    if (!fbUser.value) return null;
    return doc(db, `users/${fbUser.value.uid}`);
  });

  const user = useDocument(userRef);
  const stats = computed(() => user.value?.stats || {});
  const settings = computed(() => user.value?.settings || {});
  const topics = computed(() => {
    if(!user.value) return {}
    // Group the topics
    const { groups } = useGroupStore()
    const myGroups = settings.value?.position?.map((id) => groups.find((g)=> g.id === id)).filter(Boolean) || []
    const myTopics = {}
    myGroups.forEach(group => {
      group.topics.forEach((topic) => {
        const currentScore = user.value?.topics?.[topic.id]?.score
        if(topic.questionAmount <= 0) return;
        myTopics[topic.id] = {
          id: topic.id,
          name: topic.name,
          score: currentScore || 0,
          questionsRef: `groups/${group.id}/topics/${topic.id}/questions`
        }
      })
    });
    return myTopics || {}
  });

  const updateUser = async () => {
    try {
      await fetch(`http://localhost:3000/users/${user.value.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...user.value,
          stats: stats.value,
          topics: topics.value,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (data) => {
    try {
      const cloudFunctions = getFunctions();
      const createUserFunction = httpsCallable(cloudFunctions, 'createUser');
      const result = await createUserFunction(data)
      console.log('result', result)
      return result
    } catch (error) {
      return error
    }
  }

  return {
    user,
    stats,
    topics,
    settings,
    createUser,
    updateUser,
  };
});

export default useUserStore;
