<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

import SettingsSection from '@/components/settings/sections/Section.vue';
import PersonalSection from '@/components/settings/sections/Personal.vue';
import LanguageSection from '@/components/settings/sections/Language.vue';
import Button from '@/components/generic/Button.vue';

const router = useRouter();
const auth = getAuth();

const logout = async () => {
  await signOut(auth);
  router.push('/login');
};
</script>

<template>
  <div class="max-w-md mx-auto">
    <section class="flex justify-center flex-col my-8">
      <h2 class="text-lg italic text-center">
        {{ $t('settings.notAllCanBeChanged') }}
      </h2>
    </section>
    <PersonalSection />
    <LanguageSection />

    <SettingsSection icon="question" hasDropdown>
      {{ $t('settings.faq') }}
    </SettingsSection>

    <h4 class="font-bold mt-8 text-xl">{{ $t('general.notifications') }}</h4>
    <SettingsSection icon="bell">
      {{ $t('settings.pushNotifications') }}
    </SettingsSection>
    <SettingsSection icon="letter">
      {{ $t('settings.emailNotifications') }}
    </SettingsSection>

    <h4 class="font-bold mt-8 text-xl">{{ $t('general.notifications') }}</h4>
    <SettingsSection icon="trophy">
      {{ $t('settings.joinDuels') }}
    </SettingsSection>
    <SettingsSection icon="sync">
      {{ $t('settings.automaticDuel') }}
    </SettingsSection>

    <Button
      title="Logout"
      type="secondary"
      class="mt-8 w-52 mx-auto"
      @click="logout"
    />
  </div>
</template>
