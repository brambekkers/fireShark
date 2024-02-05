<script setup>
import { ref } from "vue"
import TopicButton from "../components/TopicButton.vue"
import { rand } from "@vueuse/core";
const world = ref("world")

const topics = ref()
const fetchUsers = async () =>
  await fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((json) => (topics.value = json.id1.topics))
fetchUsers()
</script>

<template>
  <main class="mt-12">
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
    </div>
  </main>

  <!-- <div class="bg-red-500 p-12">
    <h1>Hello {{ world }}</h1>
  </div> -->
</template>
