<script setup>
import Actions from '@/components/admin/questions/Actions.vue';
import List from '@/components/admin/questions/List.vue';
import TopicSelector from '@/components/admin/questions/TopicSelector.vue';
import Edit from '@/components/admin/questions/Edit.vue';

const selectedQuestion = ref(null);

const addQuestion = () => {
  selectedQuestion.value = {
    parentId: '',
    headerImage: '',
    imageRef: null,
    id: null,
    type: 'singleAnswer',
    question: '',
    answers: [],
  };
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-semibold mb-4">Questions</h1>
    <Actions @add-question="addQuestion" />
    <TopicSelector />
    <List />
    <Edit :question="selectedQuestion" />
  </div>
</template>
