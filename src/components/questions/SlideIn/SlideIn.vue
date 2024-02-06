<template>
  <div class="fixed inset-x-0 flex flex-col items-center bottom-0 slide-in-container" :class="show ? 'show' : ''">

    <div class="btn-container">
      <div @click="handleShow(false)" v-if="show" class="bg-[#F3C000] rounded-full p-2 cursor-pointer">
        <div class="border-2 border-black rounded-full p-1">
          <ArrowDownward class="icon-size" />
        </div>
      </div>
      <div @click="handleShow(true)" v-if="!show" class="bg-[#F3C000] rounded-full p-2 cursor-pointer">
        <div class="border-2 border-black rounded-full p-1">
          <ArrowUpward class="icon-size" />
        </div>
      </div>
    </div>
    <div class="box p-10 bg-[#005e5d] text-white rounded-md">
      <h3 class="text-xl font-bold title">{{ title }}</h3>
      <p class="text-sm mt-2 content">{{ content }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import ArrowUpward from '~icons/material-symbols/arrow-upward';
import ArrowDownward from '~icons/material-symbols/arrow-downward';

const show = ref(false);

const handleShow = (bool) => {
  show.value = bool;
}

defineProps({
  title: String,
  content: String
})

</script>

<style scoped lang="scss">
.slide-in-container {
  transform: translateY(calc(calc(100% - 64px)));
  transition: bottom 0.35s ease, opacity 0.35s ease, transform 0.35s ease;
  will-change: opacity, transform;
}

.slide-in-container.show {
  transform: none;
}

.icon-size {
  font-size: 0.75rem;
  font-weight: bold;
}

.box {
  min-width: 500px;
}

.btn-container {
  margin-bottom: -24px;
  z-index: 200;
}

.content,
.title {
  max-width: 400px;
  margin: 0 auto;
}
</style>