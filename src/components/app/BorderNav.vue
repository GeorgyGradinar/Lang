<template>
  <div class="words-2__nav1" :class="{'left' : COMPLETED_SORT.type !== sortUserWords?.type}">
    <div @click="changeSort(ALFABET_SORT)"
         :class="{'active': ALFABET_SORT.type === sortUserWords?.type}">
      Список слов
    </div>

    <div @click="changeSort(COMPLETED_SORT)"
         :class="{'active': COMPLETED_SORT.type === sortUserWords?.type}">
      {{ COMPLETED_SORT.title }}
    </div>
  </div>
</template>

<script setup>
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";
const {getAllUsersWords} = dictionaryRequests();
const dictionary = dictionaryStore();
const {clearForSearching, changeSortTypeUserWords, ALFABET_SORT, COMPLETED_SORT} = dictionary;
const {sortUserWords} = storeToRefs(dictionary);

function changeSort(type) {
  changeSortTypeUserWords(type);
  clearForSearching();
  getAllUsersWords();
}
</script>

<style scoped lang="scss">
.words-2__nav1 {
  position: relative;
  display: flex;
  line-height: 40px;
  background-color: var(--pink);
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid var(--dark);

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: calc(100% - 239px);
    width: 240px;
    height: 100%;
    border-radius: 8px;
    background-color: var(--dark-pink);
    transition: all 0.2s;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
  }

  div {
    color: var(--white);
    cursor: pointer;
    padding-left: 28px;
    padding-right: 28px;
    margin-bottom: 3px;
    z-index: 2;
    transition: all 0.2s;

    &:hover {
      color: var(--yellow);
    }

    &.active {
      color: var(--yellow);
    }
  }
}

.words-2__nav1.left {
  &:after {
    left: -2px;
    width: 170px;
  }
}

@media screen and (max-width: 500px) {
  .words-2__nav1 {
    line-height: 40px;
    font-size: 12px;

    &:after {
      left: calc(100% - 180px);
      width: 180px;
    }
  }

  .words-2__nav1.left {
    &:after {
      left: -2px;
      width: 136px;
    }
  }
}
</style>
