<template>
  <div class="wrapper-button-more-words">
    <button class="secondary-button"
            :class="{'disable': activeLoader}"
            :disabled="activeLoader"
            @click="getMoreWords">
      <p v-if="!activeLoader">Больше слов</p>
      <LoaderSpiner :is-mini-loader="true" v-if="activeLoader"></LoaderSpiner>
    </button>
  </div>
</template>

<script setup>
import LoaderSpiner from "@/components/widgets/LoaderSpiner";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {toRefs} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  activeLoader: Boolean,
  isUserWords: Boolean
})
const {activeLoader, isUserWords} = toRefs(props);
const {getWordsFromGroup, getAllUsersWords} = dictionaryRequests();

function getMoreWords() {
  if (isUserWords.value) {
    getAllUsersWords(true);
  } else {
    getWordsFromGroup(true);
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

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
</style>
