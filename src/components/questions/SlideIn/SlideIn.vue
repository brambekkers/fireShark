<template>
  <div class="absolute inset-x-0 flex flex-col items-center bottom-0 margin-negative">

    <div class="btn-container">
      <div @click="handleShow(false)" v-if="show" class="bg-yellow-200 rounded-full p-2 cursor-pointer">
        <div class="border-2 border-black rounded-full p-1">
          <ArrowDownward />
        </div>
      </div>
      <div @click="handleShow(true)" v-if="!show" class="bg-yellow-200 rounded-full p-2 cursor-pointer">
        <div class="border-2 border-black rounded-full p-1">
          <ArrowUpward />
        </div>
      </div>
    </div>
    <transition name="slide">
      <div class="box p-10 bg-[#005e5d] text-white rounded-md">
        <h3 class="text-2xl font-bold">{{ title }}</h3>
        <p class="text-sm mt-2">{{ content }}</p>
      </div>
    </transition>

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
.box {
  min-width: 500px;
}

.btn-container {
  margin-bottom: -24px;
  z-index: 200;
}

.margin-negative {
  margin-bottom: -12px;
}

/* .slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,

.slide-leave-to {
  translate: translateY(100%);
} */
</style>