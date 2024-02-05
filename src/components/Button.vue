<script setup>

const props = defineProps({
  title: { type: String, required: true },
  disabled: { type: Boolean, required: false },
});

</script>

<template>
  <div>
    <button
      type="button"
      :disable="props.disabled"
    >
      {{ title }}
    </button>
  </div>
</template>
