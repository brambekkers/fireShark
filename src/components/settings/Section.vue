<script setup>
import IconGlobe from '~icons/ph/globe';
import IconQuestionLight from '~icons/ph/question-light';
import IconBell from '~icons/ph/bell';
import IconLetter from '~icons/material-symbols/mail-outline';
import IconUser from '~icons/mdi/user-outline';
import IconSync from '~icons/material-symbols/sync';
import IconTrophy from '~icons/ph/Trophy';

defineProps({
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section
    class="flex justify-center flex-col border-t border-sharp-primary border-opacity-50"
  >
    <button class="w-full py-6 text-lg flex justify-start items-center">
      <IconGlobe v-if="icon === 'globe'" class="me-6 text-sharp-primary" />
      <IconUser v-if="icon === 'user'" class="me-6 text-sharp-primary" />
      <IconBell v-if="icon === 'bell'" class="me-6 text-sharp-primary" />
      <IconLetter v-if="icon === 'letter'" class="me-6 text-sharp-primary" />
      <IconSync v-if="icon === 'sync'" class="me-6 text-sharp-primary" />
      <IconTrophy v-if="icon === 'trophy'" class="me-6 text-sharp-primary" />
      <IconQuestionLight
        v-if="icon === 'question'"
        class="me-6 text-sharp-primary"
      />
      <slot />
    </button>
  </section>
</template>

<style lang="scss" scoped></style>
