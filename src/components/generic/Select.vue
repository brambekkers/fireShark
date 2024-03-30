<script setup>
const model = defineModel({ type: String, required: true });

defineProps({
  icon: {
    type: Object,
    required: false,
    default: () => null,
  },
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
    <select
      v-model="model"
      class="pr-4 shadow-lg border rounded-2xl border-gray-300 w-full py-5 text-gray-700 leading-tight bg-white focus:border-app-primary focus:outline-none"
      :class="{ 'pl-12': icon, 'pl-4': !icon }"
    >
      <slot />
    </select>
  </div>
</template>

<style lang="scss" scoped></style>
