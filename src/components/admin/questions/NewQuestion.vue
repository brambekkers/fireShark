<script setup>
import { nanoid } from 'nanoid';

// Stores
import { useQuestionsStore } from '@/stores/questions';
import { useGroupStore } from '@/stores/groups';

// components
import Modal from '@/components/generic/Modal.vue';
import Button from '@/components/generic/Button.vue';
import ActionButton from '@/components/generic/ActionButton.vue';
import Select from '@/components/generic/Select.vue';

// Icons
import IconClose from '~icons/uil/times';
import IconArrowRight from '~icons/lucide/arrow-big-right';
import IconTarget from '~icons/lucide/target';
import IconQuestion from '~icons/material-symbols/live-help-outline-rounded';

import TextField from '@/components/generic/TextField.vue';
import TextArea from '@/components/generic/TextArea.vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  toggleModal: {
    type: Function,
    required: true,
  },
});

const { selectedGroup, selectedTopic } = storeToRefs(useQuestionsStore());
const { groupsObject } = storeToRefs(useGroupStore());

const newQuestion = ref({
  parentId: '',
  headerImage: '',
  id: `question${nanoid(15)}`,
  type: 'singleAnswer',
  question: '',
  answers: [],
});

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      newQuestion.value = {
        parentId: selectedTopic,
        headerImage: '',
        id: `question${nanoid(15)}`,
        type: 'singleAnswer',
        question: '',
        answers: [],
      };
    }
  },
);
</script>

<template>
  <Modal v-if="selectedGroup && selectedTopic" :is-open="isOpen" width="4xl">
    <!-- Modal header -->
    <div class="flex items-center justify-between p-5">
      <h3 class="text-xl font-semibold">Add question</h3>
      <ActionButton @click="toggleModal()">
        <IconClose class="h-6 w-6" />
      </ActionButton>
    </div>
    <!-- Modal body -->
    <div class="px-5 py-2 space-y-4 w-full -mt-8">
      <div class="flex items-center font-bold">
        <span>{{ groupsObject[selectedGroup]?.name }}</span>
        <IconArrowRight class="w-6 h-6 text-app-primary mx-2" />
        <span>
          {{
            groupsObject[selectedGroup]?.topics.find(
              ({ id }) => id === selectedTopic,
            )?.name
          }}
        </span>
      </div>

      <div class="flex items-center justify-between gap-10 w-full">
        <div class="flex gap-2 items-center">
          <IconTarget class="w-5 text-app-primary" />
          <h4>Question type</h4>
        </div>
        <Select v-model="role" size="md" elevation="none" class="w-1/2">
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </Select>
      </div>
      <hr class="mb-2" />
      <div class="flex flex-col gap-2 w-full">
        <div class="flex gap-2 items-center">
          <IconQuestion class="w-5 text-app-primary" />
          <h4>The question:</h4>
        </div>
        <TextArea v-model="newQuestion.question" size="md" elevation="none" />
      </div>
    </div>

    <!-- Modal footer -->
    <div class="flex items-center justify-end px-5 pb-5 pt-2">
      <Button title="Import" size="md" />
    </div>
  </Modal>
</template>
