<script setup>
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Components
import FullPageLoader from '@/components/generic/FullPageLoader.vue';
import TextField from '@/components/generic/TextField.vue';
import Button from '@/components/generic/Button.vue';

// Icons
import IconMail from '~icons/lucide/mail';
import IconLock from '~icons/lucide/lock-keyhole';

const email = ref('');
const password = ref('');
const auth = useFirebaseAuth();
const router = useRouter();

const isLoading = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

const login = async () => {
  try {
    isLoading.value = true;
    if (email.value === '' || password.value === '') return;
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/overview');
  } catch (error) {
    hasError.value = true;
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
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
      <TextField
        v-model="email"
        :icon="IconMail"
        type="email"
        placeholder="Email address"
        class="mb-4"
      />
      <TextField
        v-model="password"
        :icon="IconLock"
        placeholder="Password"
        type="password"
        class="mb-4"
        @keydown.enter="login"
      />

      <Button
        class="mt-10"
        title="Log in"
        :disable="email === '' || password === ''"
        @on-clicked="login"
      />
      <div class="text-center mt-4 text-sm">
        Don't have an account?
        <router-link to="/register" class="text-primary font-semibold"
          >Register</router-link
        >
      </div>
    </div>
    <FullPageLoader :isLoading="isLoading" />
  </div>
</template>
