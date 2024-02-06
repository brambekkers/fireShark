<script setup>
import { rand } from '@vueuse/core';
import Button from '@/components/Button.vue';
import TopicButton from '@/components/overview/TopicButton.vue';
import useUserStore from '@/stores/userStore';
import useQuestionStore from '@/stores/question';

const userStore = useUserStore();
const { selectedTopics } = storeToRefs(useQuestionStore());
const selectAllButton = ref('Select all');
const allSelected = ref(false);
const isButtonDisabled = computed(() => !selectedTopics.value.length);

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
</script>

<template>
  <main>
    <div class="max-w-screen-lg mx-auto">
      <section class="flex justify-center flex-col mt-8">
        <h2 class="text-lg italic text-center">
          {{ $t('overview.selectTopics') }}
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
            class="text-black bg-yellow-400 shadow-lg hover:bg-yellow-500 rounded-full px-5 py-4 h-14 disabled:bg-slate-200 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          >
          </Button>
        </router-link>
      </div>
      <div class="flex align-center justify-center mt-6">
        <Button
          :title="selectAllButton"
          class="text-sharp-button-secondary-text bg-transparent border-solid border-2 border-sharp-button-secondary-border-color hover:text-sharp-button-secondary-text-focus hover:border-sharp-button-secondary-border-color-focus rounded-full px-5 py-2 transition-all h-12"
          @click="
            selectAllButton === 'Select all' ? selectAll() : clearSelection()
          "
        />
      </div>
    </div>
  </main>
</template>
