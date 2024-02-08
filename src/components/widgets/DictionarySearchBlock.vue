<template>
  <div class="wrapper-search-block">
    <div class="search-block">
      <v-text-field
          v-model="searchData"
          density="compact"
          variant="solo"
          label="Поиск слов"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="findWord"
      ></v-text-field>
    </div>

    <button v-if="isSearching" @click="clearSearchedWords">Сбросить поиск</button>
  </div>
</template>

<script setup>
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {ref} from "vue";
import {storeToRefs} from "pinia/dist/pinia";
import {dictionaryStore} from "@/store/dictionaryStore";

const {searchWord, getAllUsersWords} = dictionaryRequests();
const dictionary = dictionaryStore();
const {clearForSearching} = dictionary;
const {isSearching} = storeToRefs(dictionary);

let searchData = ref('');

function findWord() {
  clearForSearching();
  searchWord(searchData.value);
}

function clearSearchedWords() {
  searchData.value = '';
  clearForSearching();
  getAllUsersWords();
}
</script>

<style scoped lang="scss">

.wrapper-search-block {
  display: flex;
  gap: 15px;

  .search-block {
    width: 500px;
    display: flex;
    gap: 10px;

    :deep(.v-input) {

      .v-input__control {
        border-radius: 10px;
        border: 2px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);

        .v-field {
          border-radius: 8px;
          background-color: var(--yellow);

          .v-field__input {
            padding-bottom: unset;
          }
        }
      }
    }
  }

  button {
    height: 51px;
    font-size: 14px;
    border-radius: 10px;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    padding: 0 10px;
    background-color: var(--red);
    transition: all 0.2s;

    &:hover {
      background-color: var(--pink);
    }

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }
}
</style>
