<script setup>
import Select from '@/components/generic/Select.vue';

// Icons
import IconBriefcase from '~icons/lucide/briefcase-business';

// Store
import { useGroupStore } from '@/stores/groups';

const { groups } = storeToRefs(useGroupStore());

const position = defineModel('position', {
  type: String,
  required: true,
});
</script>

<template>
  <div class="flex flex-col">
    <Select v-model="position" :icon="IconBriefcase">
      <option
        v-for="position in groups"
        :key="position.id"
        :value="position.id"
      >
        {{ position.name }}
      </option>
    </Select>
  </div>
</template>

<style lang="scss" scoped></style>
