<script setup>
import { ref } from 'vue';
import IconCheck from '~icons/material-symbols/trophy-outline';

const checkbox = ref(null);

const test = ref(false);

defineProps({
  title: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    class="shadow-xl cursor-pointer transition-all duration-500 hover:shadow-2xl mt-6"
    @click="checkbox.click()"
    @keydown="checkbox.click()"
  >
    <!-- header -->
    <div class="flex relative">
      <!-- background -->
      <!-- <div class="bg-white min-h-6 flex-1"></div>
      <div class="min-h-6 min-w-9"></div>
      <div class="bg-white min-h-6 flex-1"></div> -->

      <!-- check circle -->
      <div
        class=" bg-slate-200 min-h-6 min-w-6 absolute z-10 rounded-full p-4"
        :class="test ? 'checked' : 'circle'"
      >
        <span v-if="test"><IconCheck /></span>
      </div>
    </div>
    <!-- Title -->
    <div
      class="
        bg-white
        px-12
        py-8
        rounded-b-2xl"
    >
      <label for="selected"></label>
      <input
        id="selected"
        ref="checkbox"
        v-model="test"
        class="hidden"
        type="checkbox"
        aria-labelledby="selected"
      >
      <h3 class="text-xl text-center font-bold text-primary">
        {{ title }} {{ test ? 'on' : 'off' }}
      </h3>
      <div class="mt-6 h-2 rounded bg-slate-200 relative overflow-hidden">
        <div
          :style="{ width: `${progress}%` }"
          class="from-primary to-secondary bg-gradient-to-r h-full"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.circle {
    left: 50%;
    transform: translate(-50%, -50%);
    border: 0.4rem solid #f2f9f9 ;
}
.checked {
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #1fc364;
    border: 0.4rem solid #f2f9f9 ;

}
</style>
