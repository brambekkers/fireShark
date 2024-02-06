import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { rand } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  const user = ref({});
  const stats = computed(() => user.value.stats || {});
  const topics = computed(() => user.value.topics || []);
  const settings = computed(() => user.value.settings || {});
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

  const getRandomUser = () => {
    fetchUser(`user${rand(1, 10)}`);
  }

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
    settings,
    fetchUser,
    getRandomUser,
    updateUser,
    calculatePerformancePercentage,
  };
});

export default useUserStore;
