<template>
  <div class="wrapper-word" :class="{'list-view': isShowWordsTypeList, 'block-view': !isShowWordsTypeList }">
    <div class="word">
      <div class="scene">
        <div class="cube" :class="{'show_translate': isShowTranslate}">
          <p class="side top" @click="toggleIsShowTranslate">{{ wordData?.translation }}</p>
          <p class="side front" @click="toggleIsShowTranslate">
            {{ wordData?.word }}
          </p>
        </div>
      </div>

      <p class="translate show-translate" v-if="isShowWordsTypeList">
        {{ wordData?.translation }}
      </p>
    </div>

    <div class="actions">
      <div class="translate" @click="toggleIsShowTranslate"
           v-if="!isShowWordsTypeList"
           :class="{'is_active-translate': isShowTranslate}">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path
              d="m480-80-40-120H160q-33 0-56.5-23.5T80-280v-520q0-33 23.5-56.5T160-880h240l35 120h365q35 0 57.5 22.5T880-680v520q0 33-22.5 56.5T800-80H480ZM286-376q69 0 113.5-44.5T444-536q0-8-.5-14.5T441-564H283v62h89q-8 28-30.5 43.5T287-443q-39 0-67-28t-28-69q0-41 28-69t67-28q18 0 34 6.5t29 19.5l49-47q-21-22-50.5-34T286-704q-67 0-114.5 47.5T124-540q0 69 47.5 116.5T286-376Zm268 20 22-21q-14-17-25.5-33T528-444l26 88Zm50-51q28-33 42.5-63t19.5-47H507l12 42h40q8 15 19 32.5t26 35.5Zm-84 287h280q18 0 29-11.5t11-28.5v-520q0-18-11-29t-29-11H447l47 162h79v-42h41v42h146v41h-51q-10 38-30 74t-47 67l109 107-29 29-108-108-36 37 32 111-80 80Z"/>
        </svg>
        <v-tooltip activator="parent" location="bottom">Перевести</v-tooltip>
      </div>

      <div class="volume" @click="playPronunciation">
        <img src="img/icon/bxs-volume-low.svg">
        <v-tooltip activator="parent" location="bottom">Озвучить</v-tooltip>
      </div>

      <div class="tasks">
        <img src="img/icon/bxs-extension.svg">
        <v-tooltip activator="parent" location="bottom">Задачи</v-tooltip>
      </div>

      <div class="help">
        <img src="img/icon/bxs-help-circle.svg">
        <v-tooltip activator="parent" location="bottom">an exciting or unexpected event or course of events</v-tooltip>
      </div>


      <div v-if="!wordData?.in_dictionary" class="add-word" @click="addWordToAccount()">
        <img src="img/dictionary/add.svg">
        <v-tooltip activator="parent" location="bottom">Добавить в аккаунт</v-tooltip>
      </div>

      <div v-if="wordData?.in_dictionary" class="delete-word" @click="deleteUserWord()">
        <img src="img/dictionary/trash.svg">
        <v-tooltip activator="parent" location="bottom">Удалить слово</v-tooltip>
      </div>

      <div class="learned" v-if="userWord?.training_count">
        <p ><img src="img/icon/lean.png">{{ userWord?.training_count }}</p>
        <v-tooltip activator="parent" location="bottom">Отработанно</v-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, toRefs, watch} from "vue";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {storeToRefs} from "pinia/dist/pinia";
import {dictionaryStore} from "@/store/dictionaryStore";

// eslint-disable-next-line no-undef
const props = defineProps({
  wordData: Object,
  userWord: Object
})
const {wordData, userWord} = toRefs(props);
const {addWordsToUserDictionary, requestToDeleteWord} = dictionaryRequests();
const dictionary = dictionaryStore();
// eslint-disable-next-line no-unused-vars
const {isSearching, isShowWordsTypeList} = storeToRefs(dictionary);

let isShowTranslate = ref(false);

onMounted(() => {
  console.log(wordData.value)
})

watch(isShowWordsTypeList, () => {
  isShowTranslate.value = false;
})

function toggleIsShowTranslate() {
  if (!isShowWordsTypeList.value) {
    isShowTranslate.value = !isShowTranslate.value;
  }
}

function addWordToAccount() {
  addWordsToUserDictionary(wordData.value.id);
}

function deleteUserWord() {
  requestToDeleteWord(wordData.value.id);
}

function playPronunciation() {
  if (wordData.value.pronunciations.us) {
    new Audio(wordData.value.pronunciations.us).play();
  } else if (wordData.value.pronunciations.uk) {
    new Audio(wordData.value.pronunciations.uk).play();
  }
}
</script>

