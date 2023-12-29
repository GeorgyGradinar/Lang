<template>
  <div class="word__list__view" :class="{'popup_style': isPopup}">
    <div class="wrapper-list" :class="{'two_columns': columns === 2,'three_columns': columns === 3}"
         v-for="word in words" :key="word.id">
      <WordComponent :word="word"></WordComponent>
    </div>
  </div>
</template>

<script setup>
import WordComponent from "@/components/widgets/WordComponent";

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  words: Array,
  columns: Number,
  isPopup: Boolean
});
</script>

<style scoped lang="scss">

.word__list__view {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;

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
