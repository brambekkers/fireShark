<script setup>
import SettingsSection from '@/components/settings/sections/Section.vue';
import useUserStore from '@/stores/userStore';

const { user } = storeToRefs(useUserStore());
</script>

<template>
  <SettingsSection icon="user" hasDropdown>
    {{ $t('settings.personalSettings') }}
    <template #dropdown>
      <h4 class="font-bold text-xl">{{ $t('general.name') }}</h4>
      <p class="mb-4">{{ user.name }}</p>
      <h4 class="font-bold text-xl">{{ $t('general.id') }}</h4>
      <p class="mb-4">{{ user.id }}</p>
      <h4 class="font-bold text-xl">{{ $t('general.email') }}</h4>
      <p class="mb-4">{{ user.email }}</p>
    </template>
  </SettingsSection>
</template>
