<script setup>
// components
import Modal from '@/components/generic/Modal.vue';
import Button from '@/components/generic/Button.vue';
import ActionButton from '@/components/generic/ActionButton.vue';

// Icons
import IconClose from '~icons/uil/times';

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  toggleModal: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <Modal :is-open="isOpen">
    <!-- Modal header -->
    <div class="flex items-center justify-between p-5">
      <h3 class="text-xl font-semibold">Import questions</h3>
      <ActionButton @click="toggleModal()">
        <IconClose class="h-6 w-6" />
      </ActionButton>
    </div>
    <!-- Modal body -->
    <div class="px-5 py-2 space-y-4 w-full">
      <!-- Groups -->
      <div
        class="bg-primary/10 border border-primary px-4 py-3 rounded relative text-sm"
        role="alert"
      >
        <p>
          <strong class="font-bold">Explanation: </strong><br />
          Questions can belong to one or more topics, where each topic is part
          of a group. Groups can in theire place consist of multiple topics.
        </p>

        <p class="mt-1">
          <strong class="font-medium">For example: </strong>
          A group may be centered around a specific profession (Development).
          Within a profession-based group, topics represent different skills
          relevant to that profession. The group contains multiple topics such
          as "Javascript" "CSS" and "DevOps." Each topic would then contain
          questions relevant to that specific skill set.
        </p>
      </div>
      content
    </div>

    <!-- Modal footer -->
    <div class="flex items-center justify-end px-5 pb-5 pt-2">
      <Button title="Import" size="md" />
    </div>
  </Modal>
</template>
