<script setup>
import IconSettings from '~icons/lucide/settings-2';
import IconClipboard from '~icons/lucide/clipboard-check';
import IconSquareUser from '~icons/lucide/square-user';

const currentStep = defineModel('currentStep', {
  type: Number,
  required: true,
});
</script>

<template>
  <ol class="flex items-center w-full mb-8">
    <!-- Step 1 -->
    <li
      class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray/20 after:border-4 after:inline-block transition-all duration-300"
      :class="{ 'after:border-primary/20': currentStep >= 1 }"
    >
      <button
        type="button"
        :disabled="currentStep <= 0"
        class="flex items-center justify-center w-10 h-10 bg-app-navbar-bg rounded-full lg:h-12 lg:w-12 shrink-0 shadow-md"
        :class="{
          'hover:shadow-lg hover:bg-app-navbar-bg/80 transform hover:scale-105 transition-all duration-300':
            currentStep > 0,
        }"
        @click="() => (currentStep = 0)"
      >
        <IconSquareUser class="w-5 h-5 text-white" />
      </button>
    </li>
    <!-- Step 2 -->
    <li
      class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block transition-all duration-300"
      :class="{ 'after:border-primary/20': currentStep >= 2 }"
    >
      <button
        type="button"
        :disabled="currentStep <= 1"
        class="flex items-center justify-center w-10 h-10 bg-app-button-disabled-bg rounded-full lg:h-12 lg:w-12 shrink-0"
        :class="{
          'bg-app-navbar-bg': currentStep >= 1,
          'hover:shadow-lg hover:bg-app-navbar-bg/80 transform hover:scale-105 transition-all duration-300':
            currentStep > 1,
        }"
        @click="currentStep = 1"
      >
        <IconSettings class="w-5 h-5 text-white" />
      </button>
    </li>

    <!-- Step 3 -->
    <li class="flex items-center">
      <button
        type="button"
        :disabled="currentStep <= 2"
        class="flex items-center justify-center w-10 h-10 bg-app-button-disabled-bg rounded-full lg:h-12 lg:w-12 shrink-0"
        :class="{ 'bg-app-navbar-bg': currentStep >= 2 }"
        @click="currentStep = 2"
      >
        <IconClipboard class="w-5 h-5 text-white" />
      </button>
    </li>
  </ol>
</template>
