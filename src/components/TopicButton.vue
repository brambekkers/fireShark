<script setup>
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useQuestionStore } from '@stores/question';
import IconCheck from '~icons/lucide/check';

const props = defineProps({
  title: { type: String, required: true },
  progress: { type: Number, required: true },
});

const { selectedTopics } = storeToRefs(useQuestionStore());
const checkbox = ref(null);
const isChecked = ref(selectedTopics.value.includes(props.title));

watch(isChecked, (check) => {
  if (check) selectedTopics.value.push(props.title);
  else {
    const index = selectedTopics.value.indexOf(props.title);
    selectedTopics.value.splice(index, 1);
  }
});
</script>

<template>
  <div
    class="shadow-xl cursor-pointer transition-all duration-500 hover:shadow-2xl"
    @click="checkbox.click()"
    @keyup.enter="checkbox.click()"
  >
    <!-- header -->
    <div class="flex relative">
      <!-- check circle -->
      <div
        class="bg-slate-200 absolute z-10 rounded-full p-4 max-h-1 max-w-1 flex justify-center"
        :class="isChecked ? 'checked' : 'circle'"
      >
        <span v-if="isChecked" class="icon">
          <IconCheck />
        </span>
      </div>
    </div>
    <!-- Title -->
    <div class="bg-white px-12 py-8 rounded-b-2xl">
      <label for="selected"></label>
      <input
        id="selected"
        ref="checkbox"
        v-model="isChecked"
        class="hidden"
        type="checkbox"
        aria-labelledby="selected"
      />
      <h3 class="text-xl text-center font-bold text-primary">
        {{ title }}
      </h3>
      <section class="percentage-section">
        <div class="mt-6 h-2 rounded bg-slate-200 relative overflow-hidden">
          <div
            :style="{ width: `${progress}%` }"
            class="from-primary to-secondary bg-gradient-to-r h-full"
          ></div>
        </div>
        <p class="percentage">{{ progress }}%</p>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.circle {
  left: 50%;
  transform: translate(-50%, -50%);
  border: 0.4rem solid #f2f9f9;
}

.checked {
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1fc364;
  border: 0.4rem solid #f2f9f9;
}
.icon {
  color: #ffffff;
  font-size: 1rem;
  align-self: center;
}
.percentage {
  color: #009286;
  font-weight: 700;
  line-height: 1.2;
}
</style>
