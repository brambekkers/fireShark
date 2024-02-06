<script setup>
import IconBrain from '~icons/lucide/brain';
import IconTrophy from '~icons/material-symbols/trophy-outline';
import IconSettings from '~icons/tdesign/setting-1';
</script>

<template>
  <section
    class="flex justify-center flex-col border-t border-sharp-primary border-opacity-50"
  >
    <button class="w-full py-6 text-lg flex justify-start items-center">
      <IconBrain class="me-6 text-sharp-primary" />
      <slot />
    </button>
  </section>
</template>

<style lang="scss" scoped></style>
