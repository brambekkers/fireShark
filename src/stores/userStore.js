import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref({});
  const stats = computed(() => user.value.stats || {});
  const topics = computed(() => user.value.topics || []);
  const isUserLoading = ref(false)
  const isUserError = ref(false)

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`http://192.168.0.192:3000/users/${userId}`);
      user.value = await response.json();
    } catch (error) {
      isUserError.value = true,
      console.log(error);
    } finally {
      isUserLoading.value = false
    }
  };

  const updateUser = async (userObj) => {
    try {
      await fetch(`http://192.168.0.192:3000/users/${user.value.id}`, {
        method: 'PATCH',
        body: JSON.stringify(userObj),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePerformancePercentage = () => {
    console.log('totalQuestions', stats.value?.totalQuestions);
    console.log('correctAnswers', stats.value?.correctAnswers);
    console.log('wrongAnswers', stats.value?.wrongAnswers);
    console.log('unansweredQuestions', stats.value?.unansweredQuestions);
    // Type checking to ensure all inputs are numbers
    if (
      typeof stats.value?.totalQuestions !== 'number'
      || typeof stats.value?.correctAnswers !== 'number'
      || typeof stats.value?.wrongAnswers !== 'number'
      || typeof stats.value?.unansweredQuestions !== 'number'
    ) {
      console.error('All inputs must be numbers');
      return;
    }

    // Calculate the percentage of correct answers
    const calculatedPercentage = (stats.value.correctAnswers / stats.value.totalQuestions) * 100;

    // Update the reactive percentage ref, rounded to one decimal place
    stats.value.percentage = Math.round(calculatedPercentage * 10) / 10;
  };

  return {
    user,
    stats,
    topics,
    fetchUser,
    updateUser,
    calculatePerformancePercentage,
  };
});

export default useUserStore;
