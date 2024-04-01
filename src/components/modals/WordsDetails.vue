<template>
  <v-dialog
      v-model="isOpenDialog"
      width="auto"
  >
    <v-card :class="'rounded-lg'">
      <div class="details-word-dialog">
        <div class="header-modal">
          <p class="word">{{ word?.word }}</p>

          <button class="add-word" v-if="!word?.in_dictionary" @click="addWord">
            Добавить в словарь
          </button>

          <button class="add-word added" v-else>
            Добавлено
          </button>
        </div>

        <div class="translate">
          <p>Перевод </p>
          <p>{{ word?.translation }}</p>
        </div>

        <div class="wrapper-transcriptions">
          <p>Транскрипция:</p>
          <div class="transcriptions">
            <div class="uk">
              <p><img src="img/flugs/uk.svg" alt=""> {{ word?.transcriptions?.uk }}</p>
              <button class="volume" @click="playPronunciation(word?.pronunciations?.uk)">
                <img src="img/icon/bxs-volume-low-light.svg">
                <v-tooltip activator="parent" location="bottom">Озвучить</v-tooltip>
              </button>
            </div>

            <div class="us">
              <p><img src="img/flugs/us.svg" alt=""> {{ word?.transcriptions?.us }}</p>
              <button class="volume" @click="playPronunciation(word?.pronunciations?.us)">
                <img src="img/icon/bxs-volume-low-light.svg">
                <v-tooltip activator="parent" location="bottom">Озвучить</v-tooltip>
              </button>
            </div>
          </div>
        </div>

        <div class="examples" v-if="word?.examples">
          <p class="examples__title">Примеры:</p>
          <div class="example" v-for="example in getPartOrAllListExamples()" :key="example.id">
            <p>{{ example.en }}</p>
            <p>{{ example.ru }}</p>
          </div>
          <button @click="toggleIsShowAllExamples">{{ textForButtonMoreExamples }}</button>
        </div>

        <div class="wrapper-similar-words" v-if="word?.similar_words">
          <p>Похожие слова:</p>

          <div class="similar-words">
            <button v-for="similar in word?.similar_words" :key="similar.key">
              {{ similar.word }}
              <v-tooltip activator="parent" location="bottom">{{ similar.translation }}</v-tooltip>
            </button>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref, toRefs, watch} from "vue";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";

const {addWordsToUserDictionary} = dictionaryRequests();
// eslint-disable-next-line no-undef
const props = defineProps({
  word: Object
})
const {word} = toRefs(props);
// eslint-disable-next-line
const emit = defineEmits(['hiddenBlock']);
const SHOW_MORE_EXAMPLES = 'Показать все примеры';
const HIDDEN_EXAMPLES = 'Скрыть примеры';

let isOpenDialog = ref(true);
let isShowAllExamples = ref(false);

let textForButtonMoreExamples = ref(SHOW_MORE_EXAMPLES);

watch(isOpenDialog, () => {
  if (!isOpenDialog.value) emit('hiddenBlock', false);
})

function playPronunciation(url) {
  new Audio(url).play();
}

function toggleIsShowAllExamples() {
  isShowAllExamples.value = !isShowAllExamples.value;

  textForButtonMoreExamples.value = !isShowAllExamples.value ? SHOW_MORE_EXAMPLES : HIDDEN_EXAMPLES;
}

function addWord() {
  addWordsToUserDictionary(word.value.id);
}

function getPartOrAllListExamples() {
  if (isShowAllExamples.value || !word.value.examples) {
    return word.value.examples;
  } else {
    return word.value.examples.slice(0, 2);
  }
}
</script>

<style scoped lang="scss">

:deep(.v-card) {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none !important;
}

:deep(.v-overlay__content) {
  max-height: unset !important;
}

.details-word-dialog {
  background-color: var(--dark-pink);
  padding: 20px;
  border-radius: 20px;
  border: 2px solid var(--dark);
  width: 100%;
  max-width: 700px;
  max-height: 65vh;
  overflow: auto;

  .header-modal {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .word {
      color: var(--yellow);
      font-size: 30px;
      font-weight: 700;
    }

    .add-word {
      display: flex;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      border-radius: 10px;
      padding: 7px;
      transition: all 0.2s;
      font-size: 14px;
      font-weight: 700;
      color: var(--dark-pink);
      background-color: var(--yellow);
      cursor: pointer;

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

      &:hover {
        color: var(--light-gray);
        background-color: var(--dark-pink);
      }
    }

    .added {
      color: var(--dark-pink);
      background-color: var(--green);
      box-shadow: unset;

      &:hover {
        color: var(--dark-pink);
        background-color: var(--green);
      }

      &:active {
        box-shadow: unset;
        transform: unset;
      }
    }
  }

  .translate {
    margin: 20px 0;

    p {
      color: var(--light-green);

      &:first-child {
        color: var(--yellow);
      }
    }
  }

  .wrapper-transcriptions {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    padding: 15px 0;
    border-top: 1px solid var(--pink);
    border-bottom: 1px solid var(--pink);

    p {
      color: var(--yellow);
    }

    .transcriptions {
      display: flex;
      flex-direction: column;
      gap: 10px;

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

      p {
        color: var(--light-green);
      }
    }
  }

  .examples {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--pink);

    &__title {
      color: var(--yellow);
    }

    .example {
      margin-top: 7px;
      padding-top: 7px;
      border-top: 1px solid rgba(255, 208, 115, 0.6);

      p {
        color: var(--light-green);

        &:last-of-type {
          color: var(--light_pink);
        }
      }

      &:last-of-type {
        margin-bottom: 7px;
        padding-bottom: 7px;
        border-bottom: 1px solid rgba(255, 208, 115, 0.6);
      }
    }

    button {
      padding: 5px;
      border-radius: 10px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      background-color: var(--pink);
      color: var(--light-green);
      transition: all 0.2s;

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(4px);
      }

      &:hover {
        background-color: var(--dark-pink);
      }
    }
  }

  .wrapper-similar-words {

    p {
      color: var(--yellow);
    }

    .similar-words {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 5px;

      button {
        color: var(--light-green);
        padding: 5px;
        border-radius: 10px;
        border: 2px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        background-color: var(--pink);
        transition: all 0.2s;

        &:active {
          box-shadow: 0 0 1px var(--dark);
          transform: translateY(4px);
        }

        &:hover {
          background-color: var(--dark-pink);
        }
      }
    }
  }
}
</style>
