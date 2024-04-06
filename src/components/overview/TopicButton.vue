<script setup>
import useUserStore from '@/stores/user';
import { useQuestionStore } from '@stores/question';

// Components
import ProgressBar from '@/components/generic/ProgressBar.vue';
import CheckCircle from '@/components/generic/ui/CheckCircle.vue';
const props = defineProps({
  topic: { type: Object, required: true },
});

const { selectedTopics } = storeToRefs(useQuestionStore());
const isChecked = computed(() =>
  selectedTopics.value.includes(props.topic?.id),
);
const questionStore = computed(() => useQuestionStore());

if (props.allSelected) {
  isChecked.value = true;
}

const toggleSelection = () =>
  questionStore.value.toggleSelectedTopics(props.topic?.id);
</script>

<template>
  <div
    v-if="topic?.name"
    class="cursor-pointer transition-all hover:scale-[1.01]"
    @click="toggleSelection"
    @keyup.enter="toggleSelection"
  >
    <!-- header -->
    <div class="flex relative">
      <!-- check circle -->
      <CheckCircle
        class="absolute z-10 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-app-body-bg"
        :is-checked="isChecked"
      />
    </div>
    <!-- Title -->
    <div
      class="bg-white px-12 py-8 rounded-2xl transition-all duration-500 hover:shadow-xl"
      :class="isChecked ? 'shadow-xl' : 'shadow-lg'"
    >
      <label for="selected"></label>
      <input
        id="selected"
        v-model="isChecked"
        class="hidden"
        type="checkbox"
        aria-labelledby="selected"
      />
      <h3
        class="text-xl text-center font-bold leading-tight flex items-center justify-center text-primary min-h-14"
      >
        {{ topic.name }}
      </h3>
      <ProgressBar :progress="topic.score || 0" />
    </div>
  </div>
</template>
