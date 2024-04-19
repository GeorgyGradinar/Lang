<template>
  <div class="words-2">
    <div class="words-2__nav">
      <BorderNav :tabs="wordNav"/>

      <div class="wrapper-right-block">
        <button class="information">
          <img src="img/dictionary/info.svg" alt="information">
          <PopapBlock></PopapBlock>
        </button>

        <TextNav :tabs="textNav"/>
        <!--        <button class="add-new-word" @click="openDialogNewWord">-->
        <!--          <img src="img/dictionary/plus.svg" alt="plus">-->
        <!--          Добавить слово-->
        <!--        </button>-->
      </div>
    </div>

    <div class="wrapper-types-view">
      <DictionarySearchBlock></DictionarySearchBlock>
      <!--      <ToggleShowWordsListOrBlock></ToggleShowWordsListOrBlock>-->
    </div>

    <div class="words-2__list" v-if="words.length" :class="{'list-show': isShowWordsTypeList}">
      <WordCard v-for="word in words" :key="word.id"
                :wordData="word.word" :userWord="word">
      </WordCard>
      <ButtonMoreWords v-if="paginationUserWords?.current_page < paginationUserWords?.last_page"
                       :active-loader="isActiveUserWordLoader"
                       :isUserWords="true">
      </ButtonMoreWords>
    </div>

    <p class="message" v-if="!words.length && isSearching && !isActiveLoading">Слово не найдено</p>
    <p class="message" v-if="!words.length && !isSearching && !isActiveLoading">У вас в словаре нет слов</p>

    <LoaderSpiner v-if="!words.length && isActiveLoading"></LoaderSpiner>
  </div>

</template>

<script setup>
import WordCard from "@/components/widgets/WordCard";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";
import LoaderSpiner from "@/components/widgets/LoaderSpiner";
import BorderNav from '@/components/app/BorderNav.vue';
import TextNav from '@/components/app/TextNav.vue';
import DictionarySearchBlock from "@/components/widgets/DictionarySearchBlock";
// import ToggleShowWordsListOrBlock from "@/components/widgets/ToggleShowWordsListOrBlock";
import ButtonMoreWords from "@/components/dictionary/ButtonMoreWords";
import PopapBlock from "@/components/dictionary/PopapBlock";

const dictionary = dictionaryStore();
const {
  words,
  isSearching,
  isActiveLoading,
  isShowWordsTypeList,
  isActiveUserWordLoader,
  paginationUserWords
} = storeToRefs(dictionary);

const wordNav = [
  {id: 0, title: 'Список слов'},
  {id: 1, title: 'Отработанные слова'}
];
const textNav = [
  {id: 0, title: 'по алфавиту'},
  {id: 1, title: 'по прогрессу'}
];
</script>

<style scoped lang="scss">

.popap-word {
  width: 600px;
}

.words-2 {
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  border-bottom: 2px solid rgba(103, 27, 161, 0.3);

  .words-2__nav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .wrapper-right-block {
      display: flex;
      align-items: center;
      gap: 10px;

      .information {
        width: 33px;
        height: 33px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        border: 2px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        background-color: var(--pink);
        transition: all 0.2s;

        &:active {
          box-shadow: 0 0 1px var(--dark);
          transform: translateY(4px);
        }

        img {
          width: 25px;
          height: 25px;
        }
      }

      //.add-new-word {
      //  display: flex;
      //  justify-content: center;
      //  align-items: center;
      //  height: 40px;
      //  border-radius: 10px;
      //  margin-left: 15px;
      //  margin-bottom: 23px;
      //  padding: 0 10px 0 0;
      //  color: var(--dark);
      //  background-color: var(--yellow);
      //  border: 1px solid var(--dark);
      //  box-shadow: 1px 4px 1px var(--dark);
      //  transition: all 0.2s;
      //
      //  img {
      //    width: 30px;
      //    height: 30px;
      //  }
      //
      //  &:hover {
      //    background-color: var(--red);
      //    color: var(--white);
      //  }
      //
      //  &:active {
      //    box-shadow: 0 0 1px var(--dark);
      //    transform: translateY(5px);
      //  }
      //}
    }
  }

  .wrapper-types-view {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .words-2__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding-top: 50px;
    transition: all 1s;
  }

  .message {
    font-size: 20px;
    font-weight: 700;
    margin: 70px 0;
  }

  .list-show {
    justify-content: center;
  }
}

@media screen and (max-width: 1000px) {
  .words-2 {
    padding: 30px 10px;
  }
}

@media screen and (max-width: 800px) {
  .words-2 {

    .words-2__nav {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;

      .wrapper-right-block {

      }
    }

    .wrapper-types-view {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .words-2__list {

    }

    .message {

    }

    .list-show {

    }
  }
}
</style>
