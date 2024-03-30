<script setup>
import { getFunctions, httpsCallable } from 'firebase/functions';

import Modal from '@/components/generic/Modal.vue';
import { useModal } from '@/composable/modal';
import ActionButton from '@/components/generic/ActionButton.vue';
import Button from '@/components/generic/Button.vue';

// Icons
import IconClose from '~icons/uil/times';
import IconRoute from '~icons/lucide/route';
import IconRuler from '~icons/lucide/pencil-ruler';

const cloudFunctions = getFunctions();
const changeUserRole = httpsCallable(cloudFunctions, 'changeUserRole');

const { isModalOpen, toggleModal } = useModal();
const role = ref('user');
const groups = ref([]);

const currentUser = defineModel('currentUser', {
  type: [Object, null],
  required: true,
});

const updateUser = async () => {
  if (!currentUser.value) return;
  await changeUserRole({ role: role.value, uid: currentUser.value.id });
  toggleModal();
};

watch(isModalOpen, (newVal) => {
  if (!newVal) currentUser.value = null;
});

watch(currentUser, (newVal) => {
  if (newVal) {
    toggleModal();
  }
});
</script>

<template>
  <Modal
    v-if="currentUser"
    :is-open="isModalOpen"
    :toggle-modal="toggleModal"
    :current-user="currentUser"
  >
    <!-- Modal header -->
    <div class="flex items-center justify-between p-5">
      <h3 class="text-xl font-semibold">
        Edit: {{ currentUser.firstName }} {{ currentUser.lastName }}
      </h3>
      <ActionButton @click="toggleModal()">
        <IconClose class="h-6 w-6" />
      </ActionButton>
    </div>
    <!-- Modal body -->
    <div class="px-5 py-2 space-y-4 w-full">
      <!-- Groups -->
      <div
        class="bg-primary/10 border border-primary px-4 py-3 rounded relative text-sm"
        role="alert"
      >
        <strong class="font-bold">Group info: </strong>
        <span>
          A user can belong to multiple groups. Each group comprises specific
          topics along with associated questions.</span
        >
      </div>
      <div class="flex items-center justify-between gap-10">
        <div class="flex gap-2 items-center">
          <IconRoute class="w-5 text-app-primary" />
          <h4>Groups</h4>
        </div>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-app-primary w-52 p-4"
        >
          <option selected>Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>

      <!-- Roles -->

      <div class="flex items-center justify-between gap-10">
        <div class="flex gap-2 items-center">
          <IconRuler class="w-5 text-app-primary" />
          <h4>Role</h4>
        </div>
        <select
          v-model="role"
          class="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:border-app-primary active:border-app-primary w-52 p-4"
        >
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
    <!-- Modal footer -->
    <div class="flex items-center justify-end p-5">
      <Button title="Change" size="md" @click="updateUser" />
    </div>
  </Modal>
</template>

<style lang="scss" scoped></style>
