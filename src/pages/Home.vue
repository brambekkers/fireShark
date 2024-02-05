<script setup>
import { watchEffect } from 'vue';
import { rand } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import TopicButton from '../components/TopicButton.vue';
import OverviewHeader from '../components/overview/Header.vue';
import useUserStore from '@/stores/userStore';
import useQuestionStore from '@/stores/question';

const userStore = useUserStore();
userStore.fetchUser('id1');

const { selectedTopics } = storeToRefs(useQuestionStore());

watchEffect(() => {
  userStore.calculatePerformancePercentage();
});
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
          />
        </div>
        <div>
          <p class="text-center mt-8">
            Your performance is at
            <span class="text-2xl font-bold text-blue-700"
              >{{ userStore.stats?.percentage }}%</span
            >
          </p>
        </div>
      </section>

      <div class="flex align-center justify-center mt-12">
        <router-link to="/practice">
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            :disable="!selectedTopics.length"
          >
            start
          </button>
        </router-link>
      </div>
    </div>
  </main>
</template>
