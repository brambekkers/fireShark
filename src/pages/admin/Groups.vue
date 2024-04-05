<script setup>
import Actions from '@/components/admin/groups/Actions.vue';
import GroupCard from '@/components/admin/groups/Card.vue';
import Edit from '@/components/admin/groups/Edit.vue';
import { useGroupStore } from '@/stores/groups';

const { groups } = storeToRefs(useGroupStore());

const selectedGroup = ref(null);
const addGroup = () => {
  selectedGroup.value = {
    id: null,
    name: '',
    description: '',
    imageUrl: null,
    imageRef: null,
    topics: [],
    userAmount: 0,
  };
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-semibold mb-4">{{ $t('admin.groups.title') }}</h1>
    <Actions @add-group="addGroup" />

    <div class="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 gap-4">
      <GroupCard
        v-for="group of groups"
        :key="group.id"
        :group="group"
        @click="selectedGroup = { ...group }"
      />
    </div>
    <Edit :group="selectedGroup" />
  </div>
</template>
