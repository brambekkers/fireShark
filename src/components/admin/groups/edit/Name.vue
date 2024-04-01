<script setup>
import IconPencil from '~icons/lucide/pencil-line';
import TextField from '@/components/generic/TextField.vue';

const name = defineModel('name', {
  type: String,
  required: true,
});
</script>

<template>
  <div class="flex items-center justify-between gap-10">
    <div class="flex gap-2 items-center">
      <IconPencil class="w-5 text-app-primary" />
      <h4 class="font-medium">Group name</h4>
    </div>
    <TextField
      v-model="name"
      placeholder="Group name"
      size="md"
      elevation="none"
      class="w-1/2"
    />
  </div>
</template>
