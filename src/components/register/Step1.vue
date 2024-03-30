<script setup>
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
</script>

<template>
  <div class="flex flex-col">
    <div class="flex gap-4 mb-4">
      <!-- FirstName -->
      <TextField
        v-model="firstName"
        :icon="IconUser"
        placeholder="First name"
      />
      <TextField v-model="lastName" :icon="IconUser" placeholder="Last name" />
    </div>
    <TextField
      v-model="email"
      :icon="IconMail"
      type="email"
      placeholder="Email address"
    />

    <hr class="my-5" />
    <TextField
      v-model="password"
      type="password"
      :icon="IconLock"
      placeholder="Password"
      class="mb-4"
    />
    <TextField
      v-model="controlPassword"
      type="password"
      :icon="IconLockOpen"
      placeholder="Control password"
      class="mb-5"
    />
  </div>
</template>

<style lang="scss" scoped></style>
