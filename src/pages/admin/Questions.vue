<script setup>
import { useCurriculumStore } from '@/stores/curriculum';
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

const editQuestion = (question) => (selectedQuestion.value = question);
</script>

<template>
  <div>
    <h1 class="text-3xl font-semibold mb-4">{{ $t('general.questions') }}</h1>
    <Actions
      @add-question="addQuestion"
      @delete-question="useCurriculumStore().deleteQuestion"
    />
    <TopicSelector />
    <List
      @edit-question="editQuestion"
      @delete-question="useCurriculumStore().deleteQuestion"
    />
    <Edit :question="selectedQuestion" />
  </div>
</template>
@/stores/curriculum
