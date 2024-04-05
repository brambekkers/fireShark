<script setup>
import IconMessage from '~icons/lucide/message-square-text';
import TextArea from '@/components/generic/inputs/TextArea.vue';

const description = defineModel('description', {
  type: String,
  required: true,
});
</script>

<template>
  <div class="flex flex-col justify-between gap-2">
    <div class="flex gap-2 items-center">
      <IconMessage class="w-5 text-app-primary" />
      <h4 class="font-medium">{{ $t('general.description') }}</h4>
    </div>
    <TextArea
      v-model="description"
      :placeholder="$t('admin.groups.addDescriptionForGroup')"
      size="md"
      elevation="none"
    />
  </div>
</template>
