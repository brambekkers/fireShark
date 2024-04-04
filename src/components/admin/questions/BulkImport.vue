<script setup>
import { supportedTypes } from '@/constants/questions';

// components
import Modal from '@/components/generic/Modal.vue';
import Button from '@/components/generic/Button.vue';
import ActionButton from '@/components/generic/ActionButton.vue';
import FileInput from '@/components/generic/FileInput.vue';
import Alert from '@/components/generic/Alert.vue';

// Icons
import IconClose from '~icons/uil/times';
import IconWarning from '~icons/lucide/file-warning';
import IconCheck from '~icons/lucide/square-check';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  toggleModal: {
    type: Function,
    required: true,
  },
});

const importArray = ref([]);
const errorArray = ref([]);
const errorCode = ref('');

const checkArray = (items) => {
  if (!Array.isArray(items)) {
    errorCode.value = 'noArray';
    return false;
  }
  if (items.length === 0) {
    errorCode.value = 'noItems';
    return false;
  }
  return true;
};

const importDisabled = computed(
  () => !importArray.value?.length || errorArray.value.find((i) => !!i),
);

const checkJson = (items) => {
  errorArray.value = items.map((item) => {
    // check type
    if (!item.type || typeof item.type !== 'string') return 'missingType';
    if (!item.question || typeof item.type !== 'string')
      return 'missingQuestion';
    if (!item.answers || typeof item.type !== 'object') return 'missingAnswers';
    if (!supportedTypes.includes(item.type)) return 'typeNotSupported';
    return null;
  });
};

const handleImport = (file) => {
  errorArray.value = [];
  errorCode.value = '';
  const reader = new FileReader();
  reader.onload = function (event) {
    const fileContent = event.target.result;
    const jsonRaw = JSON.parse(fileContent);
    if (checkArray(jsonRaw)) {
      importArray.value = jsonRaw;
      checkJson(jsonRaw);
    }
  };
  reader.readAsText(file);
};

const closeImport = () => {
  importArray.value = [];
  errorArray.value = [];
  errorCode.value = '';
  props.toggleModal();
};
</script>

<template>
  <Modal :is-open="isOpen" width="4xl">
    <!-- Modal header -->
    <div class="flex items-center justify-between p-5">
      <h3 class="text-xl font-semibold">Import questions</h3>
      <ActionButton @click="closeImport()">
        <IconClose class="h-6 w-6" />
      </ActionButton>
    </div>
    <Alert class="mx-5" v-if="errorCode" :message="errorCode" />
    <!-- Modal body -->
    <div class="px-5 py-2 space-y-2 w-full">
      <FileInput
        v-if="!importArray.length"
        elevation="none"
        size="xl"
        :accept="['.json']"
        @update="handleImport"
      />

      <div
        v-if="importArray.length"
        class="border-2 border-gray-300 border-dashed bg-gray-50 rounded-lg overflow-hidden"
      >
        <div class="max-h-96 h-fit overflow-y-auto scrollbar-thin">
          <table class="w-full h-full overflow-y-auto">
            <tr
              v-for="(item, i) of importArray"
              :key="i"
              class="border-slate-200"
              :class="{ 'border-b ': i !== importArray.length - 1 }"
            >
              <td class="p-2 w-6">
                <button v-if="errorArray[i]" type="button">
                  <IconWarning class="text-app-danger h-6" />
                </button>
                <IconCheck v-else class="text-app-success" />
              </td>
              <td class="font-semibold truncate">
                {{ item.question || '...' }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal footer -->
    <div class="flex items-center justify-end px-5 pb-5 pt-2">
      <Button title="Import" size="md" :disable="importDisabled" />
    </div>
  </Modal>
</template>
