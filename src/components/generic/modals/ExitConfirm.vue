<script setup>
import Button from '@/components/generic/base/Button.vue';
import Modal from '@/components/generic/base/Modal.vue';

const emit = defineEmits(['confirm', 'cancel']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  buttonConfirm: {
    type: String,
    required: false,
    default: '',
  },
  buttonCancel: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <Modal width="xl" :is-open="isOpen">
    <div class="py-8">
      <!-- Modal header -->
      <div class="px-5">
        <h3 class="text-primary text-3xl mb-3 text-center">Are you sure?</h3>
      </div>
      <!-- Modal body -->
      <div class="w-full text-center mb-8 max-w-80 mx-auto">
        Are you sure you want to stop practicing? Your progress has been saved.
      </div>

      <!-- Modal footer -->
      <div class="flex flex-col items-center w-full space-y-4">
        <Button
          title=" Continue practicing "
          size="md"
          type="primary"
          @click="$emit('cancel')"
        />
        <Button
          title="Stop"
          size="md"
          type="secondary"
          @click="$emit('confirm')"
        />
      </div>
    </div>
  </Modal>
</template>
