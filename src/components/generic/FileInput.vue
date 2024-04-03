<script setup>
import IconUpload from '~icons/lucide/cloud-upload';

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
  elevation: { type: String, required: false, default: 'lg' },
  size: { type: String, required: false, default: 'lg' },
  disabled: { type: Boolean, required: false, default: false },
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

const handleFileChange = (event) => {
  const img = event.target.files[0];
  emit('update', img);
};
</script>

<template>
  <div class="flex items-center justify-center w-full">
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-gray-500 transition-colors duration-300 ease-in-out"
      :class="[sizeClass, elevationClass]"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <IconUpload class="w-8 h-8 mb-4 text-gray-500" />

        <p class="mb-2 text-sm text-gray-500">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
      <input
        id="dropzone-file"
        type="file"
        class="hidden"
        :disabled="disabled"
        @change="handleFileChange"
      />
    </label>
  </div>
</template>
