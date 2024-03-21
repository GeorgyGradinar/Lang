<template>
  <div class="words-3 bg-base-1">
    <div class="words-2__nav">
      <p class="words-3__title">Группы слов по темам</p>
    </div>

    <div class="words-3__list">
      <div v-for="group in groups" :key="group.id"
           :class="{'selected': group.id === selectedGroupWords?.id}"
           @click="selectGroup(group)">
        <h3> {{ group.title }}</h3>
        <p>{{ group.description }}</p>
      </div>
    </div>

    <GroupWordsBlock></GroupWordsBlock>
  </div>
</template>

<script setup>
import {dictionaryStore} from "@/store/dictionaryStore";
import GroupWordsBlock from "@/components/widgets/GroupWordsBlock";
import {storeToRefs} from "pinia/dist/pinia";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";

const dictionary = dictionaryStore();
const {changeGroupWords, changeSelectedGroup, clearPagination} = dictionary;
const {groups, selectedGroupWords} = storeToRefs(dictionary);
const {getWordsFromGroup} = dictionaryRequests();

function selectGroup(group) {
  clearPagination();

  if (selectedGroupWords.value?.id === group.id) {
    changeSelectedGroup(null);
  } else {
    changeSelectedGroup(group);
    getWordsFromGroup();
  }

  changeGroupWords([]);
}
</script>

<style scoped lang="scss">
.words-3 {
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);

  .words-2__nav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 15px;

    .words-3__title {
      font-size: 20px;
      font-weight: 800;
    }

    .wrapper-right-block {
      display: flex;
      align-items: center;

      .add-new-word {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-radius: 10px;
        margin-left: 15px;
        margin-bottom: 23px;
        padding: 0 10px 0 0;
        color: var(--dark);
        background-color: var(--yellow);
        border: 1px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        transition: all 0.2s;

        img {
          width: 30px;
          height: 30px;
        }

        &:hover {
          background-color: var(--red);
          color: var(--white);
        }

        &:active {
          box-shadow: 0 0 1px var(--dark);
          transform: translateY(5px);
        }
      }
    }
  }

  .words-3__list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    padding-top: 32px;

    div {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      width: 200px;
      color: var(--light-yellow);
      background-color: var(--dark-pink);
      padding: 10px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      transition: all 0.2s;

      &:hover {
        background-color: var(--pink);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }

      h3 {
        margin-bottom: 10px;
        color: var(--yellow);
      }
    }

    .selected {
      background-color: var(--pink);
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }

  .wrapper-types-view {
    display: flex;
    justify-content: space-between;
    width: 100%;

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
  }
}

@media screen and (max-width: 1000px) {
  .words-3 {
    padding: 30px 10px;

    .words-3__list {
      justify-content: center;
    }
  }
}

@media screen and (max-width: 450px) {
  .words-3 {
    .words-3__list {
      div {
        width: 100%;
      }
    }
  }
}

</style>
