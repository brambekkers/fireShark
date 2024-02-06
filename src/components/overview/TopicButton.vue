<script setup>
import { useQuestionStore } from '@stores/question';
import IconCheck from '~icons/lucide/check';

const props = defineProps({
  title: { type: String, required: true },
  progress: { type: Number, required: true },
  allSelected: { type: Boolean, required: true },
});

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
        class="bg-slate-300 absolute z-10 rounded-full p-4 max-h-1 max-w-1 flex justify-center transition-all duration-300"
        :class="isChecked ? 'checked !bg-sharp-success' : 'circle'"
      >
        <Transition
          class="transition-all duration-300 transform"
          enter-from-class="scale-0 rotate-45"
          enter-to-class="scale-100 rotate-0"
          leave-active-class="duration-150"
          leave-to-class="scale-0"
          appear
        >
          <span v-if="isChecked" class="icon">
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
      <h3 class="text-xl text-center font-bold text-primary">
        {{ $t(`overview.topics.${title}`) }}
      </h3>
      <section class="percentage-section flex mt-6 align-center">
        <div
          class="h-2 mt-1 rounded bg-slate-300 relative grow"
        >
          <div
            :style="{ width: `${progress}%` }"
            class="from-primary to-secondary bg-gradient-to-r h-[10px] -mt-[1px] rounded-l-full rounded-r-full"
          ></div>
        </div>
        <p class="percentage ms-4">
          {{ progress }}%
        </p>
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
