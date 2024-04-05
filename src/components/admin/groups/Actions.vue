<script setup>
import IconSearch from '~icons/lucide/search';
import Button from '@/components/generic/base/Button.vue';

const searchText = ref('');

defineEmits(['addGroup']);
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
          :placeholder="$t('admin.groups.search')"
        />
      </div>
    </div>
    <!-- right side -->
    <div class="flex gap-2">
      <Button
        :title="$t('admin.groups.addGroup')"
        type="primary"
        size="md"
        @click="$emit('addGroup')"
      />
      <Button :title="$t('general.export')" type="secondary" size="md" />
    </div>
  </div>
</template>
