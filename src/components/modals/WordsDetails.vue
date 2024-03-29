<template>
  <v-dialog
      v-model="isOpenDialog"
      width="auto"
  >
    <v-card :class="'rounded-lg'">
      <div class="details-word-dialog">
        <div class="header-modal">
          <p class="word">test</p>
          <div class="add-word">
            <img src="img/dictionary/add.svg">
            <v-tooltip activator="parent" location="bottom">Добавить в аккаунт</v-tooltip>
          </div>
        </div>

        <div class="translate">
          <p>Перевод </p>
          <p>тест, испытание, проверка, критерий, проба, опыт</p>
        </div>

        <div class="wrapper-transcriptions">
          <p>Транскрипция:</p>
          <div class="transcriptions">
            <div class="uk">
              <p><img src="img/flugs/uk.svg" alt=""> |'nika|</p>
              <button class="volume" @click="playPronunciation">
                <img src="img/icon/bxs-volume-low-light.svg">
                <v-tooltip activator="parent" location="bottom">Озвучить</v-tooltip>
              </button>
            </div>

            <div class="us">
              <p><img src="img/flugs/us.svg" alt=""> |'nika|</p>
              <button class="volume" @click="playPronunciation">
                <img src="img/icon/bxs-volume-low-light.svg">
                <v-tooltip activator="parent" location="bottom">Озвучить</v-tooltip>
              </button>
            </div>
          </div>
        </div>

        <div class="examples">
          <p>Примеры:</p>
          <p>I wanted to savor every moment</p>
        </div>

        <div class="wrapper-similar-words">
          <p>Похожие слова:</p>

          <div class="similar-words">
            <p>trial</p>
            <p>experience</p>
            <p>have</p>
            <p>possess</p>
            <p>enjoy</p>
            <p>relish</p>
            <p>savor</p>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {onMounted, ref} from "vue";

let isOpenDialog = ref(true);

onMounted(() => {

})

function playPronunciation() {
  // if (wordData.value.pronunciations.us) {
  //   new Audio(wordData.value.pronunciations.us).play();
  // } else if (wordData.value.pronunciations.uk) {
  //   new Audio(wordData.value.pronunciations.uk).play();
  // }
}
</script>

<style scoped lang="scss">

:deep(.v-card) {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none !important;
}

.details-word-dialog {
  background-color: var(--dark-pink);
  padding: 20px;
  border-radius: 20px;
  border: 2px solid var(--dark);
  max-width: 430px;

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
      background-color: var(--pink);
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
        background-color: var(--dark-pink);
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

        p {
          display: flex;
          align-items: center;
          gap: 10px;

          img{
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

          img {
            width: 20px;
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

    p {
      color: var(--light-green);

      &:first-child {
        color: var(--yellow);
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

      p {
        color: var(--light-green);
      }
    }
  }
}
</style>
