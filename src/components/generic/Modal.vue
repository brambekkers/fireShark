<script setup>
const props = defineProps({
  isOpen: { type: Boolean, required: true },
  maxWidth: { type: String, required: false, default: '2xl' },
});

const maxWidthClass = computed(() => {
  if (props.maxWidth === 'xl') {
    return 'max-w-xl';
  }
  if (props.maxWidth === '2xl') {
    return 'max-w-2xl';
  }
  if (props.maxWidth === '3xl') {
    return 'max-w-3xl';
  }
  if (props.maxWidth === '4xl') {
    return 'max-w-4xl';
  }
  if (props.maxWidth === '5xl') {
    return 'max-w-5xl';
  }
});
</script>

<template>
  <Teleport to="#modal">
    <div
      id="modal-container"
      :tabindex="isOpen ? 'auto' : -1"
      class="overflow-y-auto overflow-x-hidden fixed flex inset-0 z-50 justify-center items-center w-full max-h-full backdrop-blur-sm bg-black/30"
      :class="{ hidden: !isOpen }"
    >
      <div class="relative p-4 max-h-full mx-auto" :class="maxWidthClass">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
#modal-container {
  z-index: 9999;
}
</style>
