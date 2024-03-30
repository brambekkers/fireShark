<script setup>
import { useCollection } from 'vuefire';
import { getFirestore, collection } from 'firebase/firestore';

import Actions from '@/components/admin/users/Actions.vue';
import UserList from '@/components/admin/users/UserList.vue';

const db = getFirestore();

const users = useCollection(collection(db, 'users'));
</script>

<template>
  <div>
    <h1 class="text-3xl font-semibold mb-4">All users</h1>
    <Actions />
    <UserList :users="users" />
  </div>
</template>

<style lang="scss" scoped></style>
