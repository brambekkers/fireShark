<template>
  <div ref="editorContainer" class="editor-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import * as monaco from 'monaco-editor';

const props = defineProps({
  initialCode: {
    type: String,
    default: "// Type your code here",
  },
  language: {
    type: String,
    default: "javascript",
  },
  theme: {
    type: String,
    default: "vs-dark",
  },
});

const editorContainer = ref(null);
let editorInstance = null;

// Function to get the current content of the editor
function getEditorContent() {
  return editorInstance?.getValue();
}

onMounted(() => {
  editorInstance = monaco.editor.create(editorContainer.value, {
    value: props.initialCode,
    language: props.language,
    theme: props.theme,
  });
});

watch(() => props.initialCode, (newValue) => {
  if (editorInstance) {
    editorInstance.setValue(newValue);
  }
}, { immediate: true });

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.dispose();
  }
});

// Expose the getEditorContent method
defineExpose({
  getEditorContent,
});
</script>

<style scoped>
.editor-container {
  height: 500px; /* Adjust the height as needed */
}
</style>
