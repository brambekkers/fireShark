<script setup>
import { useDragAndDrop } from '@formkit/drag-and-drop/vue';
import { animations } from '@formkit/drag-and-drop';
import { nanoid } from 'nanoid';

// Icons
import IconPlus from '~icons/lucide/plus';
import IconList from '~icons/lucide/clipboard-list';
import IconDrag from '~icons/mdi/drag-vertical';
import IconTrash from '~icons/lucide/trash';

// Components
import TextField from '@/components/generic/inputs/TextField.vue';
import CheckCircle from '@/components/generic/ui/CheckCircle.vue';
import ActionButton from '@/components/generic/base/ActionButton.vue';

const answers = defineModel('answers', {
  type: Object,
  required: true,
});
</script>

<template>
  <div class="bg-app-body-bg rounded-lg border p-2 flex flex-col gap-2">
    <div class="flex items-center justify-between gap-10 px-2">
      <div class="flex gap-2 items-center">
        <IconList class="w-5 text-app-primary" />
        <h4>The answer is:</h4>
      </div>
    </div>
    {{ answers }}
    <div class="flex gap-2 items-center justify-center">
      <button class="w-32 h-24 border rounded-lg flex items-center justify-center bg-app-" :class="{ 'bg-app-button-danger-bg': answers.true }">true</button>
      <button class="w-32 h-24 border rounded-lg flex bg-app-success items-center justify-center">false</button>
    </div>
  </div>
</template>
