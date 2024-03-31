<script setup>
import useUserStore from '@/stores/user';
import { useQuestionStore } from '@stores/question';
import ProgressBar from '@/components/generic/ProgressBar.vue';
import IconCheck from '~icons/lucide/check';

const props = defineProps({
  title: { type: String, required: true },
  progress: { type: Number, required: true },
  allSelected: { type: Boolean, required: true },
});

const { topics } = storeToRefs(useUserStore());
const { selectedTopics } = storeToRefs(useQuestionStore());
const isChecked = ref(selectedTopics.value.includes(props.title));
const questionStore = computed(() => useQuestionStore());

if (props.allSelected) {
  isChecked.value = true;
}

watch(
  () => props.allSelected,
  (newVal) => {
    isChecked.value = newVal;
  },
);

const toggleSelection = () => {
  isChecked.value = !isChecked.value;
  questionStore.value.updateSelectedTopics(isChecked.value, props.title);
};
</script>

<template>
  <div
    class="cursor-pointer transition-all hover:scale-[1.01]"
    @click="toggleSelection"
    @keyup.enter="toggleSelection"
  >
    <!-- header -->
    <div class="flex relative">
      <!-- check circle -->
      <div
        class="absolute z-10 rounded-full p-4 max-h-1 max-w-1 flex justify-center transition-all duration-300 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-app-body-bg"
        :class="isChecked ? '!bg-app-success' : 'bg-slate-300'"
      >
        <Transition
          class="transition-all duration-300 transform"
          enter-from-class="scale-0 rotate-45"
          enter-to-class="scale-100 rotate-0"
          leave-active-class="duration-150"
          leave-to-class="scale-0"
          appear
        >
          <span v-if="isChecked" class="text-white self-center">
            <IconCheck />
          </span>
        </Transition>
      </div>
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
        {{ $t(`overview.topics.${title}`) }}
      </h3>
      <ProgressBar :progress="topics?.[title]?.score || 0" />
    </div>
  </div>
</template>
