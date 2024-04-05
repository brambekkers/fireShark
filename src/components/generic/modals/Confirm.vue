<script setup>
import Button from '@/components/generic/base/Button.vue';
import Modal from '@/components/generic/base/Modal.vue';

const emit = defineEmits(['confirm']);
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
  text: {
    type: String,
    required: false,
    default: '',
  },
  title: {
    type: String,
    required: false,
    default: '',
  },
  closeConfirm: {
    type: Function,
    required: true,
  },
});

const confirm = () => {
  emit('confirm');
  props.closeConfirm();
};
</script>

<template>
  <Modal width="md" :is-open="isOpen">
    <!-- Modal header -->
    <div class="flex items-center justify-between p-5">
      <h3 class="text-xl font-semibold">{{ title }}</h3>
    </div>
    <!-- Modal body -->
    <div class="px-5 py-2 space-y-4 w-full">
      <slot> {{ text }} </slot>
    </div>

    <!-- Modal footer -->
    <div class="flex items-center justify-between px-5 pb-5 pt-2">
      <Button
        :title="buttonCancel || $t('general.cancel')"
        size="md"
        type="secondary"
        @click="closeConfirm"
      />
      <Button
        :title="buttonConfirm || $t('general.confirm')"
        size="md"
        type="danger"
        @click="confirm()"
      />
    </div>
  </Modal>
</template>
