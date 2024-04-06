<script setup>
import Button from '@/components/generic/base/Button.vue';
import TopicButton from '@/components/overview/TopicButton.vue';
import useUserStore from '@/stores/user';
import useQuestionStore from '@/stores/question';

const userStore = useUserStore();
const { selectedTopics } = storeToRefs(useQuestionStore());

const selectAll = () => {
  Object.values(userStore.topics).forEach((topic) => {
    if (!selectedTopics.value.includes(topic.id)) {
      selectedTopics.value.push(topic.id);
    }
  });
};

const clearSelection = () => {
  selectedTopics.value = [];
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
            :topic="topic"
            :key="topic.id"
          />
        </div>
      </section>

      <div class="flex align-center justify-center mt-12">
        <router-link to="/practice">
          <Button
            :disable="selectedTopics.length === 0"
            title="Practice this selection"
          >
          </Button>
        </router-link>
      </div>
      <div class="flex align-center justify-center mt-4">
        <Button
          :title="selectedTopics.length ? 'Clear selection' : 'Select all'"
          type="secondary"
          @click="selectedTopics.length === 0 ? selectAll() : clearSelection()"
        />
      </div>
    </div>
  </main>
</template>
