<script setup>
import { useCurriculumStore } from '@/stores/curriculum';

// Icons
import IconError from '~icons/bx/error-alt';
import IconErrorGroup from '~icons/material-symbols/ad-group-off-outline-rounded';
import IconTrash from '~icons/lucide/trash';
import IconSettings from '~icons/lucide/settings';

// Composable
import { useModal } from '@/composable/modal';

// Components
import ActionButton from '@/components/generic/base/ActionButton.vue';
import Confirm from '@/components/generic/modals/Confirm.vue';
import Checkbox from '@/components/generic/inputs/Checkbox.vue';
import Type from '@/components/admin/questions/Type.vue';

const emit = defineEmits(['deleteQuestion', 'editQuestion']);
const { isModalOpen: isConfirmOpen, toggleModal: toggleConfirm } = useModal();
const { questions, selectedGroup, selectedTopic, selectedQuestions } =
  storeToRefs(useCurriculumStore());

const deleteId = ref('');
const triggerConfirm = (id) => {
  deleteId.value = id;
  toggleConfirm();
};

const random = () => Math.floor(Math.random() * 100);

const toggleSelect = (id) => {
  const index = selectedQuestions.value.indexOf(id);
  if (index === -1) selectedQuestions.value.push(id);
  else selectedQuestions.value.splice(index, 1);
};

const toggleAllSelect = () => {
  if (selectedQuestions.value.length) {
    selectedQuestions.value = [];
  } else {
    questions.value.forEach((q) => {
      selectedQuestions.value.push(q.id);
    });
  }
};
</script>

<template>
  <table
    v-if="selectedGroup && selectedTopic && questions.length"
    class="w-full text-left bg-white rounded-xl overflow-hidden"
  >
    <thead class="bg-slate-200">
      <tr>
        <th class="p-3 font-medium text-sm text-center">
          <div class="flex items-center justify-center">
            <Checkbox
              :checked="selectedQuestions.length"
              @click="toggleAllSelect()"
            />
          </div>
        </th>
        <th class="p-2 font-medium text-sm text-center">#</th>
        <th class="p-2 font-medium text-sm">Question</th>
        <th class="p-2 font-medium text-sm">Number</th>
        <th class="font-medium text-sm">Type</th>
        <th class="p-2 font-medium text-sm">Avg. score</th>
        <th class="p-2 font-medium text-sm"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(question, i) of questions"
        :key="question.id"
        class="border-b border-slate-200"
      >
        <td>
          <div class="flex items-center justify-center">
            <Checkbox
              :checked="selectedQuestions.includes(question.id)"
              @click="toggleSelect(question.id)"
            />
          </div>
        </td>
        <td class="text-center py-4">{{ i + 1 }}</td>
        <td class="font-bold truncate max-w-96 text-sm">
          {{ question.question }}
        </td>
        <td>
          <span
            class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-1 rounded"
          >
            {{ question.random }}
          </span>
        </td>

        <td>
          <Type :type="question.type" />
        </td>
        <td class="py-2">
          <div v-if="question.data" class="flex gap-2 items-center">
            <div class="relative w-12 h-12">
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <!-- Background circle -->
                <circle
                  class="text-app-button-danger-bg stroke-current"
                  stroke-width="12"
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  :stroke-dashoffset="`calc(400 - (185 * 100 / 100)`"
                />
                <!-- Progress circle -->
                <circle
                  class="text-app-primary progress-ring__circle stroke-current"
                  stroke-width="12"
                  stroke-linecap="round"
                  cx="50"
                  cy="50"
                  r="30"
                  fill="transparent"
                  :stroke-dashoffset="`calc(400 - (185 * ${question.data?.percentageCorrect || 0} / 100)`"
                />
              </svg>
            </div>
            <span class="text-sm">
              {{ Math.round(question.data?.percentageCorrect || 0) }}%
            </span>
          </div>
          <span v-else class="text-sm font-medium">No data</span>
        </td>
        <td class="p-3 w-9">
          <div class="flex gap-1 justify-end pe-3">
            <ActionButton @click="$emit('editQuestion', question)">
              <IconSettings class="h-5 w-5" />
            </ActionButton>
            <ActionButton @click="triggerConfirm(question.id)">
              <IconTrash class="h-5 w-5" />
            </ActionButton>
          </div>
        </td>
      </tr>
    </tbody>
    <Confirm
      :title="$t('admin.questions.deleteQuestion')"
      :text="$t('admin.questions.deleteQuestionText')"
      :is-open="isConfirmOpen"
      :close-confirm="toggleConfirm"
      @confirm="$emit('deleteQuestion', deleteId)"
    />
  </table>
  <div
    v-else
    class="border-4 border-app-navbar-inactive border-dashed h-96 rounded-xl flex flex-col items-center justify-center space-y-2"
  >
    <IconError
      v-if="selectedGroup && selectedTopic"
      class="h-36 w-36 opacity-20"
    />
    <IconErrorGroup v-else class="h-36 w-36 opacity-20" />

    <span v-if="selectedGroup && selectedTopic" class="font-semibold text-lg"
      >No questions in this group</span
    >
    <span v-else class="font-semibold text-lg"
      >First select a group and topic</span
    >
  </div>
</template>

<style lang="scss">
.progress-ring__circle {
  stroke-dasharray: 400, 400;
  transition: stroke-dashoffset 1.5s ease-in-out;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
@/stores/curriculum
