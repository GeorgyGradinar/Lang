<template>
  <div class="wrapper-group-words" v-if="groupWords.length">
    <h3>Слова из словаря </h3>
    <div class="wrapper-words" :class="{'list-show': isShowWordsTypeList}">
      <WordCard v-for="word in groupWords" :key="word.id"
                :word="word">
      </WordCard>
    </div>
    <div class="wrapper-button-more-words">
      <button class="secondary-button"
              :class="{'disable': isActiveGroupWordLoader}"
              :disabled="isActiveGroupWordLoader"
              v-if="currentPageWordsInGroup !== allPagesWordInGroup"
              @click="getMoreWords">
        <p v-if="!isActiveGroupWordLoader">Больше слов</p>
        <LoaderSpiner :is-mini-loader="true" v-if="isActiveGroupWordLoader"></LoaderSpiner>
      </button>
    </div>
  </div>

  <LoaderSpiner v-if="!groupWords.length && isActiveGroupWordLoader"></LoaderSpiner>
</template>

<script setup>
import WordCard from "@/components/widgets/WordCard";
import LoaderSpiner from "@/components/widgets/LoaderSpiner";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";

const dictionary = dictionaryStore();
const {
  groupWords,
  isActiveGroupWordLoader,
  isShowWordsTypeList,
  selectedGroupWords,
  currentPageWordsInGroup,
  allPagesWordInGroup
} = storeToRefs(dictionary);
const {getWordsFromGroup} = dictionaryRequests();

function getMoreWords() {
  getWordsFromGroup(selectedGroupWords.value.id, true);
}
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

.wrapper-group-words {
  width: 100%;
  padding-top: 60px;

  h3 {
    font-size: 25px;
    font-weight: 800;
    color: var(--dark);
  }

  .wrapper-words {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 2%;
    width: 100%;
    padding-top: 20px;
    transition: all 1s;
  }

  .wrapper-button-more-words {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .secondary-button {
      width: 150px;
      height: 40px;
      padding: 6px 10px;
      font-weight: 700;

      &.disable {
        &:hover {
          background-color: var(--light_pink);
          cursor: wait;
        }
      }
    }
  }

  .list-show {
    justify-content: center;
  }
}
</style>
