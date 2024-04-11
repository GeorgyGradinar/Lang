<template>
  <div v-if="topPosition" ref="optionBlock" id="option-block" class="option-block"
       :style="{'top': `${top}px`, 'left': `${leftPosition}px`}">
    <template v-if="!isActiveSearching">
      <template v-if="foundWord">
        <div class="wrapper-option-word">
          <button class="add-word" @click="addWordsToUserDictionary(foundWord.id)">
            Добавить в аккаунт
          </button>
        </div>

        <div class="wrapper-translate">
          <p class="find-word">{{ foundWord?.word }}</p>
          -
          <p>{{ foundWord.translation }}</p>
        </div>

        <div class="transcriptions" v-if="foundWord?.pronunciations">
          <div class="uk">
            <p><img src="img/flugs/uk.svg" alt="flug"> {{ foundWord?.transcriptions?.uk }}</p>
            <button class="volume" @click="playPronunciation(foundWord?.pronunciations?.uk)">
              <img src="img/icon/bxs-volume-low-light.svg">
              <v-tooltip activator="parent" location="bottom">Озвучить</v-tooltip>
            </button>
          </div>

          <div class="line"></div>

          <div class="us">
            <p><img src="img/flugs/us.svg" alt="flug"> {{ foundWord?.transcriptions?.us }}</p>
            <button class="volume" @click="playPronunciation(foundWord?.pronunciations?.us)">
              <img src="img/icon/bxs-volume-low-light.svg">
              <v-tooltip activator="parent" location="bottom">Озвучить</v-tooltip>
            </button>
          </div>
        </div>
      </template>

      <p v-else class="cant-find">Слово не найдено</p>
    </template>
    <LoaderCircle v-else></LoaderCircle>
  </div>
</template>

<script setup>
import {ref, toRefs, watch} from "vue";
import LoaderCircle from "@/components/app/LoaderCircle";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {chatStore} from "@/store/chatStore";
import {storeToRefs} from "pinia/dist/pinia";

// eslint-disable-next-line no-undef
const props = defineProps({
  topPosition: Number,
  leftPosition: Number,
  word: String
})
const {topPosition, leftPosition, word} = toRefs(props);
const {searchFromAllWords, addWordsToUserDictionary} = dictionaryRequests();
const chat = chatStore();
const {changeSearchWord} = chat;
const {foundWord, isActiveSearching} = storeToRefs(chat);

let optionBlock = ref(null);
let top = ref(null);

watch(topPosition, () => {
  if (topPosition.value) {
    changeSearchWord(null);
    searchFromAllWords(word.value);
    top.value = topPosition.value - 90;
  }
})

watch(foundWord, () => {
  if (foundWord.value) {
    getTopPosition();
  }
})

function playPronunciation(url) {
  new Audio(url).play();
}

function getTopPosition() {
  setTimeout(() => {
    top.value = topPosition.value - optionBlock.value?.clientHeight - 20;
  })
}

// function getFirstTranslation(translations) {
//   return translations.split(',')[0]
// }
</script>

<style scoped lang="scss">
.option-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  background-color: var(--light-yellow);
  padding: 10px;
  border-radius: 10px;
  border: 2px solid var(--dark);
  transition: all 0.2s;

  p {
    font-size: 13px;
    font-weight: 700;
    color: var(--dark-pink);
  }

  .cant-find {
    font-size: 15px;
    font-weight: 800;
  }

  .wrapper-option-word {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;

    .add-word {
      display: flex;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      border-radius: 10px;
      padding: 5px;
      transition: all 0.2s;
      font-size: 12px;
      background-color: var(--dark-pink);
      color: var(--light-yellow);
      cursor: pointer;

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(4px);
      }

      &:hover {
        background-color: var(--pink);
      }
    }
  }

  .wrapper-translate {
    display: flex;
    gap: 5px;
    margin-top: 15px;

    p {
      color: var(--dark-pink);
      font-weight: 800;
      font-size: 18px;
    }
  }

  .transcriptions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 0;

    .uk,
    .us {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;

      p {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--dark-pink);

        img {
          width: 25px;
        }
      }

      button {
        display: flex;
        align-items: center;
        padding: 5px;
        border-radius: 10px;
        border: 2px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        background-color: var(--pink);
        transition: all 0.2s;

        img {
          width: 20px;
        }

        &:active {
          box-shadow: 0 0 1px var(--dark);
          transform: translateY(4px);
        }

        &:hover {
          background-color: var(--dark-pink);
        }
      }
    }

    .line {
      background-color: var(--dark-pink);
      width: 1px;
    }

    p {
      color: var(--light-green);
    }
  }
}
</style>
