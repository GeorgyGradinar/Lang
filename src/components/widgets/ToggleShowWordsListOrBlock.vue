<template>
  <div class="types-view" :class="{'left': isShowWordsTypeList}">
    <button @click="toggleTypeShowWords(true)">
      <img src="img/dictionary/list.svg" alt="">
    </button>
    <button @click="toggleTypeShowWords(false)">
      <img src="img/dictionary/grid.svg" alt="">
    </button>
  </div>
</template>

<script setup>
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";

const dictionary = dictionaryStore();
const {toggleTypeShowWords} = dictionary;
const {isShowWordsTypeList} = storeToRefs(dictionary);
</script>

<style scoped lang="scss">
.types-view {
  position: relative;
  display: flex;
  justify-content: flex-end;
  background-color: var(--pink);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  border: 2px solid var(--dark);
  margin-bottom: 20px;

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: calc(100% - 59px);
    width: 60px;
    height: 100%;
    border-radius: 8px;
    background-color: var(--dark-pink);
    transition: all 0.2s;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    z-index: 1;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
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
      width: 60px;
    }
  }
}
</style>
