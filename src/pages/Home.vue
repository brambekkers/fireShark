<script setup>
import { watchEffect, ref } from 'vue';
import { rand } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Button from '@/components/Button.vue';
import GenericModal from '@/components/GenericModal.vue';
import TopicButton from '@/components/overview/TopicButton.vue';
import OverviewHeader from '@/components/overview/Header.vue';
import useUserStore from '@/stores/userStore';
import useQuestionStore from '@/stores/question';
import CodeEditor from '@/components/CodeEditor.vue';
import axios from 'axios';


const userStore = useUserStore();

const { selectedTopics } = storeToRefs(useQuestionStore());
const selectAllButton = ref('Select all');
const allSelected = ref(false);
const isButtonDisabled = ref(!selectedTopics.value.length);

const selectAll = () => {
  userStore.topics.forEach((topic) => {
    if (!selectedTopics.value.includes(topic.key)) {
      selectedTopics.value.push(topic.key);
    }
  });
  selectAllButton.value = 'Clear selection';
  allSelected.value = true;
  isButtonDisabled.value = false;
};

const clearSelection = () => {
  selectedTopics.value = [];
  selectAllButton.value = 'Select all';
  allSelected.value = false;
  isButtonDisabled.value = true;
};

watchEffect(() => {
  userStore.calculatePerformancePercentage();
});

const isModalOpen = ref(false);

const toggleModal = (isOpen) => {
  isModalOpen.value = isOpen;
};

const monacoEditor = ref(null);

const testCodeEditorQuizExample = {
  id: 'js-code-q1',
  type: 'codingProblem',
  subject: 'JavaScript',
  headerImg: 'src/images/background/code_problem.jpg',
  functionName: 'isPrime',
  question: 'Correct the function to correctly identify if a given number is prime. A prime number is only divisible by 1 and itself.',
  starterCode: 'function isPrime(number) {\n // Your code here to determine if number is a prime number \n // Remember to return true if the number is prime, false otherwise \n}\nmodule.exports = isPrime;',
  testCases: [
    { input: 2, expected: true },
    { input: 3, expected: true },
    { input: 4, expected: false },
    { input: 5, expected: true },
    { input: 8, expected: false },
  ],
}         

const runCode = async () => {
  const code = monacoEditor.value.getEditorContent(); 
  const testCases = testCodeEditorQuizExample.testCases;
  const functionName = testCodeEditorQuizExample.functionName;
  try {
    const response = await axios.post('http://localhost:3001/execute-code', { code, testCases, functionName }, {
      // Include credentials if your server expects them
      withCredentials: false,
      // Optionally, set custom headers if needed
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        // 'Custom-Header': 'value', // Example of a custom header
      },
    });
    const { allTestsPassed, results } = response.data;

    if (allTestsPassed) {
      alert('All tests passed!');
    } else {
      alert('Some tests failed. Check the console for details.');
      console.log(results); // Display detailed test results
    }
  } catch (error) {
    console.error('Error executing code:', error);
    alert('Failed to execute code.');
  }
};
</script>

<template>
  <main>
    <!-- Accent on top -->
    <OverviewHeader />

    <div class="max-w-screen-lg mx-auto">
      <section class="flex justify-center flex-col mt-8">
        <h2 class="text-lg italic text-center">
          Select the topics you want to practice
        </h2>
        <div class="grid grid-cols-3 gap-x-6 gap-y-10 mt-12">
          <TopicButton
            v-for="topic in userStore.topics"
            :key="topic.id"
            :title="topic.key"
            :progress="rand(1, 100)"
            :all-selected="allSelected"
          />
        </div>
      </section>

      <div class="flex align-center justify-center mt-12">
        <router-link to="/practice">
          <Button
            :class="{ 'disabled-button': disabled }"
            :disable="isButtonDisabled"
            title="Practice this selection"
            class="practice-button text-black bg-yellow-400 hover:bg-yellow-500 rounded-full text-sm px-5 py-5 disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          >
          </Button>
        </router-link>
      </div>
      <CodeEditor 
        ref="monacoEditor"
        :initialCode="testCodeEditorQuizExample.starterCode"
        language="javascript"
        theme="vs-dark"
      />
      <button @click="runCode">Test Code</button>
      <div class="flex align-center justify-center mt-12">
        <Button
          :title="selectAllButton"
          class="text-green bg-transparent border-solid border-4 border-green hover:text-green rounded-full text-sm px-2 py-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          @click="
            selectAllButton === 'Select all' ? selectAll() : clearSelection()
          "
        >
        </Button>
      </div>
    </div>

    <!-- <ConfirmationModal /> -->
    <GenericModal :is-open="isModalOpen" @close-modal="toggleModal(false)" />

    <button id="open-dialog-btn" type="button" @click="toggleModal(true)">
      Show the dialog
    </button>
  </main>
</template>

<style lang="scss" scoped></style>
