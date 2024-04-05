<script setup>
const props = defineProps({
  isOpen: { type: Boolean, required: true },
  width: { type: String, required: false, default: '2xl' },
});

const widthClass = computed(() => {
  if (props.width === 'md') {
    return 'max-w-md';
  }
  if (props.width === 'lg') {
    return 'max-w-lg';
  }
  if (props.width === 'xl') {
    return 'max-w-xl';
  }
  if (props.width === '2xl') {
    return 'max-w-2xl';
  }
  if (props.width === '3xl') {
    return 'max-w-3xl';
  }
  if (props.width === '4xl') {
    return 'max-w-4xl';
  }
  if (props.width === '5xl') {
    return 'max-w-5xl';
  }
});
</script>

<template>
  <Teleport to="#modal">
    <div
      id="modal-container"
      :tabindex="isOpen ? 'auto' : -1"
      class="overflow-y-auto overflow-x-hidden fixed flex inset-0 z-50 justify-center items-center w-full max-h-screen backdrop-blur-sm bg-black/30"
      :class="{ hidden: !isOpen }"
    >
      <div class="relative p-4 max-h-full mx-auto w-full" :class="widthClass">
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
