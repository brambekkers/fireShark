<script setup>
import SettingsSection from '@/components/settings/sections/Section.vue';
const { locale } = useI18n();
</script>

<template>
  <SettingsSection icon="globe" hasDropdown>
    {{ $t('settings.language') }}
    <template #dropdown>
      <p
        class="cursor-pointer mb-4"
        :class="{ 'text-app-primary font-semibold': locale === 'en' }"
        @click="locale = 'en'"
      >
        English
      </p>
      <p
        class="cursor-pointer"
        :class="{ 'text-app-primary  font-semibold': locale === 'nl' }"
        @click="locale = 'nl'"
      >
        Nederlands
      </p>
    </template>
  </SettingsSection>
</template>
