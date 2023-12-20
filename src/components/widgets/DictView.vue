<template>
  <div class="words-2__list">
    <template v-for="word in words" :key="word.id">
      <WordCard :word="word"></WordCard>
     </template>

  </div>
</template>

<script setup>
import WordCard from "@/components/widgets/WordCard";

// eslint-disable-next-line no-undef
defineProps({
  words: Array
});
</script>

<style scoped lang="scss">
.words-2__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2%;
  padding-top: 50px;
 }
</style>
