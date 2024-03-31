<script setup>
defineProps({
  isOpen: { type: Boolean, required: true },
  toggleModal: { type: Function, required: true },
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
      <div class="relative p-4 max-w-2xl max-h-full mx-auto">
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
