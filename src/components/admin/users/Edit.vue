<script setup>
import { getFunctions, httpsCallable } from 'firebase/functions';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

import { useGroupStore } from '@/stores/groups';
// Composable
import { useModal } from '@/composable/modal';

// components
import Modal from '@/components/generic/base/Modal.vue';
import ActionButton from '@/components/generic/base/ActionButton.vue';
import Button from '@/components/generic/base/Button.vue';
import Select from '@/components/generic/inputs/Select.vue';

// Icons
import IconClose from '~icons/uil/times';
import IconRoute from '~icons/lucide/route';
import IconRuler from '~icons/lucide/pencil-ruler';

const user = defineModel('user', {
  type: [Object, null],
  required: true,
});

const db = getFirestore();
const cloudFunctions = getFunctions();
const changeUserRole = httpsCallable(cloudFunctions, 'changeUserRole');

const { isModalOpen, toggleModal } = useModal();
const { groups, groupsObject } = storeToRefs(useGroupStore());
const selectedGroup = ref('');
const role = ref('user');

const updateUser = async () => {
  if (!user.value) return;
  await changeUserRole({ role: role.value, uid: user.value.id });

  const settingsRef = doc(db, `users/${user.value.uid}/data/settings`);
  await setDoc(settingsRef, user.value.settings, { merge: true });
  toggleModal();
};

const removeGroup = (id) => {
  user.value.settings.position = user.value.settings.position.filter(
    (group) => group !== id,
  );
};

watch(selectedGroup, (newGroup) => {
  if (!newGroup) return;
  user.value.settings.position.push(newGroup);
  selectedGroup.value = '';
});

watch(isModalOpen, (newVal) => {
  if (!newVal) user.value = null;
});

watch(user, (newVal) => {
  if (newVal) {
    role.value = newVal.role || 'user';
    toggleModal();
  }
});
</script>

<template>
  <Modal v-if="user" :is-open="isModalOpen" :toggle-modal="toggleModal">
    <!-- Modal header -->
    <div class="flex items-center justify-between p-5">
      <h3 class="text-xl font-semibold">
        Edit: {{ user.firstName }} {{ user.lastName }}
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
        <Select
          v-model="selectedGroup"
          size="md"
          elevation="none"
          class="w-1/2"
        >
          <option value="" hidden>Click to add extra group</option>
          <option v-for="group of groups" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </Select>
      </div>
      <div class="flex gap-1 justify-end -mt-8">
        <template v-for="id in user.settings?.position" :key="id">
          <span
            v-if="groupsObject[id]?.name"
            class="bg-primary/10 text-primary text-xs font-medium me-2 px-2.5 py-0.5 rounded hover:line-through transition-all duration-300 ease-in-out cursor-pointer"
            @click="removeGroup(id)"
          >
            {{ groupsObject[id]?.name }}
          </span>
        </template>
      </div>

      <!-- Roles -->

      <div class="flex items-center justify-between gap-10">
        <div class="flex gap-2 items-center">
          <IconRuler class="w-5 text-app-primary" />
          <h4>Role</h4>
        </div>
        <Select v-model="role" size="md" elevation="none" class="w-1/2">
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </Select>
      </div>
    </div>
    <!-- Modal footer -->
    <div class="flex items-center justify-end p-5">
      <Button title="Change" size="md" @click="updateUser" />
    </div>
  </Modal>
</template>