<style lang="scss">
.wrapper-word {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  width: 23%;
  height: 275px;
  background-color: var(--pink);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 800;
  padding: 0 10px;
  margin-bottom: 20px;
  cursor: pointer;
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  overflow: hidden;

  p {
    width: 100px;
  }

  .word {
    font-size: 20px;
    color: var(--dark-pink);
    position: relative;

    .scene {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 150px;
      border-radius: 7px;

      .cube {
        width: 100%;
        cursor: pointer;
        transition: all 0.85s cubic-bezier(.15, .70, .15, 1);
        transform-style: preserve-3d;
        transform-origin: 100% 50%;
        height: 150px;
        border-radius: 10px;

        .side {
          width: 100%;
          height: 150px;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          border-radius: 5px;

          &.top {
            background: var(--purple);
            color: var(--light-yellow);
            transform: rotateX(90deg) translate3d(0, 0, 75px);
            border: 1px solid var(--dark);
            box-shadow: 1px 4px 1px var(--dark);
          }

          &.front {
            background-color: var(--light_pink);
            color: var(--dark);
            box-shadow: 1px 4px 1px var(--dark);
            border: 1px solid var(--dark);
            transform: translate3d(0, 0, 75px);
          }

          span {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            margin-left: 5px;
          }
        }
      }

      .show_translate {
        transform: rotateX(-90deg);
      }
    }

    .translate {
      height: 0;
      opacity: 0;
      border: 1px solid var(--yellow);
      border-radius: 5px;
      text-transform: uppercase;
    }
  }

  .actions {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    .translate,
    .volume,
    .tasks,
    .help,
    .add-word,
    .delete-word,
    .learned {
      display: flex;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      border-radius: 10px;
      padding: 7px;
      transition: all 0.2s;
      background-color: var(--dark-pink);

      img,
      svg {
        width: 20px;
        height: 20px;
        fill: var(--white);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(4px);
      }
    }

    .is_active-translate {
      background-color: var(--purple);

      svg {
        //fill: var(--blue);
      }
    }

    .learned {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-width: 40px;
      max-width: 55px;
      height: 40px;
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(2px);
      border: 2px solid var(--yellow);

      P {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 2px;
        color: var(--yellow);

        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}

.block-view {

  .word {
    .scene {


      .cube {

        .side {

          &.front {

          }
        }
      }
    }
  }

  animation-name: resizeBlock;
  animation-timing-function: ease-out;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.list-view {
  justify-content: space-between;
  padding: 10px 20px;
  width: 90%;
  height: unset;
  flex-direction: row;
  animation-name: resizeLine;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;

  .word {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 70%;

    .scene {
      height: 100%;

      .cube {
        height: 100%;
        transition: unset;

        .side {
          height: 100%;

          &.front {
            box-shadow: unset;
            border: 2px solid var(--dark-pink);
            background-color: var(--light-gray);
            color: var(--dark-pink);
          }
        }
      }
    }

    .show-translate {
      text-align: center;
      height: unset;
      width: 100%;
      padding: 10px;
      font-size: 15px;
      font-weight: 700;
      background-color: var(--dark-pink);
      border: 2px solid var(--light-gray);
      color: var(--light-gray);
      opacity: 1;
    }
  }

  .actions {
    gap: 20px;
    align-items: center;
  }
}

@keyframes resizeBlock {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes resizeLine {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.v-tooltip > .v-overlay__content {
  background-color: var(--yellow) !important;
  opacity: 0.8;
  color: var(--blue) !important;
  border-radius: 10px;
  border: 1px solid var(--dark);
}

@media screen and (max-width: 1350px) {
  .wrapper-word {
    width: 23%;
  }

  .list-view {
    width: 90%;

    .word {

      .scene {

        .cube {

          .side {

            &.front {

            }
          }
        }
      }

      .show-translate {

      }
    }

    .actions {

    }
  }
}

@media screen and (max-width: 1200px) {
  .wrapper-word {
    width: 32%;
  }

  .list-view {
    width: 100%;

    .word {

      .scene {

        .cube {

          .side {

            &.front {

            }
          }
        }
      }

      .show-translate {

      }
    }

    .actions {

    }
  }
}

@media screen and (max-width: 850px) {
  .wrapper-word {
    width: 49%;
  }

  .list-view {
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 20px;

    .word {
      width: 100%;

      .scene {

        .cube {

          .side {

            &.front {

            }
          }
        }
      }

      .show-translate {

      }
    }

    .actions {
      width: 210px
    }
  }
}

@media screen and (max-width: 550px) {
  .wrapper-word {
    width: 100%;
  }

  .list-view {

    .word {
      flex-direction: column;

      .scene {
        height: 45px;

        .cube {

          .side {

            &.front {

            }
          }
        }
      }

      .show-translate {

      }
    }

    .actions {

    }
  }
}
</style>
