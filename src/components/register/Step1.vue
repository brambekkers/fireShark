<script setup>
import { useDebounceFn } from '@vueuse/core';
import TextField from '@/components/generic/TextField.vue';
// Icons
import IconUser from '~icons/lucide/user-round';
import IconMail from '~icons/lucide/mail';
import IconLock from '~icons/lucide/lock-keyhole';
import IconLockOpen from '~icons/lucide/lock-keyhole-open';

const firstName = defineModel('firstName', {
  type: String,
  required: true,
});
const lastName = defineModel('lastName', {
  type: String,
  required: true,
});
const email = defineModel('email', {
  type: String,
  required: true,
});
const password = defineModel('password', {
  type: String,
  required: true,
});
const controlPassword = defineModel('controlPassword', {
  type: String,
  required: true,
});

const passwordMatchCriteria = defineModel('passwordMatchCriteria', {
  type: Boolean,
  required: true,
});

const hasSpecialCharacter = computed(() => /(?=.*[\W_])/.test(password.value));
const hasCapitalLetter = computed(() => /[A-Z]/.test(password.value));
const hasMinLength = computed(() => password.value.length >= 8);

watch([password, controlPassword], () => {
  passwordMatchCriteria.value =
    !!hasMinLength && !!hasSpecialCharacter && !!hasCapitalLetter;
});

const noPasswordMatch = ref(false);

const checkIfPasswordsMatch = useDebounceFn(() => {
  if (!password.value || !controlPassword.value) {
    noPasswordMatch.value = false;
    return;
  }

  if (password.value !== controlPassword.value) {
    noPasswordMatch.value = true;
  } else {
    noPasswordMatch.value = false;
  }
}, 1000);
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col sm:flex-row gap-4 mb-4">
      <!-- FirstName -->
      <TextField
        v-model="firstName"
        :icon="IconUser"
        :placeholder="$t('general.firstName')"
      />
      <TextField
        v-model="lastName"
        :icon="IconUser"
        :placeholder="$t('general.lastName')"
      />
    </div>
    <TextField
      v-model="email"
      :icon="IconMail"
      type="email"
      :placeholder="$t('general.email')"
    />

    <hr class="my-5" />
    <TextField
      v-model="password"
      type="password"
      :icon="IconLock"
      :placeholder="$t('general.password')"
      class="mb-4"
      @input="checkIfPasswordsMatch"
    />
    <ul class="mb-5 px-10 text-sm list-disc">
      <li
        class="transition-all duration-300 ease-in-out"
        :class="{
          'text-app-danger': password.length > 0 && !hasMinLength,
          'text-app-success': hasMinLength,
        }"
      >
        {{ $t('auth.register.minCharacter') }}
      </li>
      <li
        class="transition-all duration-300 ease-in-out"
        :class="{
          'text-app-danger': password.length > 0 && !hasCapitalLetter,
          'text-app-success': hasCapitalLetter,
        }"
      >
        {{ $t('auth.register.specialCharacter') }}
      </li>
      <li
        class="transition-all duration-300 ease-in-out"
        :class="{
          'text-app-danger': password.length > 0 && !hasSpecialCharacter,
          'text-app-success': hasSpecialCharacter,
        }"
      >
        {{ $t('auth.register.capitalCharacter') }}
      </li>
    </ul>
    <TextField
      v-model="controlPassword"
      type="password"
      :icon="IconLockOpen"
      :placeholder="$t('general.controlPassword')"
      class="mb-1"
      @input="checkIfPasswordsMatch"
    />
    <p v-if="noPasswordMatch" class="mb-5 px-5 text-sm text-app-danger">
      Passwords do not match
    </p>
  </div>
</template>
