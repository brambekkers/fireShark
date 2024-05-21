<script setup>
import { setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { supportedTypes, answerModelTrueFalse } from '@/constants/questions';
import { generate32BitInt } from '@/utils/number';

// Composable
import { useModal } from '@/composable/modal';

// Stores
import { useCurriculumStore } from '@/stores/curriculum';
import { useGroupStore } from '@/stores/groups';

// components
import Modal from '@/components/generic/base/Modal.vue';
import Button from '@/components/generic/base/Button.vue';
import ActionButton from '@/components/generic/base/ActionButton.vue';
import Type from '@/components/admin/questions/edit/Type.vue';
import Question from '@/components/admin/questions/edit/Question.vue';
import AnswerText from '@/components/admin/questions/edit/AnswerText.vue';
import Image from '@/components/admin/questions/edit/Image.vue';
import NotSupported from '@/components/admin/questions/edit/NotSupported.vue';
import MultipleAnswer from '@/components/admin/questions/edit/MultipleAnswer.vue';
import TrueFalseAnswer from '@/components/admin/questions/edit/TrueFalseAnswer.vue';

// Icons
import IconClose from '~icons/uil/times';
import IconArrowRight from '~icons/lucide/arrow-big-right';

const props = defineProps({
  question: {
    type: [Object, null],
    required: true,
  },
});
const { isModalOpen, toggleModal } = useModal();
const { selectedGroup, selectedTopic } = storeToRefs(useCurriculumStore());
const { groupsObject } = storeToRefs(useGroupStore());

const editQuestion = ref(null);

const updateQuestion = async (skipClose = false) => {
  if (!editQuestion.value) return;
  const questionRef = useCurriculumStore().getQuestionRef(editQuestion.value.id);
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
        editQuestion.value.random = generate32BitInt();
        editQuestion.value.parentId = selectedTopic.value;
      }
      toggleModal();
    }
  },
);

watch(
  () => editQuestion.value?.type,
  (newType) => {
    if (newType === props.question.type) {
      editQuestion.value.answers = props.question.answers;
      return;
    }
    if (newType === 'singleAnswer') editQuestion.value.answers = [];
    if (newType === 'multipleAnswer') editQuestion.value.answers = [];
    if (newType === 'trueFalse') editQuestion.value.answers = answerModelTrueFalse;
  },
);
</script>

<template>
  <Modal v-if="selectedGroup && selectedTopic && editQuestion" :is-open="isModalOpen" width="4xl">
    <!-- Modal header -->
    <div class="px-5 pt-5">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold">
          {{ question.id ? $t('admin.questions.editQuestion') : $t('admin.questions.createQuestion') }}
        </h3>
        <ActionButton @click="toggleModal()">
          <IconClose class="h-6 w-6" />
        </ActionButton>
      </div>
      <div class="flex items-center font-bold text-xs">
        <span class="text-primary border-2 px-2.5 py-0.5 rounded border-app-primary bg-app-primary/15">
          {{ groupsObject[selectedGroup]?.name }}
        </span>
        <IconArrowRight class="w-6 h-6 text-app-primary mx-2" />
        <span class="text-app-warning border-2 px-2.5 py-0.5 rounded border-app-warning bg-app-warning/15">
          {{ groupsObject[selectedGroup]?.topics.find(({ id }) => id === selectedTopic)?.name }}
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
        <AnswerText v-model:answerText="editQuestion.answerText" />
        <MultipleAnswer v-if="editQuestion.type === 'singleAnswer'" v-model:answers="editQuestion.answers" :max-correct="1" />
        <MultipleAnswer v-if="editQuestion.type === 'multipleAnswer'" v-model:answers="editQuestion.answers" :max-correct="Infinity" />
        <TrueFalseAnswer v-if="editQuestion.type === 'trueFalse'" v-model:answers="editQuestion.answers" />
      </template>
      <NotSupported v-else />
    </div>

    <!-- Modal footer -->
    <div class="flex items-center justify-end px-5 pb-5 pt-2">
      <Button :title="question.id ? $t('general.change') : $t('general.add')" size="md" @click="updateQuestion(false)" />
    </div>
  </Modal>
</template>
