<template>
  <div class="word__list__view" :class="{'popup_style': isPopup}">
    <div class="wrapper-list" :class="{'two_columns': columns === 2,'three_columns': columns === 3}"
         v-for="word in words" :key="word.id">
      <div class="sound" @click="play(word)">
        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M4.66659 19.8333H7.81309L16.3333 25.5126V2.4873L7.81309 8.16664H4.66659C3.37975 8.16664 2.33325 9.21314 2.33325 10.5V17.5C2.33325 18.7868 3.37975 19.8333 4.66659 19.8333ZM18.6666 8.16664V19.8333C20.0958 18.55 20.9999 16.0661 20.9999 14C20.9999 11.9338 20.0958 9.44997 18.6666 8.16664Z"/>
        </svg>
      </div>
      <div class="question " :title="word.hint">
        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M13.9999 2.3335C7.56692 2.3335 2.33325 7.56716 2.33325 14.0002C2.33325 20.4332 7.56692 25.6668 13.9999 25.6668C20.4329 25.6668 25.6666 20.4332 25.6666 14.0002C25.6666 7.56716 20.4329 2.3335 13.9999 2.3335ZM15.1666 21.0002H12.8333V18.6668H15.1666V21.0002ZM16.3053 15.301C16.0766 15.4853 15.8561 15.6615 15.6811 15.8365C15.2051 16.3113 15.1678 16.743 15.1666 16.7617V16.9168H12.8333V16.722C12.8333 16.5843 12.8671 15.3488 14.0303 14.1857C14.2578 13.9582 14.5401 13.7272 14.8364 13.4868C15.6928 12.7927 16.2551 12.2863 16.2551 11.5887C16.2415 10.9993 15.9978 10.4386 15.5762 10.0266C15.1545 9.61465 14.5883 9.38406 13.9988 9.38421C13.4092 9.38437 12.8432 9.61524 12.4217 10.0275C12.0002 10.4397 11.7568 11.0004 11.7436 11.5898H9.41025C9.41025 9.05933 11.4694 7.00016 13.9999 7.00016C16.5304 7.00016 18.5896 9.05933 18.5896 11.5898C18.5896 13.453 17.2141 14.5648 16.3053 15.301Z"/>
        </svg>
      </div>
      <p>{{ word.title }}</p>
      <div class="puzzle " @click="$router.push(word.path)">
        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M22.1667 11.6668V8.16683C22.1667 6.88 21.1202 5.8335 19.8333 5.8335H16.3333C16.3333 3.90383 14.763 2.3335 12.8333 2.3335C10.9037 2.3335 9.33333 3.90383 9.33333 5.8335H5.83333C4.5465 5.8335 3.5 6.88 3.5 8.16683V12.8335H4.66667C5.28551 12.8335 5.879 13.0793 6.31658 13.5169C6.75417 13.9545 7 14.548 7 15.1668C7 15.7857 6.75417 16.3792 6.31658 16.8167C5.879 17.2543 5.28551 17.5002 4.66667 17.5002H3.5V22.1668C3.5 23.4537 4.5465 24.5002 5.83333 24.5002H10.5V23.3335C10.5 22.7147 10.7458 22.1212 11.1834 21.6836C11.621 21.246 12.2145 21.0002 12.8333 21.0002C13.4522 21.0002 14.0457 21.246 14.4832 21.6836C14.9208 22.1212 15.1667 22.7147 15.1667 23.3335V24.5002H19.8333C21.1202 24.5002 22.1667 23.4537 22.1667 22.1668V18.6668C24.0963 18.6668 25.6667 17.0965 25.6667 15.1668C25.6667 13.2372 24.0963 11.6668 22.1667 11.6668Z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  words: Array,
  columns: Number,
  isPopup: Boolean
});

function play(word) {
  const myAudio = new Audio(word.sound);
  myAudio.play();
}
</script>

<style scoped lang="scss">

.word__list__view {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;

  .wrapper-list {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;

    p {
      color: var(--yellow);
    }

    .sound,
    .question,
    .puzzle {
      display: flex;
      fill: var(--white);
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        fill: var(--yellow);
        transform: scale(0.9);
      }
    }
  }

  .two_columns {
    width: 50%
  }

  .three_columns {
    width: 33%
  }
}

@media screen and (max-width: 900px) {
  .word__list__view.popup_style {
    flex-wrap: unset;
    flex-direction: column;
    align-items: center;

    .two_columns,
    .three_columns {
      width: unset;
    }
  }
}

@media screen and (max-width: 500px) {
  .word__list__view {
    flex-wrap: unset;
    flex-direction: column;
    align-items: center;

    .wrapper-list {


      p {
        font-size: 15px;
      }

      .sound,
      .question,
      .puzzle {

        &:hover {

        }
      }
    }

    .two_columns,
    .three_columns {
      width: unset;
    }
  }
}
</style>
