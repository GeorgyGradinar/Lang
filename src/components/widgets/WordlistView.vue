<template>
  <div class="word__list__view" :class="{'popup_style': isPopup}">
    <div class="wrapper-list" :class="{'two_columns': columns === 2,'three_columns': columns === 3}"
         v-for="word in cutObjectWords(words)" :key="word.id">
      <WordComponent :word="getWordData(word)"></WordComponent>
    </div>
  </div>
</template>

<script setup>
import WordComponent from "@/components/widgets/WordComponent";
import {toRefs} from "vue";

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  words: Array,
  columns: Number,
  isPopup: Boolean
});
const {words, isPopup} = toRefs(props);

function cutObjectWords(allWords) {
  if (isPopup.value) {
    return allWords;
  } else {
    return JSON.parse(JSON.stringify(allWords)).splice(0, 10);
  }
}

function getWordData(word) {
  if (isPopup.value) {
    return word;
  } else {
    return word.word;
  }
}
</script>

<style scoped lang="scss">

.word__list__view {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;
  align-items: flex-start;
  margin: 10px 0;

  .wrapper-list {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;

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
