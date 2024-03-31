<script setup>
import IconLeft from '~icons/lucide/chevron-left';
import { useUserStore } from '@/stores/user';
const { stats } = storeToRefs(useUserStore());
const router = useRouter();
</script>

<template>
  <div class="header-buttons flex justify-between items-center py-2 w-full">
    <!-- Go back -->
    <button
      type="button"
      class="go-back-button bg-app-warning text-white border-0 h-10 w-10 rounded-full flex items-center justify-center text-lg transition hover:scale-110"
      @click="router.go(-1)"
    >
      <IconLeft class="mr-0.5" />
    </button>

    <!-- Percentage -->
    <section
      class="relative text-center text-green-900 text-sm rounded-lg bg-app-body-bg overflow-hidden w-32 h-7 flex items-center px-2"
    >
      <div
        :style="{ width: `${Math.round(stats?.percentage)}%` }"
        class="bg-slate-300 absolute left-0 h-full z-0"
      />
      <span class="relative z-1 font-black">
        {{ Math.round(stats?.percentage) }}%
      </span>
      <span class="relative z-1 ms-1">up-to-date</span>
    </section>
  </div>
</template>
