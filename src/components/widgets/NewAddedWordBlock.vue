<template>
  <div class="words-wrap">
    <p class="words__title">Новые добавленные слова</p>

    <template v-if="words.length">
      <wordlist-view
          :words="words"
          :columns="2"
      />
    </template>
    <template v-if="!words.length && !isActiveLoading">
      <p class="have-not-words">У вас пока нет слов, перейдите в словарь, что бы добавить новые слова.</p>
    </template>

    <div class="wrapper-loader" v-if="!words.length && isActiveLoading">
      <LoaderSpiner></LoaderSpiner>
    </div>

    <router-link to="/dictionary" class="secondary-button">
      Перейти в словарь
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"/>
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import LoaderSpiner from "@/components/widgets/LoaderSpiner";
import WordlistView from '@/components/widgets/WordlistView.vue';
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {onMounted} from "vue";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";

const {getAllUsersWords} = dictionaryRequests();
const dictionary = dictionaryStore();
const {words, isActiveLoading} = storeToRefs(dictionary);

onMounted(() => {
  getAllUsersWords();
})
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

.words-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  background-color: var(--yellow);

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--light-gray);
  }

  .words__title {
    font-size: 26px;
    color: var(--dark-pink);
  }

  .have-not-words {
    color: var(--dark-pink);
    font-size: 17px;
    font-weight: 800;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--light_pink);
    border: 2px solid var(--dark-pink);
  }

  .wrapper-loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .secondary-button {
    width: 230px;
    align-self: flex-end;
    border: 2px solid var(--dark);
    background-color: var(--pink);

    svg {
      fill: var(--white);
      transition: fill 0.2s;
    }

    &:hover {
      svg {
        fill: var(--dark);
      }
    }
  }
}
</style>
