<script setup>
// Store
import { useGroupStore } from '@/stores/groups';

const { groupsObject } = storeToRefs(useGroupStore());

defineProps({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  position: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <table
    class="w-full text-left bg-white rounded-lg border-primary border-t-4 shadow-md"
  >
    <tbody>
      <tr>
        <td class="w-fit p-4">{{ $t('general.name') }}:</td>
        <td class="p-4 text-end font-bold">{{ firstName }} {{ lastName }}</td>
      </tr>
      <tr>
        <td class="w-fit p-4">{{ $t('general.email') }}:</td>
        <td class="p-4 text-end font-bold">{{ email }}</td>
      </tr>
      <tr>
        <td class="w-fit p-4">{{ $t('general.position') }}:</td>
        <td class="p-4 text-end font-bold">
          <span v-for="(id, i) in position" :key="id">
            {{ groupsObject[id]?.name }}
            <span v-if="i !== position.length - 1" class="-ms-1 me-2">,</span>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
