<template>
  <div class="wrapper-words-theme">
    <p class="words__title">Группы слов по темам</p>
    <div class="words__group-row">
      <div class="words__group"
           v-for="group in groups" :key="group.id"
           @click="selectGroup(group)"
      >
        <h4>{{ group.title }}</h4>
      </div>
    </div>
  </div>

  <words-list-dlg v-if="isOpenDialog" @hiddenBlock="toggleOpenDialog"/>
</template>

<script setup>
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";
import WordsListDlg from '@/components/modals/WordsListDlg.vue';
import {onMounted, ref} from "vue";

const {getGroups, getWordsFromGroup} = dictionaryRequests();
const dictionary = dictionaryStore();
const {groups} = storeToRefs(dictionary);
const {changeSelectedGroup} = dictionary;

let isOpenDialog = ref(false);

onMounted(() => {
  getGroups();
})

function selectGroup(group) {
  changeSelectedGroup(group);
  getWordsFromGroup();
  toggleOpenDialog(true);
}

function toggleOpenDialog(isOpen) {
  isOpenDialog.value = isOpen;
}
</script>

<style scoped lang="scss">

.wrapper-words-theme {
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100%;
  padding: 30px 20px 40px;
  border-radius: 10px;
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  background-color: var(--light_pink);

  .words__title {
    font-size: 26px;
    font-weight: 900;
    margin-bottom: 20px;
    color: var(--dark-pink);
  }

  .words__group-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    .words__group {
      display: flex;
      justify-content: center;
      min-width: 100px;
      background-color: var(--dark-pink);
      padding: 10px;
      border-radius: 10px;
      color: var(--white);
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      cursor: pointer;
      transition: all 0.2s;

      h4 {
        color: var(--yellow);
        font-size: 17px;
      }

      &:hover {
        background-color: var(--pink);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }
    }
  }
}
</style>
