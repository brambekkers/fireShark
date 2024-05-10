<script setup>
// Stores
import { useCurriculumStore } from '@/stores/curriculum';

// Icons
import IconSearch from '~icons/lucide/search';
import IconSettings from '~icons/lucide/settings';
import IconTrash from '~icons/lucide/trash';
import IconInfo from '~icons/lucide/info';
import IconEllipsis from '~icons/lucide/ellipsis-vertical';

// Composable
import { useModal } from '@/composable/modal';

// Components
import BulkImport from '@/components/admin/questions/BulkImport.vue';
import Confirm from '@/components/generic/modals/Confirm.vue';
import Button from '@/components/generic/base/Button.vue';
import ActionButton from '@/components/generic/base/ActionButton.vue';

import { onClickOutside } from '@vueuse/core';

const dropdown = ref(null);
onClickOutside(dropdown, () => (showDropdown.value = false));

const showDropdown = ref(false);
const { isModalOpen, toggleModal } = useModal();
const { isModalOpen: isConfirmOpen, toggleModal: toggleConfirm } = useModal();

const { selectedGroup, selectedTopic, selectedQuestions } =
  storeToRefs(useCurriculumStore());
const searchText = ref('');

const emit = defineEmits(['addQuestion', 'deleteQuestion']);

const deleteQuestions = () => {
  if (!selectedQuestions.value.length) return;
  selectedQuestions.value.forEach((id) => {
    emit('deleteQuestion', id);
  });
  selectedQuestions.value = [];
};
</script>

<template>
  <div class="flex justify-between mb-2">
    <!-- Left side -->
    <div class="flex items-center">
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 pl-4 pointer-events-none flex items-center text-app-primary"
        >
          <IconSearch />
        </div>
        <input
          v-model="searchText"
          class="pl-12 pr-4 border rounded-xl border-gray-300 w-full py-3 text-gray-700 leading-tight bg-white focus:border-app-primary focus:outline-none"
          type="text"
          placeholder="Search..."
        />
      </div>
      <!-- Vertical HR -->
      <div
        class="border-t sm:border-t-0 sm:border-s border-gray-200 ms-3 me-1 h-8"
      ></div>
      <ActionButton :disabled="!selectedQuestions.length">
        <IconSettings class="h-6 w-6" />
      </ActionButton>
      <ActionButton
        :disabled="!selectedQuestions.length"
        @click="toggleConfirm()"
      >
        <IconTrash class="h-6 w-6" />
        <Confirm
          :title="$t('admin.questions.deleteQuestions')"
          :text="
            $t('admin.questions.deleteQuestionsText', {
              amount: selectedQuestions.length,
            })
          "
          :is-open="isConfirmOpen"
          :close-confirm="toggleConfirm"
          @confirm="deleteQuestions()"
        />
      </ActionButton>
      <ActionButton>
        <IconInfo class="h-6 w-6" />
      </ActionButton>
      <ActionButton
        class="relative"
        :class="{
          'bg-app-navbar-inactive/20 ': showDropdown,
        }"
        @click="showDropdown = !showDropdown"
      >
        <IconEllipsis class="h-6 w-6" />
        <div
          ref="dropdown"
          class="absolute z-10 top-10 bg-white rounded-lg shadow"
          :class="{ block: showDropdown, hidden: !showDropdown }"
        >
          <ul class="py-2 font-semibold text-sm text-left">
            <li
              class="ps-4 pe-6 py-2 hover:bg-gray-100 text-nowrap"
              @click="useCurriculumStore().redistributeNumbers()"
            >
              Redistribute numbers
            </li>
            <li class="ps-4 pe-6 py-2 hover:bg-gray-100 text-nowrap">Task 2</li>
            <li class="ps-4 pe-6 py-2 hover:bg-gray-100 text-nowrap">Task 3</li>
            <li class="ps-4 pe-6 py-2 hover:bg-gray-100 text-nowrap">Task 4</li>
          </ul>
        </div>
      </ActionButton>

      <!-- Dropdown menu -->
    </div>
    <!-- right side -->
    <div class="flex gap-2">
      <Button
        title="Add question"
        type="primary"
        size="md"
        :disabled="!selectedGroup || !selectedTopic"
        @click="$emit('addQuestion')"
      />
      <Button
        title="Import"
        type="secondary"
        size="md"
        :disabled="!selectedGroup || !selectedTopic"
        @click="toggleModal()"
      />
    </div>
  </div>

  <BulkImport :is-open="isModalOpen" :toggle-modal="toggleModal" />
</template>
