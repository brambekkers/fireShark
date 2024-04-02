<script setup>
import Select from '@/components/generic/Select.vue';
import IconArrowRight from '~icons/lucide/arrow-big-right';
import { useGroupStore } from '@/stores/groups';
import { useQuestionsStore } from '@/stores/questions';

const { groups, groupsObject } = storeToRefs(useGroupStore());
const { selectedGroup, selectedTopic } = storeToRefs(useQuestionsStore());
</script>

<template>
  <div class="flex items-center gap-2 mb-4">
    <Select elevation="none" size="sm" v-model="selectedGroup" class="w-48">
      <option value="" hidden>Select group</option>
      <option v-for="group of groups" :key="group.id" :value="group.id">
        {{ group.name }}
      </option>
    </Select>
    <IconArrowRight class="w-6 h-6 text-app-primary" />
    <Select elevation="none" size="sm" v-model="selectedTopic" class="w-48">
      <template v-if="!selectedGroup">
        <option value="" hidden>🡨 First select group</option>
      </template>
      <template v-else>
        <option value="" hidden>Select topic</option>
        <option
          v-for="topic of groupsObject[selectedGroup]?.topics"
          :key="topic.id"
          :value="topic.id"
        >
          {{ topic.name }}
        </option>
      </template>
    </Select>
  </div>
</template>

<style lang="scss" scoped></style>
