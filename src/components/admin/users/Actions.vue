<script setup>
import IconSearch from '~icons/lucide/search';
import IconSettings from '~icons/lucide/settings';
import IconTrash from '~icons/lucide/trash';
import IconInfo from '~icons/lucide/info';
import IconEllipsis from '~icons/lucide/ellipsis-vertical';

import Button from '@/components/generic/Button.vue';
import ActionButton from '@/components/generic/ActionButton.vue';

const searchText = ref('');
</script>

<template>
  <div class="flex justify-between mb-4">
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
          placeholder="Search for users"
        />
      </div>
      <!-- Vertical HR -->
      <div
        class="border-t sm:border-t-0 sm:border-s border-gray-200 ms-3 me-1 h-8"
      ></div>
      <ActionButton>
        <IconSettings class="h-6 w-6" />
      </ActionButton>
      <ActionButton>
        <IconTrash class="h-6 w-6" />
      </ActionButton>
      <ActionButton>
        <IconInfo class="h-6 w-6" />
      </ActionButton>
      <ActionButton>
        <IconEllipsis class="h-6 w-6" />
      </ActionButton>
    </div>
    <!-- right side -->
    <div class="flex gap-2">
      <Button title="Add user" type="primary" size="md" />
      <Button title="Export" type="secondary" size="md" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
