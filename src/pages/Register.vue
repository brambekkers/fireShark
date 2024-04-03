<script setup>
import { useUserStore } from '@/stores/user';

import Alert from '@/components/generic/Alert.vue';
import Stepper from '@/components/register/Stepper.vue';
import Step1 from '@/components/register/Step1.vue';
import Step2 from '@/components/register/Step2.vue';
import Step3 from '@/components/register/Step3.vue';
import Button from '@/components/generic/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Step 1
const currentStep = ref(0);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const controlPassword = ref('');
const passwordMatchCriteria = ref(false);

// Step 2
const position = ref([]);

const isLoading = ref(false);
const hasError = ref(false);
const errorCode = ref('');

const step1Completed = computed(() => {
  const allFields =
    !!firstName.value &&
    !!lastName.value &&
    !!email.value &&
    !!password.value &&
    !!controlPassword.value;
  const passwordsMatch = password.value === controlPassword.value;
  return allFields && passwordsMatch && passwordMatchCriteria.value;
});

const step2Completed = computed(() => position.value.length > 0);

const buttonDisabled = computed(() => {
  if (currentStep.value === 0) {
    return !step1Completed.value;
  }
  if (currentStep.value === 1) {
    return !step2Completed.value;
  }
  return false;
});

const nextStep = async () => {
  if (currentStep.value === 0 && !step1Completed.value) {
    return;
  }

  if (currentStep.value === 1 && !step2Completed.value) return;

  if (currentStep.value === 2) {
    try {
      isLoading.value = true;
      await useUserStore().createUser({
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        email: email.value,
        position: position.value,
      });
      router.push('/login');
    } catch (error) {
      hasError.value = true;
      errorCode.value = error.errorCode;
    } finally {
      isLoading.value = false;
    }
  }

  // Update the current step
  if (currentStep.value < 2) {
    currentStep.value += 1;
  }
};
</script>

<template>
  <div class="flex flex-col max-w-xl mx-auto">
    <div>
      <h2 class="text-primary text-3xl font-bold text-center">
        {{ $t('general.welcome') }}!
      </h2>
      <h3 class="text-app-subheading-color mb-5 text-2xl font-bold text-center">
        {{ $t('general.register') }}
      </h3>
      <p class="text-sm">
        {{ $t('auth.register.message') }}
      </p>

      <p class="text-sm font-semibold mt-2">
        {{ $t('auth.register.enterDetails') }}
      </p>
    </div>
    <hr class="my-6" />
    <Alert
      v-if="hasError"
      class="-mt-3 mb-4"
      title="Error"
      :message="$t(`firebase.error.${errorCode}`)"
    />
    <Stepper v-model:current-step="currentStep" />
    <Step1
      v-if="currentStep === 0"
      v-model:firstName="firstName"
      v-model:lastName="lastName"
      v-model:email="email"
      v-model:password="password"
      v-model:controlPassword="controlPassword"
      v-model:passwordMatchCriteria="passwordMatchCriteria"
    />
    <Step2 v-if="currentStep === 1" v-model:position="position" />
    <Step3
      v-if="currentStep === 2"
      :first-name="firstName"
      :last-name="lastName"
      :email="email"
      :position="position"
    />
    <Button
      class="mt-10"
      :disable="buttonDisabled"
      :title="currentStep < 2 ? $t('general.next') : $t('general.submit')"
      @click="nextStep"
    />
  </div>
</template>
