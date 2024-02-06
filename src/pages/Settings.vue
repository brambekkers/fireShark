<script setup>
import SettingsSection from '@/components/settings/Section.vue';
</script>

<template>
  <div class="max-w-md mx-auto">
    <section class="flex justify-center flex-col my-8">
      <h2 class="text-lg italic text-center">
        {{ $t('settings.notAllCanBeChanged') }}
      </h2>
    </section>
    <SettingsSection icon="test">
      {{ $t('settings.personalSettings') }}
    </SettingsSection>
    <SettingsSection icon="test">
      {{ $t('settings.language') }}
    </SettingsSection>
    <SettingsSection icon="test">{{ $t('settings.faq') }} </SettingsSection>

    <h4 class="font-bold mt-8 text-xl">{{ $t('general.notifications') }}</h4>
    <SettingsSection icon="test"> Persoonlijke gegevens </SettingsSection>
    <SettingsSection icon="test"> Persoonlijke gegevens </SettingsSection>
    <SettingsSection icon="test"> Persoonlijke gegevens </SettingsSection>
  </div>
</template>
