<script setup>
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { supportedTypes } from '@/constants/questions';

// Composable
import { useModal } from '@/composable/modal';
const db = getFirestore();

// Stores
import { useQuestionsStore } from '@/stores/questions';
import { useGroupStore } from '@/stores/groups';

// components
import Modal from '@/components/generic/base/Modal.vue';
import Button from '@/components/generic/base/Button.vue';
import ActionButton from '@/components/generic/base/ActionButton.vue';
import Type from '@/components/admin/questions/edit/Type.vue';
import Question from '@/components/admin/questions/edit/Question.vue';
import Image from '@/components/admin/questions/edit/Image.vue';
import NotSupported from '@/components/admin/questions/edit/NotSupported.vue';

// Icons
import IconClose from '~icons/uil/times';
import IconArrowRight from '~icons/lucide/arrow-big-right';
import MultipleAnswer from './edit/MultipleAnswer.vue';

const props = defineProps({
  question: {
    type: [Object, null],
    required: true,
  },
});
const { isModalOpen, toggleModal } = useModal();
const { selectedGroup, selectedTopic } = storeToRefs(useQuestionsStore());
const { groupsObject } = storeToRefs(useGroupStore());

const editQuestion = ref(null);

const updateQuestion = async (skipClose = false) => {
  if (!editQuestion.value) return;
  const questionRef = useQuestionsStore().getQuestionRef(editQuestion.value.id);
  await setDoc(questionRef, editQuestion.value);
  if (skipClose) return;
  toggleModal();
};

watch(isModalOpen, (open) => {
  if (!open) {
    editQuestion.value = null;
  }
});

watch(
  () => props.question,
  (newQuestion) => {
    if (newQuestion) {
      editQuestion.value = { ...newQuestion };
      if (!newQuestion.id) {
        editQuestion.value.id = `question_${nanoid(15)}`;
        editQuestion.value.parentId = selectedTopic.value;
      }
      toggleModal();
    }
  },
);
</script>

<template>
  <Modal
    v-if="selectedGroup && selectedTopic && editQuestion"
    :is-open="isModalOpen"
    width="4xl"
  >
    <!-- Modal header -->
    <div class="px-5 pt-5">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold">Add question</h3>
        <ActionButton @click="toggleModal()">
          <IconClose class="h-6 w-6" />
        </ActionButton>
      </div>
      <div class="flex items-center font-bold text-xs">
        <span
          class="text-primary border-2 px-2.5 py-0.5 rounded border-app-primary bg-app-primary/15"
        >
          {{ groupsObject[selectedGroup]?.name }}
        </span>
        <IconArrowRight class="w-6 h-6 text-app-primary mx-2" />
        <span
          class="text-app-warning border-2 px-2.5 py-0.5 rounded border-app-warning bg-app-warning/15"
        >
          {{
            groupsObject[selectedGroup]?.topics.find(
              ({ id }) => id === selectedTopic,
            )?.name
          }}
        </span>
      </div>
    </div>
    <!-- Modal body -->
    <div class="px-5 py-2 space-y-4 w-full">
      <Type v-model:type="editQuestion.type" />
      <hr class="mb-2" />
      <template v-if="supportedTypes.includes(editQuestion.type)">
        <Image
          v-model:imageUrl="editQuestion.headerImage"
          v-model:imageRef="editQuestion.imageRef"
          :image-location="`groups/topics/${editQuestion.id}/questions/${editQuestion.id}`"
          @update="updateQuestion(true)"
        />
        <Question v-model:question="editQuestion.question" />
        <MultipleAnswer
          v-model:answers="editQuestion.answers"
          :max-correct="1"
        />
      </template>
      <NotSupported v-else />
    </div>

    <!-- Modal footer -->
    <div class="flex items-center justify-end px-5 pb-5 pt-2">
      <Button title="Import" size="md" @click="updateQuestion(false)" />
    </div>
  </Modal>
</template>
