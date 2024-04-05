<script setup>
import IconCheck from '~icons/lucide/check';

defineProps({
  isChecked: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    class="rounded-full p-4 max-h-1 max-w-1 flex justify-center transition-all duration-300"
    :class="isChecked ? '!bg-app-success' : 'bg-slate-300'"
  >
    <Transition
      class="transition-all duration-300 transform"
      enter-from-class="scale-0 rotate-45"
      enter-to-class="scale-100 rotate-0"
      leave-active-class="duration-150"
      leave-to-class="scale-0"
      appear
    >
      <span v-if="isChecked" class="text-white self-center">
        <IconCheck />
      </span>
    </Transition>
  </div>
</template>

<style lang="scss" scoped></style>
