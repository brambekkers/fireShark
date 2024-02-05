<script setup>
import { storeToRefs } from 'pinia';
import { useQuestionStore } from '@stores/question';

const { selectedTopics } = storeToRefs(useQuestionStore());
</script>

<template>
    <div>
        <h1>I'm the practice page</h1>
        <p>{{ selectedTopics }}</p>
    </div>
</template>
