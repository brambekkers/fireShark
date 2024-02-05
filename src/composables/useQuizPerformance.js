import { ref } from 'vue';

/**
 * A Vue 3 composable function that calculates the performance percentage of quiz answers.
 * This composable provides a reactive way to calculate and update the performance percentage based on quiz interactions.
 * 
 * Future enhancements could include integrating user information and quiz topics for personalized feedback.
 * 
 * @returns {Object} An object containing the `calculatePerformancePercentage` method and reactive `percentage` ref.
 */
export function useQuizPerformance() {
  // Reactive ref to store the performance percentage
  const percentage = ref(0);

  /**
   * Calculates and updates the percentage of correct answers.
   * 
   * @param {number} totalQuestions - The total number of questions in the quiz.
   * @param {number} correctAnswers - The number of correctly answered questions.
   * @param {number} wrongAnswers - The number of incorrectly answered questions.
   * @param {number} unansweredQuestions - The number of questions not answered.
   */
  const calculatePerformancePercentage = (totalQuestions, correctAnswers, wrongAnswers, unansweredQuestions) => {
    // Type checking to ensure all inputs are numbers
    if (typeof totalQuestions !== 'number' || typeof correctAnswers !== 'number' ||
        typeof wrongAnswers !== 'number' || typeof unansweredQuestions !== 'number') {
      console.error('All inputs must be numbers');
      return;
    }

    // Calculate the percentage of correct answers
    const calculatedPercentage = (correctAnswers / totalQuestions) * 100;

    // Update the reactive percentage ref, rounded to one decimal place
    percentage.value = Math.round(calculatedPercentage * 10) / 10;
  };

  // Return the reactive percentage and the function to calculate it
  return { percentage, calculatePerformancePercentage };
}

