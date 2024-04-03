<script setup>
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Components
import FullPageLoader from '@/components/generic/FullPageLoader.vue';
import TextField from '@/components/generic/TextField.vue';
import Button from '@/components/generic/Button.vue';
import Alert from '@/components/generic/Alert.vue';

// Icons
import IconMail from '~icons/lucide/mail';
import IconLock from '~icons/lucide/lock-keyhole';

const email = ref('');
const password = ref('');
const auth = useFirebaseAuth();
const router = useRouter();

const isLoading = ref(false);
const hasError = ref(false);
const errorCode = ref('');

const login = async () => {
  try {
    isLoading.value = true;
    if (email.value === '' || password.value === '') return;
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/overview');
  } catch (error) {
    hasError.value = true;
    errorCode.value = error.code;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col max-w-md mx-auto">
    <div>
      <h2 class="text-primary text-3xl font-bold text-center">
        {{ $t('general.welcome') }}!
      </h2>
      <h3 class="text-app-subheading-color mb-5 text-2xl font-bold text-center">
        {{ $t('auth.login.login') }}
      </h3>
      <p class="text-sm text-balance">{{ $t('auth.login.message') }}</p>
    </div>
    <hr class="my-6" />
    <Alert
      v-if="hasError"
      class="-mt-3 mb-4"
      title="Error"
      :message="$t(`firebase.error.${errorCode}`)"
    />

    <div class="flex flex-col">
      <TextField
        v-model="email"
        :icon="IconMail"
        type="email"
        :placeholder="$t('general.emailAddress')"
        class="mb-4"
      />
      <TextField
        v-model="password"
        :icon="IconLock"
        :placeholder="$t('general.password')"
        type="password"
        class="mb-4"
        @keydown.enter="login"
      />

      <Button
        class="mt-10"
        :title="$t('auth.login.login')"
        :disable="email === '' || password === ''"
        @click="login"
      />
      <div class="text-center mt-4 text-sm">
        {{ $t('auth.login.noAccount') }}
        <router-link to="/register" class="text-primary font-semibold">
          {{ $t('general.register') }}
        </router-link>
      </div>
    </div>
    <FullPageLoader :is-loading="isLoading" />
  </div>
</template>
