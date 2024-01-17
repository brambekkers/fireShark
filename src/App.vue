<script setup>
import sharpLayout from "@/layouts/sharpLayout.vue"
import blankLayout from "@/layouts/blankLayout.vue"
import semiSharpLayout from "@/layouts/semiSharpLayout.vue"
import { useIntervalFn } from "@vueuse/core"
import { ref } from "vue"

const layoutNames = [
  "The purest form of a Sharp clone",
  "Sharp structure (questiontypes, pages, etc.), but the styling is up to us",
  "Freeform. Sharp is merely a concept, the codebase is a wasteland for us to populate",
]

const layout = ref(0)
useIntervalFn(() => {
  layout.value = layout.value < 2 ? layout.value + 1 : (layout.value = 0)
}, 10000)
</script>

<template>
  <div
    class="fixed bottom-0 right-0 bg-white border-4 border-primary max-w-96 py-4 px-8"
  >
    <p class="!text-black">
      {{ layoutNames[layout] }}
    </p>
  </div>
  <sharpLayout v-if="layout === 0" class="bg-sharp-body-bg">
    <router-view />
  </sharpLayout>
  <semiSharpLayout v-if="layout === 1">
  </semiSharpLayout>
  <blankLayout v-if="layout === 2">
  </blankLayout>
</template>
