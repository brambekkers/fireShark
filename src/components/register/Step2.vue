<script setup>
import Select from '@/components/generic/Select.vue';
import Button from '@/components/generic/Button.vue';

// Icons
import IconBriefcase from '~icons/lucide/briefcase-business';
import IconTimes from '~icons/iconamoon/sign-times-circle-fill';

// Store
import { useGroupStore } from '@/stores/groups';

const { groups, groupsObject } = storeToRefs(useGroupStore());

const position = defineModel('position', {
  type: Array,
  required: true,
});

const addPosition = () => {
  if (!newPosition.value) return;
  // check if the position is already added
  if (position.value.includes(newPosition.value)) return;
  // add the position
  position.value.push(newPosition.value);
};

const removePosition = (id) => {
  position.value = position.value.filter((positionId) => positionId !== id);
};

const newPosition = ref('');
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-4">
      <Select class="flex-grow" v-model="newPosition" :icon="IconBriefcase">
        <option
          v-for="position in groups"
          :key="position.id"
          :value="position.id"
        >
          {{ position.name }}
        </option>
      </Select>
      <Button title="Add position" type="secondary" @click="addPosition" />
    </div>

    <!-- List of positions -->
    <div v-if="position.length">
      <h2 class="mt-5 text-lg font-semibold">Your positions:</h2>
      <div class="flex">
        <div v-for="id in position" :key="id" class="mt-2 relative">
          <div
            class="bg-primary text-white font-medium me-2 px-6 py-2 rounded-full"
          >
            {{ groupsObject[id]?.name }}

            <button @click="removePosition(id)">
              <IconTimes
                class="absolute -top-2 right-1 text-app-danger w-6 h-6 bg-white rounded-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="mt-2 ms-5 text-sm text-red">
      Please select the positions you are involved in.
    </p>
  </div>
</template>
