<template>
  <div
    class="fixed inset-x-0 flex flex-col items-center bottom-0 slide-in-container"
    :class="show ? 'show' : ''"
  >
    <div class="btn-container">
      <div
        v-if="show"
        class="bg-[#F3C000] rounded-full p-2 cursor-pointer"
        @click="handleShow(false)"
        @keydown="handleShow(false)"
      >
        <div class="border-2 border-black rounded-full p-1">
          <ArrowDownward class="icon-size" />
        </div>
      </div>
      <div
        v-if="!show"
        class="bg-[#F3C000] rounded-full p-2 cursor-pointer"
        @click="handleShow(true)"
        @keydown="handleShow(true)"
      >
        <div class="border-2 border-black rounded-full p-1">
          <ArrowUpward class="icon-size" />
        </div>
      </div>
    </div>
    <div class="box p-10 bg-[#005e5d] text-white rounded-md">
      <h3 class="text-xl font-bold title">
        {{ title }}
      </h3>
      <p class="text-sm mt-2 content">
        {{ content }}
      </p>
      <button
        type="button"
        class="font-medium text-black rounded-[2rem] bg-[#F3C000] hover:bg-[#F3C000] mt-8 text-sm px-4 py-2 mx-auto block"
        @click="emitNextQuestion"
      >
        {{ nextQuestion }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ArrowUpward from '~icons/material-symbols/arrow-upward';
import ArrowDownward from '~icons/material-symbols/arrow-downward';

const show = ref(false);

const handleShow = (bool) => {
  show.value = bool;
};

defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  nextQuestion: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['emit-next-question']);

const emitNextQuestion = () => {
  handleShow(false);
  emit('emit-next-question');
};
</script>

<style scoped lang="scss">
.slide-in-container {
  transform: translateY(calc(calc(100% - 64px)));
  transition:
    bottom 0.35s ease,
    opacity 0.35s ease,
    transform 0.35s ease;
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
  min-width: 570px;
}

.btn-container {
  margin-bottom: -24px;
  z-index: 30;
  position: relative;
}

.content,
.title {
  max-width: 400px;
  margin: 0 auto;
}
</style>
