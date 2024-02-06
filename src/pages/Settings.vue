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
    <SettingsSection icon="user">
      {{ $t('settings.personalSettings') }}
    </SettingsSection>
    <SettingsSection icon="globe">
      {{ $t('settings.language') }}
    </SettingsSection>
    <SettingsSection icon="question">{{ $t('settings.faq') }} </SettingsSection>

    <h4 class="font-bold mt-8 text-xl">{{ $t('general.notifications') }}</h4>
    <SettingsSection icon="bell"> Persoonlijke gegevens </SettingsSection>
    <SettingsSection icon="letter"> Persoonlijke gegevens </SettingsSection>

    <h4 class="font-bold mt-8 text-xl">{{ $t('general.notifications') }}</h4>
    <SettingsSection icon="trophy"> Persoonlijke gegevens </SettingsSection>
    <SettingsSection icon="sync"> Persoonlijke gegevens </SettingsSection>
  </div>
</template>
