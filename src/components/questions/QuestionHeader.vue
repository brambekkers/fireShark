<script setup>
defineProps({
  questions: Array,
})
</script>

<template>
    <div v-for="question in questions">
       <img :src="question.headerImg"/>
      <p>{{ question.question }}</p>
    </div>
</template>

<style lang="scss" scoped>

</style>
