<script setup>
import { useQuestionsStore } from '@/stores/questions';

const { questions, selectedGroup, selectedTopic } =
  storeToRefs(useQuestionsStore());
</script>

<template>
  <table
    v-if="selectedGroup && selectedTopic"
    class="w-full text-left bg-white rounded-xl overflow-hidden"
  >
    <thead class="bg-slate-200">
      <tr>
        <th class="p-2 font-medium text-sm text-center">#</th>
        <th class="p-2 font-medium text-sm">Question</th>
        <th class="p-2 font-medium text-sm">Type</th>
        <th class="p-2 font-medium text-sm">Avg. score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(question, i) of questions" :key="question.id">
        <td class="text-center py-4">{{ i + 1 }}</td>
        <td class="font-bold">{{ question.question }}</td>
        <td>{{ question.type }}</td>
        <td class="py-2 flex gap-2 items-center">
          <div class="relative w-12 h-12">
            <svg class="w-full h-full" viewBox="0 0 100 100">
              <!-- Background circle -->
              <circle
                class="text-app-button-danger-bg stroke-current"
                stroke-width="12"
                cx="50"
                cy="50"
                r="30"
                fill="transparent"
                :stroke-dashoffset="`calc(400 - (185 * 100 / 100)`"
              />
              <!-- Progress circle -->
              <circle
                class="text-app-primary progress-ring__circle stroke-current"
                stroke-width="12"
                stroke-linecap="round"
                cx="50"
                cy="50"
                r="30"
                fill="transparent"
                :stroke-dashoffset="`calc(400 - (185 * 70 / 100)`"
              />
            </svg>
          </div>
          <span class="text-sm"> 70% </span>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>First select a group and topic</div>
</template>

<style lang="scss">
.progress-ring__circle {
  stroke-dasharray: 400, 400;
  transition: stroke-dashoffset 1.5s ease-in-out;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}
</style>
