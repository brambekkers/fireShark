<script setup>
import { watchEffect, ref } from 'vue';
import { rand } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import Button from '@/components/Button.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import TopicButton from '@/components/TopicButton.vue';
import OverviewHeader from '@/components/overview/Header.vue';
import useUserStore from '@/stores/userStore';
import useQuestionStore from '@/stores/question';
import useModalInteractions from '@/composable/useModalInteractions';

const { isModalOpen, toggleModal } = useModalInteractions();

const userStore = useUserStore();
userStore.fetchUser('id1');

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
<<<<<<< Updated upstream

const isModalOpen = ref(false);

const toggleModal = (isOpen) => {
  console.log('isOpen :>> ', isOpen);
  isModalOpen.value = isOpen;
};
=======
>>>>>>> Stashed changes
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
        <div>
          <p class="text-center mt-8">
            Your performance is at
            <span class="text-2xl font-bold text-blue-700">{{ userStore.stats?.percentage }}%</span>
          </p>
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

    <ConfirmationModal :is-open="isModalOpen" @close-modal="toggleModal(false)" />

    <button id="open-dialog-btn" type="button" @click="toggleModal(true)">
      Show the dialog
    </button>
  </main>
</template>

<style lang="scss" scoped></style>
