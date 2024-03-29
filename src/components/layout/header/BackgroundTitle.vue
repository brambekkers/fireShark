<template>
  <div
    aria-hidden="true"
    class="bg-secondary absolute inset-0 background"
  ></div>
</template>
<style scoped>
.background {
  background: linear-gradient(
      0deg,
      rgba(0, 146, 134, 0.95),
      rgba(0, 94, 93, 0.95)
    ),
    url('@/assets/backgroundHeader.jpg');
  background-size: cover;
  background-position: 50%;
}
</style>
