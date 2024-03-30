import { useCurrentUser, useDocument } from 'vuefire';
import { doc, getFirestore } from 'firebase/firestore';

export const useUserStore = defineStore('user', () => {
  const db = getFirestore();
  const fbUser = useCurrentUser();

  const userRef = computed(() => {
    if (!fbUser.value) return null;
    return doc(db, `users/${fbUser.value.uid}`);
  });

  const user = useDocument(userRef);
  const stats = computed(() => user.value?.stats || {});
  const topics = computed(() => user.value?.topics || {});
  const settings = computed(() => user.value?.settings || {});

  watch(user, () => {
    console.log('User updated:', user.value);
  }, { immidiate: true });

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

  const calculatePerformancePercentage = () => {
    // Type checking to ensure all inputs are numbers
    if (
      typeof stats.value?.totalQuestions !== 'number' ||
      typeof stats.value?.correctAnswers !== 'number' ||
      typeof stats.value?.wrongAnswers !== 'number' ||
      typeof stats.value?.unansweredQuestions !== 'number'
    ) {
      console.error('All inputs must be numbers');
      return;
    }

    // Calculate the percentage of correct answers
    const calculatedPercentage =
      (stats.value.correctAnswers / stats.value.totalQuestions) * 100;

    // Update the reactive percentage ref, rounded to one decimal place
    stats.value.percentage = Math.round(calculatedPercentage * 10) / 10;
  };

  return {
    user,
    stats,
    topics,
    settings,
    updateUser,
    calculatePerformancePercentage,
  };
});

export default useUserStore;
