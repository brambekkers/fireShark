<script setup>
import Actions from '@/components/admin/questions/Actions.vue';
import List from '@/components/admin/questions/List.vue';
import TopicSelector from '@/components/admin/questions/TopicSelector.vue';
</script>

<template>
  <div>
    <h1 class="text-3xl font-semibold mb-4">Questions</h1>
    <Actions />
    <TopicSelector />
    <List />
  </div>
</template>

<style lang="scss" scoped></style>
