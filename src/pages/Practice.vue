<script setup>
import { computed } from 'vue';
import { useQuestionStore } from '@stores/question';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

import QuestionHeader from '../components/questions/QuestionHeader.vue';
import QuestionForm from '../components/questions/QuestionForm.vue';
import QuestionSlideIn from '../components/questions/SlideIn/SlideIn.vue';
import GenericModal from '../components/GenericModal.vue';
import LevelUp from '../components/LevelUp.vue';
import IconLeft from '~icons/lucide/chevron-left';

const router = useRouter();

const { stats } = storeToRefs(useUserStore());

const store = useQuestionStore();
const { selectedQuestion, showQuestionSlideIn, givenAnswer } = storeToRefs(store);
const { getQuestions } = store;
const content = ref(
  'very long content with a lot of text',
);
const nextQuestion = ref('Continue practicing');
const scoreMessage = ref(false);

getQuestions();

const showMessage = () => {
  if (store.checkAnswer()) {
    scoreMessage.value = true;
    setTimeout(() => {
      scoreMessage.value = false;
      getQuestions();
    }, 3000);
  }
};

const toNextQuestion = () => {
  getQuestions();
  showMessage();
  showQuestionSlideIn.value = false;
  givenAnswer.value = [];
};

const goBack = () => {
  router.go(-1);
};

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <div class="h-44 w-screen relative -mt-40">
    <div v-if="!scoreMessage" class="question relative">
      <div class="header">
        <div class="header-buttons">
          <button type="button" class="go-back-button" @click="goBack">
            <IconLeft />
          </button>
          <section class="percentage">
            <div
              class="text-center text-green-900 text-xs font-light rounded bg-slate-200 relative overflow-hidden grow"
            >
              <div
                :style="{ width: `${Math.round(stats?.percentage)}%` }"
                class="from-white to-secondary bg-gradient-to-r"
              >
                {{ Math.round(stats?.percentage) }}%
              </div>
            </div>
          </section>
        </div>

        <QuestionHeader :question-data="selectedQuestion" />
      </div>

      <QuestionForm :question-data="selectedQuestion" />
      <QuestionSlideIn
        v-if="showQuestionSlideIn"
        :next-question="nextQuestion"
        :content="content"
        @emit-next-question="toNextQuestion()"
      />
    </div>
    <GenericModal :is-open="scoreMessage" :fireworks="true">
      <LevelUp />
    </GenericModal>
  </div>
</template>

<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  display: flex;
  flex-direction: column;
}

.header-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0rem 5rem;
}

.go-back-button {
  background-color: #f3c000;
  color: white;
  border: none;
  padding: 5px;
  height: 2rem;
  width: 2rem;
  border-radius: 100%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.percentage {
  width: 8rem;
}
</style>
