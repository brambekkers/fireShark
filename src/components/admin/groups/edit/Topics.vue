<script setup>
import { nanoid } from 'nanoid';

// Icons
import IconPlus from '~icons/lucide/plus';
import IconList from '~icons/lucide/clipboard-list';
import IconDrag from '~icons/mdi/drag-vertical';
import IconTrash from '~icons/lucide/trash';

// Components
import TextField from '@/components/generic/TextField.vue';

const topics = defineModel('topics', {
  type: Array,
  required: true,
});

const props = defineProps({
  parentId: {
    type: String,
    required: true,
  },
});

const addTopic = () => {
  topics.value.push({
    name: '',
    parentId: props.parentId,
    id: `topic_${nanoid(15)}`,
  });
};
</script>

<template>
  <div class="bg-app-body-bg rounded-lg border p-2 flex flex-col gap-2">
    <div class="flex items-center justify-between gap-10 px-2">
      <div class="flex gap-2 items-center">
        <IconList class="w-5 text-app-primary" />
        <h4>Topics</h4>
      </div>
      <button
        class="flex items-center py-1 ps-3 pe-2 rounded-md hover:bg-black/5 transition-all duration-200 ease-in-out"
        @click="addTopic"
      >
        Add topic
        <IconPlus class="ms-2 w-6 h-6 text-app-primary" />
      </button>
    </div>
    <div
      v-for="topic in topics"
      :key="topic.id"
      class="bg-white rounded-lg border py-2 pe-3 flex items-center"
    >
      <IconDrag class="w-8 h-8 text-app-primary" />
      <TextField
        v-model="topic.name"
        placeholder="Group name"
        elevation="none"
        size="md"
        class="flex-grow"
      />
      <button
        class="text-app-button-danger-bg ms-2 hover:text-app-button-danger-bg-focus"
      >
        <IconTrash class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>
