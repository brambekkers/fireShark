<script setup>
import FileInput from '@/components/generic/FileInput.vue';
import IconImage from '~icons/lucide/image';
import { useImage } from '@/composable/image';
import { watch } from 'vue';

const emit = defineEmits(['update']);

const imageUrl = defineModel('imageUrl', {
  type: String,
  required: false,
  default: () => null,
});

const imageRef = defineModel('imageRef', {
  type: String,
  required: false,
  default: () => null,
});
const props = defineProps({
  imageLocation: {
    type: String,
    required: true,
  },
});
const { uploadPicture, url, uploadTask, deletePicture } = useImage(
  props.imageLocation,
);

watch(url, (newUrl) => {
  imageUrl.value = newUrl;
  imageRef.value = newUrl ? props.imageLocation : null;
  emit('update');
});
</script>

<template>
  <div class="flex flex-col justify-between gap-2">
    <div class="flex gap-2 items-end justify-between">
      <div class="flex gap-2 items-center">
        <IconImage class="w-5 text-app-primary" />
        <h4 class="font-medium">Image</h4>
      </div>
      <button
        v-if="imageUrl"
        class="text-sm text-app-button-danger-bg-focus -mb-1 mr-2"
        @click="deletePicture"
      >
        Delete image
      </button>
    </div>
    <FileInput
      v-if="!imageUrl"
      elevation="none"
      size="md"
      :disabled="!!uploadTask"
      @update="uploadPicture"
    />
    <div
      v-else
      class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg bg-gray-50"
    >
      <img
        :src="imageUrl"
        alt="Group image"
        class="w-full h-48 object-cover rounded-lg"
      />
    </div>
  </div>
</template>
