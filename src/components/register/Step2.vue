<script setup>
import { useCollection } from 'vuefire';
import { getFirestore, collection } from 'firebase/firestore';

import Select from '@/components/generic/Select.vue';

// Icons
import IconBriefcase from '~icons/lucide/briefcase-business';

const db = getFirestore();
const positions = useCollection(collection(db, 'questions'));

const position = defineModel('position', {
  type: String,
  required: true,
});
</script>

<template>
  <div class="flex flex-col">
    <Select v-model="position" :icon="IconBriefcase">
      <option
        v-for="position in positions"
        :key="position.id"
        :value="position.id"
      >
        {{ position.name }}
      </option>
    </Select>
  </div>
</template>

<style lang="scss" scoped></style>
