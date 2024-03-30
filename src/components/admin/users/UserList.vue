<script setup>
import IconTrash from '~icons/lucide/trash';
import IconSettings from '~icons/lucide/settings';
import ActionButton from '@/components/generic/ActionButton.vue';
import Edit from '@/components/admin/users/Edit.vue';

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
</script>

<template>
  <table
    v-if="users.length"
    class="w-full text-left bg-white rounded-xl overflow-hidden"
  >
    <thead class="bg-slate-200">
      <tr>
        <th class="p-2 font-medium text-sm"></th>
        <th class="p-2 font-medium text-sm">Name</th>
        <th class="p-2 font-medium text-sm">Groups</th>
        <th class="p-2 font-medium text-sm">Role</th>
        <th class="p-2 font-medium text-sm"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td class="p-3 w-16">
          <img
            class="w-10 h-10 rounded-full"
            :src="user?.settings?.profileImageUrl"
            alt="Rounded avatar"
          />
        </td>
        <td class="p-3 flex flex-col">
          <h4 class="font-semibold">
            {{ user.firstName }} {{ user.lastName }}
          </h4>
          <p class="text-sm">{{ user.email }}</p>
        </td>
        <td class="p-3">{{ user.role || 'user' }}</td>
        <td class="p-3">{{ user.role || 'user' }}</td>
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
  <Edit :current-user="currentUser" />
</template>

<style lang="scss" scoped></style>
