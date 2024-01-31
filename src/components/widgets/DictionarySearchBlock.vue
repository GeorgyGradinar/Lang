<template>
  <div class="wrapper-search-block">
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
</template>

<script setup>
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {ref} from "vue";

const {searchWord} = dictionaryRequests();

let searchData = ref('');

function findWord() {
  searchWord(searchData.value)
}
</script>

<style scoped lang="scss">
.wrapper-search-block {
  width: 400px;

  :deep(.v-input) {

    .v-input__control {
      border-radius: 10px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);


      .v-field {
        border-radius: 8px;
        background-color: var(--yellow);
      }
    }
  }
}
</style>
