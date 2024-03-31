<script setup>
import { rand } from '@vueuse/core';
import Button from '@/components/generic/Button.vue';
import TopicButton from '@/components/overview/TopicButton.vue';
import useUserStore from '@/stores/user';
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
            :title="topic.id || ''"
            :progress="rand(1, 100)"
            :all-selected="allSelected"
          />
        </div>
      </section>

      <div class="flex align-center justify-center mt-12">
        <router-link to="/practice">
          <Button
            :class="{ 'disabled-button': isButtonDisabled }"
            :disable="isButtonDisabled"
            title="Practice this selection"
          >
          </Button>
        </router-link>
      </div>
      <div class="flex align-center justify-center mt-4">
        <Button
          :title="selectAllButton"
          type="secondary"
          @click="
            selectAllButton === 'Select all' ? selectAll() : clearSelection()
          "
        />
      </div>
    </div>
  </main>
</template>
