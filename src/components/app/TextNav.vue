<template>
  <div class="words-2__nav2" :class="{'left' : PROGRESS_SORT.type !== sortUserWords?.type}">
    <div @click="changeSort(ALFABET_SORT)"
         :class="{'active': ALFABET_SORT.type === sortUserWords?.type}">
      {{ ALFABET_SORT.title }}
    </div>

    <div @click="changeSort(PROGRESS_SORT)"
         :class="{'active': PROGRESS_SORT.type === sortUserWords?.type}">
      {{ PROGRESS_SORT.title }}
    </div>
  </div>
</template>

<script setup>
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";

const {getAllUsersWords} = dictionaryRequests();
const dictionary = dictionaryStore();
const {clearForSearching, changeSortTypeUserWords, PROGRESS_SORT, ALFABET_SORT} = dictionary;
const {sortUserWords} = storeToRefs(dictionary);

function changeSort(type) {
  changeSortTypeUserWords(type);
  clearForSearching();
  getAllUsersWords();
}
</script>

<style scoped lang="scss">
.words-2__nav2 {
  position: relative;
  display: flex;
  background-color: var(--pink);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  border: 2px solid var(--dark);

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: calc(100% - 104px);
    width: 105px;
    height: 100%;
    border-radius: 8px;
    background-color: var(--dark-pink);
    transition: all 0.2s;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    z-index: 1;
  }

  div {
    cursor: pointer;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    padding: 5px 10px;
    z-index: 2;
    transition: all 0.2s;
    margin-bottom: 2px;

    &:hover {
      text-decoration: none;
      color: var(--yellow);
    }

    &.active {
      text-decoration: none;
      color: var(--yellow);
    }
  }

  &.left {
    &:after {
      left: -2px;
      width: 100px;
    }
  }
}
</style>
