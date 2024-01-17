<script setup>
import { capitalize, ref } from "vue";
import Navbar from "../components/Navbar.vue"

const topics = ref()
const fetchUsers = async () =>
  await fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((json) => (topics.value = json.id1.topics))
fetchUsers()
</script>

<template>
  <Navbar />
  <main class="from-primary to-secondary bg-gradient-to-b h-svh mt-14 pt-20">
    <h1 class="text-2xl flex justify-center mb-8">Practice your selection:</h1>
    <section class="flex items-center justify-center">
      <ul class="grid grid-cols-3 gap-12">
        <li
          v-for="topic in topics"
          :key="topic.id"
          class="bg-white rounded-lg shadow-xl px-24 py-12 cursor-pointer transition-all duration-300 hover:bg-secondary group hover:scale-[0.98]"
        >
          <h2
            class="text-secondary font-extrabold text-center group-hover:text-white transition-all"
          >
            {{ capitalize(topic.key)  }}
          </h2>
        </li>
      </ul>
    </section>
  </main>
</template>
