<script setup>
import IconTrash from '~icons/lucide/trash';
import IconSettings from '~icons/lucide/settings';
import ActionButton from '@/components/generic/ActionButton.vue';
import Edit from '@/components/admin/users/Edit.vue';

// Role icons
import IconAdmin from '~icons/mdi/shield-crown-outline';
import IconModerator from '~icons/mdi/shield-key-outline';
import IconEditor from '~icons/mdi/shield-edit-outline';
import IconUser from '~icons/lucide/user';
import Person from '@/assets/img/default/person.svg';

import { useGroupStore } from '@/stores/groups';
const { groupsObject } = storeToRefs(useGroupStore());

defineProps({
  users: {
    type: Array,
    required: true,
  },
});

const currentUser = ref(null);

const editUser = (user) => {
  currentUser.value = user;
};

const profileStyle = (url) => ({
  backgroundImage: `url('${url || Person}')`,
});
</script>

<template>
  <table
    v-if="users.length"
    class="w-full text-left bg-white rounded-xl overflow-hidden"
  >
    <thead class="bg-slate-200">
      <tr>
        <th class="p-2 font-medium text-sm"></th>
        <th class="p-2 font-medium text-sm"></th>
        <th class="p-2 font-medium text-sm">Name</th>
        <th class="p-2 font-medium text-sm">Groups</th>
        <th class="p-2 font-medium text-sm text-center">Role</th>
        <th class="p-2 font-medium text-sm"></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
        class="border-b border-slate-100"
      >
        <td>
          <div class="flex items-center justify-center ms-2">
            <input
              type="checkbox"
              class="appearance-none checked:appearance-auto w-4 h-4 bg-gray-100 border-gray-300 rounded accent-app-primary"
            />
          </div>
        </td>
        <td class="p-3 w-16">
          <div
            class="w-10 h-10 rounded-full bg-app-body-bg border overflow-hidden flex items-end justify-center bg-cover bg-center"
            :style="profileStyle(user?.settings?.profileImageUrl)"
          />
        </td>
        <td class="p-3 flex flex-col">
          <h4 class="font-semibold">
            {{ user.firstName }} {{ user.lastName }}
          </h4>
          <p class="text-sm">{{ user.email }}</p>
        </td>
        <td class="p-3 align-middle">
          <p
            v-for="(id, i) in user.settings?.position"
            :key="id"
            class="text-sm"
          >
            {{ groupsObject[id]?.name }}
            <span
              v-if="i !== user.settings?.position.length - 1"
              class="-ms-1 me-2"
              >,</span
            >
          </p>
        </td>
        <td class="p-3">
          <div class="flex flex-col items-center justify-center text-sm">
            <IconAdmin
              v-if="user.role === 'admin'"
              class="h-6 w-6 text-app-danger"
            />
            <IconModerator
              v-if="user.role === 'moderator'"
              class="h-6 w-6 text-app-warning"
            />
            <IconEditor
              v-if="user.role === 'editor'"
              class="h-6 w-6 text-app-primary"
            />
            <IconUser v-if="user.role === 'user'" class="h-6 w-6" />
            <span class="w-fit">{{ user.role || 'user' }}</span>
          </div>
        </td>
        <td class="p-3 w-9">
          <div class="flex gap-1 justify-end pe-3">
            <ActionButton @click="editUser(user)">
              <IconSettings class="h-5 w-5" />
            </ActionButton>
            <ActionButton>
              <IconTrash class="h-5 w-5" />
            </ActionButton>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Edit v-model:current-user="currentUser" />
</template>
