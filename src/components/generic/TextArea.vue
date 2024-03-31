<script setup>
const model = defineModel({ type: String, required: true });

const props = defineProps({
  icon: {
    type: Object,
    required: false,
    default: () => null,
  },
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
  maxlength: {
    type: Number,
    required: false,
    default: 120,
  },
  elevation: { type: String, required: false, default: 'lg' },
  size: { type: String, required: false, default: 'lg' },
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'py-2 rounded-md text-sm';
    case 'md':
      return 'py-3 rounded-lg';
    case 'lg':
      return 'py-5 rounded-2xl';
    default:
      return 'py-3 rounded-lg';
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
  <div class="relative">
    <div
      v-if="icon"
      class="absolute inset-y-0 left-0 pl-4 pointer-events-none flex items-center text-app-primary"
    >
      <component :is="icon" />
    </div>
    <textarea
      v-model="model"
      rows="3"
      :maxlength="maxlength"
      class="pr-4 border border-gray-300 w-full text-gray-700 leading-tight bg-white focus:border-app-primary focus:outline-none"
      :class="[{ 'pl-12': icon, 'pl-4': !icon }, sizeClass, elevationClass]"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<style lang="scss" scoped></style>
