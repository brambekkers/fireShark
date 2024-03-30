<script setup>
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Button from '@/components/generic/Button.vue';
import IconMail from '~icons/lucide/mail';
import IconLock from '~icons/lucide/lock-keyhole';

const email = ref('');
const password = ref('');
const auth = useFirebaseAuth();
const router = useRouter();

const hasError = ref(false);
const errorMessage = ref('');

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/overview');
  } catch (error) {
    hasError.value = true;
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="flex flex-col max-w-md mx-auto mt-10">
    <div>
      <h2 class="text-primary text-3xl font-bold text-center">Welcome!</h2>
      <h3 class="text-app-subheading-color mb-5 text-2xl font-bold text-center">
        Aanmelden
      </h3>
      <p class="text-sm text-balance">
        Welcome back! We are so happy to have you here. It's great to see that
        you are working on your personal development! Well done!
      </p>
    </div>
    <hr class="my-6" />
    <div class="flex flex-col">
      <div class="relative mb-5">
        <div
          class="absolute inset-y-0 left-0 pl-4 pointer-events-none flex items-center text-app-primary"
        >
          <IconMail />
        </div>
        <input
          v-model="email"
          class="pl-12 pr-4 shadow-xl border rounded-2xl border-gray-300 w-full py-5 text-gray-700 leading-tight bg-white focus:border-app-primary focus:outline-none"
          type="text"
          placeholder="Email address"
        />
      </div>
      <div class="relative mb-4">
        <div
          class="absolute inset-y-0 left-0 pl-4 pointer-events-none flex items-center text-app-primary"
        >
          <IconLock />
        </div>
        <input
          v-model="password"
          class="pl-12 pr-4 shadow-xl border rounded-2xl border-gray-300 w-full py-5 text-gray-700 leading-tight bg-white focus:border-app-primary focus:outline-none"
          type="password"
          placeholder="Password"
        />
      </div>

      <Button
        class="mt-10"
        title="Log in"
        :disable="email === '' || password === ''"
        @on-clicked="login"
      />
    </div>
  </div>
</template>
