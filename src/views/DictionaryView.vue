<template>
  <div class="words-2 bg-base-purple">
    <div class="words-2__nav">
      <border-nav :tabs="wordNav" @selected="showPage"/>
      <div class="wrapper-right-block">
        <TextNav :tabs="textNav" @selected="sortPage"/>
        <button class="add-new-word" @click="openDialogNewWord">
          <img src="img/dictionary/plus.svg" alt="plus">
          Добавить слово
        </button>
      </div>
    </div>

    <dict-view :words="wordShow"/>

    <div class="words-2__next"
         v-if="wordShow.length < wordsAll.length"
         @click="addWords(66)">
      Открыть больше слов&nbsp;&nbsp;
      <img src="img/icon/bx-chevron-down1.svg">
    </div>
  </div>
  <div class="words-3 bg-base-1">
    <div class="words-2__nav">
      <p class="words-3__title">
        Группы слов по темам
      </p>
      <div class="wrapper-right-block">
        <text-nav :tabs="textNav"/>
        <button class="add-new-word" @click="openDialogNewGroup">
          <img src="img/dictionary/plus.svg" alt="plus">
          Добавить словарь
        </button>
      </div>
    </div>

    <thems-view
        :thems="themsShow"
        @selected="showThemeDlg"
    />

    <div class="words-2__next div-center"
         v-if="themsShow.length < themsAll.length"
         @click="addThems(35)">
      Открыть больше групп&nbsp;&nbsp;
      <img src="img/icon/bx-chevron-down1.svg">
    </div>

    <!--Модальное окно словаря -->
    <!--    <dict-words-dlg ref="dictwordsdlg"/>-->
    <words-list-dlg ref="wordslistdlg"/>
    <AddNewWord v-if="isOpenDialogAddWords" @close="closeDialogNewWord"></AddNewWord>
    <AddNewGroup v-if="isOpenDialogGroup" @close="closeDialogNewGroup"></AddNewGroup>
  </div>

  <MiniChat></MiniChat>
</template>

<script setup>
// import DictWordsDlg from '@/components/modals/DictWordsDlg.vue';
import BorderNav from '@/components/app/BorderNav.vue';
import TextNav from '@/components/app/TextNav.vue';
import DictView from '@/components/widgets/DictView.vue';
import ThemsView from '@/components/widgets/ThemsView.vue';
import MiniChat from "@/components/widgets/MiniChat";
import WordsListDlg from '@/components/modals/WordsListDlg.vue';
import AddNewWord from "@/components/modals/new-words/AddNewWord";
import AddNewGroup from "@/components/modals/new-group/AddNewGroup";
import {sortUPbyField} from '@/assets/js/lib';
import {onMounted, ref} from "vue";

let wordNav = ref([]);
let textNav = ref([]);
let wordsAll = ref([]);
let wordShow = ref([]);
let themsAll = ref([]);
let themsShow = ref([]);
// let dictwordsdlg = ref(null);
let wordslistdlg = ref(null);

let isOpenDialogAddWords = ref(false);
let isOpenDialogGroup = ref(false);

onMounted(() => {
  wordNav.value = [
    {id: 0, title: 'Список слов'},
    {id: 1, title: 'Отработанные слова'}
  ];

  textNav.value = [
    {id: 0, title: 'по алфавиту'},
    {id: 1, title: 'по популярности'}
  ];

  showPage({id: 0});

  GenerateThems();
  addThems(35);
})

function GenerateWords() {
  const sourceAll = [
    {id: 0, title: 'accelerate', count: 0, popular: 1, done: false},
    {id: 0, title: 'accept', count: 2, popular: 2, done: false},
    {id: 0, title: 'ship', count: 0, popular: 134, done: false},
    {id: 0, title: 'Earth', count: 0, popular: 4, done: false},
    {id: 0, title: 'puncake', count: 3, popular: 4, done: false},
    {id: 0, title: 'Family', count: 0, popular: 55, done: false},
    {id: 0, title: 'box', count: 0, popular: 8, done: false},
    {id: 0, title: 'street', count: 3, popular: 362, done: false},
    {id: 0, title: 'partner', count: 0, popular: 5, done: false},
    {id: 0, title: 'water', count: 0, popular: 9, done: false},
    {id: 0, title: 'white', count: 0, popular: 25, done: false},
    {id: 0, title: 'coffee', count: 3, popular: 36, done: false},
    {id: 0, title: 'food', count: 0, popular: 31, done: false},
    {id: 0, title: 'Family', count: 0, popular: 74, done: false},
    {id: 0, title: 'necklace', count: 0, popular: 83, done: false},
  ]

  let index = 0;
  let id = 0;
  wordsAll.value = [];
  for (let i = 0; i < 150; i++) {
    sourceAll[index].id = id
    wordsAll.value.push({...sourceAll[index]})
    id++
    index++
    if (index === sourceAll.length) {
      index = 0
    }
  }
}

