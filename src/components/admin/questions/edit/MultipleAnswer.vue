<script setup>
import { useDragAndDrop } from '@formkit/drag-and-drop/vue';
import { animations } from '@formkit/drag-and-drop';
import { nanoid } from 'nanoid';

// Icons
import IconPlus from '~icons/lucide/plus';
import IconList from '~icons/lucide/clipboard-list';
import IconDrag from '~icons/mdi/drag-vertical';
import IconTrash from '~icons/lucide/trash';

// Components
import TextField from '@/components/generic/inputs/TextField.vue';
import CheckCircle from '@/components/generic/ui/CheckCircle.vue';
import ActionButton from '@/components/generic/base/ActionButton.vue';

const answersRaw = defineModel('answers', {
  type: Array,
  required: true,
});

const props = defineProps({
  maxCorrect: {
    type: Number,
    required: false,
    default: Infinity,
  },
});

const [parent, answers] = useDragAndDrop(answersRaw.value, {
  dragHandle: '.drag-handle',
  plugins: [animations()],
});

watch(answers, (arr) => (answersRaw.value = arr));

const addAnswer = () => {
  if (answers.value.length === 4) return;
  answers.value.push({
    text: '',
    value: false,
    id: `answer_${nanoid(15)}`,
  });
};
</script>

<template>
  <div class="bg-app-body-bg rounded-lg border p-2 flex flex-col gap-2">
    <div class="flex items-center justify-between gap-10 px-2">
      <div class="flex gap-2 items-center">
        <IconList class="w-5 text-app-primary" />
        <h4>Answers</h4>
      </div>
      <button
        class="flex items-center py-1 ps-3 pe-2 rounded-md hover:bg-black/5 transition-all duration-200 ease-in-out text-nowrap disabled:opacity-40"
        :disabled="answers.length === 4"
        @click="addAnswer"
      >
        Add answer
        <IconPlus class="ms-2 w-6 h-6 text-app-primary" />
      </button>
    </div>
    <ul v-show="answers.length" ref="parent">
      <li
        v-for="(answer, i) in answers"
        :key="answer.id"
        class="bg-white rounded-lg border py-2 pe-3 flex items-center"
      >
        <IconDrag class="w-8 h-8 text-app-primary drag-handle cursor-grab" />
        <TextField
          v-model="answer.text"
          :placeholder="`Answer ${i + 1}`"
          elevation="none"
          size="md"
          class="flex-grow"
        />
        <CheckCircle
          class="ms-3"
          :is-checked="answer.value"
          @click="answer.value = !answer.value"
        />
        <div
          class="border-t sm:border-t-0 sm:border-s border-gray-200 ms-3 me-1 h-8"
        />
        <ActionButton
          class="text-app-button-danger-bg hover:text-app-button-danger-bg-focus"
        >
          <IconTrash class="h-5 w-5" />
        </ActionButton>
      </li>
    </ul>
  </div>
</template>
