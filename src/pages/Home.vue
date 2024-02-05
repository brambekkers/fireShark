<script setup>
import { storeToRefs } from 'pinia';
import { useQuestionStore } from '@stores/question';

import { ref } from 'vue';
import { rand } from '@vueuse/core';
import TopicButton from '@/components/TopicButton.vue';

const { selectedTopics } = storeToRefs(useQuestionStore());
const topics = ref([]);

const fetchUsers = async () => {
  const userId = 'id1';
  const res = await fetch(`http://192.168.0.192:3000/users/${userId}`);
  const user = await res.json();
  topics.value = user.topics || [];
  console.log(topics.value);
};
fetchUsers();
</script>

<template>
  <main>
    <!-- Accent on top -->
    <div
      aria-hidden="true"
      style="clip-path: ellipse(130% 248% at 50% -150%)"
      class="bg-secondary h-44 absolute w-screen left-0"
    ></div>
    <div class="max-w-screen-lg mx-auto">
      <section class="h-44 flex justify-between relative z-10 pt-8">
        <div class="mt-4">
          <h1 class="font-extrabold text-2xl text-white">Hi Ernie!</h1>
          <p class="text-xl font-bold text-white">Welcome back.</p>
        </div>
        <div class="rounded-full h-32 w-32 bg-accent shadow-2xl"></div>
      </section>
      <section class="flex justify-center flex-col mt-8">
        <h2 class="text-lg italic text-center">
          Select the topics you want to practice
        </h2>
        <div class="grid grid-cols-3 gap-6 mt-12">
          <TopicButton
            v-for="topic in topics"
            :key="topic.id"
            :title="topic.key"
            :progress="rand(1, 100)"
          />
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
