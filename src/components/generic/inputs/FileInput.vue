<script setup>
import { useDropZone } from '@vueuse/core';

import IconUpload from '~icons/lucide/cloud-upload';
import Alert from '@/components/generic/base/Alert.vue';

const { t } = useI18n();

const props = defineProps({
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  accept: {
    type: Array,
    required: false,
    default: () => ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
  },
  elevation: { type: String, required: false, default: 'lg' },
  size: { type: String, required: false, default: 'lg' },
  disabled: { type: Boolean, required: false, default: false },
});

const maxMBfileSize = 2;
const isCorrectExtension = (name) => {
  const items = name.split('.');
  const lastPart = items[items.length - 1];
  const extension = `.${lastPart}`;
  return props.accept.includes(extension);
};

const isCorrectFileSize = (size) => {
  const maxSize = maxMBfileSize * 1024 * 1024; // 2 MB in bytes
  return size < maxSize;
};

const dropZoneRef = ref(null);
const onUpload = (files) => {
  const file = files[0];
  if (!file) return;
  if (!isCorrectExtension(file.name)) {
    fileTypeMatch.value = false;
    return;
  }
  if (!isCorrectFileSize(file.size)) {
    fileSizeMatch.value = false;
    return;
  }
  fileTypeMatch.value = true;
  fileSizeMatch.value = true;
  emit('update', file);
};
const { isOverDropZone } = useDropZone(dropZoneRef, { onDrop: onUpload });

const fileTypeMatch = ref(true);
const fileSizeMatch = ref(true);
const acceptedTypes = computed(() => {
  const arr = props.accept.map((fileType) => fileType.toUpperCase());
  const first = arr.slice(0, -1).join(', ');
  const last =
    (arr.length > 1 ? ` ${t('general.or')} ` : '') + arr[arr.length - 1];
  return first + last;
});

const emit = defineEmits(['update']);

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-32';
    case 'md':
      return 'h-48';
    case 'lg':
      return 'h-64';
    case 'xl':
      return 'h-80';
    case '2xl':
      return 'h-96';
    default:
      return 'h-64';
  }
});

const elevationClass = computed(() => {
  switch (props.elevation) {
    case 'none':
      return 'shadow-none';
    case 'sm':
      return 'shadow-sm';
    case 'md':
      return 'shadow-md';
    case 'lg':
      return 'shadow-lg';
    default:
      return 'shadow-md';
  }
});
</script>

<template>
  <Alert
    v-if="!fileTypeMatch"
    :message="$t('components.fileUpload.fileTypeError')"
  />
  <Alert
    v-if="!fileSizeMatch"
    :message="$t('components.fileUpload.fileSizeError')"
  />
  <div ref="dropZoneRef" class="flex items-center justify-center w-full">
    <label
      :for="`id_${acceptedTypes}`"
      class="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-gray-500 transition-colors duration-300 ease-in-out"
      :class="[
        sizeClass,
        elevationClass,
        {
          'border-app-primary shadow-sm': isOverDropZone,
          'border-gray-300': !isOverDropZone,
        },
      ]"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <IconUpload class="w-8 h-8 mb-4 text-gray-500" />

        <p class="mb-2 text-sm text-gray-500">
          <span class="font-semibold">
            {{ $t('components.fileUpload.ClickToUpload') }}
          </span>
          {{ $t('components.fileUpload.dragDrop') }}
          {{ isOverDropZone ? 'true' : 'false' }}
        </p>
        <p class="text-xs text-gray-500">
          {{ acceptedTypes }}
          (MAX. {{ maxMBfileSize }}MB)
        </p>
      </div>
      <input
        :id="`id_${acceptedTypes}`"
        type="file"
        class="hidden"
        :disabled="disabled"
        :accept="accept.join(',')"
        @change="(e) => onUpload(e?.target?.files)"
      />
    </label>
  </div>
</template>
