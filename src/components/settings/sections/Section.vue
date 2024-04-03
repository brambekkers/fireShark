<script setup>
import IconGlobe from '~icons/ph/globe';
import IconQuestionLight from '~icons/ph/question-light';
import IconBell from '~icons/ph/bell';
import IconLetter from '~icons/material-symbols/mail-outline';
import IconUser from '~icons/mdi/user-outline';
import IconSync from '~icons/material-symbols/sync';
import IconTrophy from '~icons/ph/trophy';
import IconCaret from '~icons/ph/caret-down-bold';

const dropdownIsOpen = ref(false);

defineProps({
  icon: {
    type: String,
    required: true,
  },
  hasDropdown: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <section
    class="flex justify-center flex-col border-t border-app-primary border-opacity-50"
  >
    <button
      class="w-full py-6 text-lg flex justify-start items-center"
      @click="dropdownIsOpen = !dropdownIsOpen"
    >
      <IconGlobe v-if="icon === 'globe'" class="me-6 text-app-primary" />
      <IconUser v-if="icon === 'user'" class="me-6 text-app-primary" />
      <IconBell v-if="icon === 'bell'" class="me-6 text-app-primary" />
      <IconLetter v-if="icon === 'letter'" class="me-6 text-app-primary" />
      <IconSync v-if="icon === 'sync'" class="me-6 text-app-primary" />
      <IconTrophy v-if="icon === 'trophy'" class="me-6 text-app-primary" />
      <IconQuestionLight
        v-if="icon === 'question'"
        class="me-6 text-app-primary"
      />
      <slot />
      <IconCaret v-if="hasDropdown" class="ms-auto text-app-warning" />
    </button>
    <div
      v-if="dropdownIsOpen"
      class="mb-6 -mt-2 bg-white rounded-lg shadow-lg px-6 py-8"
    >
      <slot name="dropdown" />
    </div>
  </section>
</template>
