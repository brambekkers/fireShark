<script setup>
import {
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot,
} from '@headlessui/vue';

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});

defineEmits(['closeModal', 'confirmRouting', 'cancelRouting']);

</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-50" @close="$emit('closeModal')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-primary bg-opacity-75 transition-opacity"></div>
      </TransitionChild>

      <div class="fixed inset-0 z-55 w-screen overflow-y-auto">
        <div class="flex min-h-full justify-center p-4 text-center items-center">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 py-8 flex justify-center items-center flex-col">
                <h1 class="text-primary text-3xl mb-3">
                  Are you sure?
                </h1>

                <p class="text-center text-sharp-text-color whitespace-pre-line mb-8">
                  Are you sure you want to stop practicing?<br>
                  Your progress has been saved.
                </p>

                <div class="mb-6">
                  <button type="button" class="w-full rounded-3xl bg-sharp-navbar-front px-8 py-3 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sharp-button-primary-bg-focus" @click="$emit('cancelRouting')">
                    Continue practicing
                  </button>
                </div>
                <div>
                  <button type="button" class="w-full rounded-3xl px-8 py-3 bg-transparent text-base font-semibold text-sharp-button-secondary-text border-2 border-sharp-button-secondary-border-color shadow-sm hover:text-sharp-button-secondary-text-focus hover:border-sharp-button-secondary-border-color-focus" @click="$emit('confirmRouting')">
                    Stop
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
