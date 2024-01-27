<template>
  <div class="words-2__list">
      <WordCard v-for="word in words" :key="word.id"
                :word="word"
                :list="list">
      </WordCard>
  </div>
</template>

<script setup>
import WordCard from "@/components/widgets/WordCard";
import {toRefs} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  words: Array,
  list: Boolean
});

const {list} = toRefs(props);
</script>

<style scoped lang="scss">
.words-2__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2%;
  padding-top: 50px;
  transition: all 1.5s;
 }
</style>