function GenerateDoneWords() {
  const sourceAll = [
    {id: 0, title: 'accelerate', count: 0, popular: 2, done: true},
    {id: 0, title: 'accept', count: 0, popular: 2, done: true},
    {id: 0, title: 'ship', count: 0, popular: 134, done: true},
    {id: 0, title: 'Earth', count: 0, popular: 4, done: true},
    {id: 0, title: 'puncake', count: 0, popular: 4, done: true},
    {id: 0, title: 'Family', count: 0, popular: 55, done: true},
    {id: 0, title: 'box', count: 0, popular: 8, done: true},
    {id: 0, title: 'street', count: 0, popular: 362, done: true},
    {id: 0, title: 'partner', count: 0, popular: 5, done: true},
    {id: 0, title: 'water', count: 0, popular: 9, done: true},
    {id: 0, title: 'white', count: 0, popular: 25, done: true},
    {id: 0, title: 'coffee', count: 0, popular: 36, done: true},
    {id: 0, title: 'food', count: 0, popular: 31, done: true},
    {id: 0, title: 'Family', count: 0, popular: 74, done: true},
    {id: 0, title: 'necklace', count: 0, popular: 83, done: true},
  ]

  let index = 0;
  let id = 0;
  wordsAll.value = [];
  for (let i = 0; i < 32; i++) {
    sourceAll[index].id = id;
    wordsAll.value.push({...sourceAll[index]});
    id++
    index++
    if (index === sourceAll.length) {
      index = 0;
    }
  }
}

function GenerateThems() {
  themsAll.value = []

  const sourceAll = [
    {id: 0, title: 'Институт', count: 0, popular: 2, done: true},
    {id: 0, title: 'Знакомство', count: 0, popular: 2, done: true},
    {id: 0, title: 'Погода', count: 1, popular: 134, done: true},
    {id: 0, title: 'География', count: 0, popular: 4, done: true},
    {id: 0, title: 'Физика', count: 0, popular: 4, done: true},
    {id: 0, title: 'Литература', count: 0, popular: 55, done: true},
    {id: 0, title: 'Самолет', count: 3, popular: 8, done: true},
    {id: 0, title: 'Аэропорт', count: 0, popular: 362, done: true},
    {id: 0, title: 'Искусство', count: 0, popular: 5, done: true},
    {id: 0, title: 'Театр', count: 0, popular: 9, done: true},
    {id: 0, title: 'Кинотеатр', count: 0, popular: 25, done: true},
    {id: 0, title: 'Парк', count: 0, popular: 36, done: true},
    {id: 0, title: 'Природа', count: 0, popular: 31, done: true},
    {id: 0, title: 'Еда', count: 0, popular: 74, done: true},
    {id: 0, title: 'Одежда', count: 0, popular: 83, done: true},
  ]

  let index = 0;
  let id = 0;
  themsAll.value = [];
  for (let i = 0; i < 50; i++) {
    sourceAll[index].id = id
    themsAll.value.push({...sourceAll[index]})
    id++
    index++
    if (index === sourceAll.length) {
      index = 0
    }
  }
}

function addThems(count) {
  const endCount = themsShow.value.length
  for (let i = themsShow.value.length; i < endCount + count; i++) {
    if (i < themsAll.value.length) {
      themsShow.value.push(themsAll.value[i]);
    }
  }
}

function addWords(count) {
  const endCount = wordShow.value.length
  for (let i = wordShow.value.length; i < endCount + count; i++) {

    if (i < wordsAll.value.length) {
      wordShow.value.push(wordsAll.value[i])
    }
  }
}

function openDialogNewWord() {
  isOpenDialogAddWords.value = true;
}

function closeDialogNewWord() {
  isOpenDialogAddWords.value = false;
}

function openDialogNewGroup() {
  isOpenDialogGroup.value = true;
}

function closeDialogNewGroup() {
  isOpenDialogGroup.value = false;
}


function showPage(tab) {
  wordShow.value = [];
  if (tab.id === 0) {
    GenerateWords()
    addWords(66)
    return
  }
  if (tab.id === 1) {
    GenerateDoneWords()
    addWords(66)
  }
}

function sortPage(tab) {
  if (tab.id === 0) {
    wordShow.value.sort(sortUPbyField('title'));
    return
  }
  if (tab.id === 1) {
    wordShow.value.sort(sortUPbyField('popular'));
  }
}

function showThemeDlg(them) {
  const words = [
    {id: 0, title: 'Shop'},
    {id: 1, title: 'Customer'},
    {id: 2, title: 'Store'},
    {id: 3, title: 'Cashier'},
    {id: 4, title: 'Salesperson'},
    {id: 5, title: 'Retail'},
    {id: 6, title: 'Discount'},
    {id: 7, title: 'Shopping'},
    {id: 8, title: 'Purchase'},
    {id: 9, title: 'Grocery'},
    {id: 10, title: 'Shopping cart'},
    {id: 11, title: 'Shelf'},
    {id: 12, title: 'Department'},
    {id: 13, title: 'Return'},
    {id: 14, title: 'Cash register'},
  ]
  wordslistdlg.value.show({group: them, words});
}
</script>

<style scoped lang="scss">
.words-2,
.words-3 {
  padding: 30px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .words-2__nav {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .wrapper-right-block {
      display: flex;
      align-items: center;

      .words-3__title {
        line-height: 40px;
        font-size: 20px;
        font-weight: 800;
        margin-bottom: 20px;
      }

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

  .words-2__next {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 100%;
    max-width: 400px;
    margin-top: 24px;
    padding: 5px;
    font-size: 20px;
    font-weight: 800;
    border-radius: 10px;
    background-color: var(--yellow);
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.2s;

    &:hover {
      background-color: var(--blue);
    }

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }
}

@media screen and (max-width: 1000px) {
  .words-2,
  .words-3 {
    padding: 30px 10px;

    .words-2__nav {
      .words-3__title {
      }
    }

    .words-2__next {
    }
  }
}
</style>
