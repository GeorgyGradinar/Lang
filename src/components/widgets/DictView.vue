<template>
  <div class="words-2__list" v-if="words">
    <WordCard v-for="word in words" :key="word.id"
              :word="word"
              :list="list">
    </WordCard>
  </div>

  <div class="words-2__next">
    Открыть больше слов&nbsp;&nbsp;
    <img src="img/icon/bx-chevron-down1.svg">
  </div>
</template>

<script setup>
import WordCard from "@/components/widgets/WordCard";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";
import {onMounted, toRefs} from "vue";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";

// eslint-disable-next-line no-undef
const props = defineProps({
  list: Boolean
});
const {list} = toRefs(props);

const {getAllUsersWords} = dictionaryRequests();
const dictionary = dictionaryStore();
const {words} = storeToRefs(dictionary);

onMounted(() => {
  getAllUsersWords();
})
</script>

<style scoped lang="scss">
.words-2__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2%;
  width: 100%;
  padding-top: 50px;
  transition: all 1.5s;
}

.words-2__next {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  margin-top: 24px;
  padding: 5px;
  font-size: 20px;
  font-weight: 800;
  border-radius: 10px;
  background-color: var(--yellow);
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  transition: all 0.2s;

  &:hover {
    background-color: var(--blue);
  }

  &:active {
    box-shadow: 0 0 1px var(--dark);
    transform: translateY(5px);
  }
}
</style>
