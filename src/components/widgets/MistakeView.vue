<template>
  <div class="mistakes__list-wrap">
    <div class="mistakes__list-row">
      <div class="mistake__title"
           v-for="item in mistakes.title" :key="item"
           :class="{ 'w60' : item.w === 60, 'w50' : item.w === 50}"
      >
        {{ item.text }}
      </div>
    </div>
    <div class="mistakes__list-row"
         v-for="row in mistakes.rows" :key="row"
    >
      <div class="mistake__item"
           v-for="item in row" :key="item"
           :class="{ 'w60' : item.w === 60, 'w50' : item.w === 50}"
           v-html="item.text"
      >
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  mistakes: Object
});
</script>

<style scoped lang="scss">
.mistakes__list-wrap {
  height: 100%;

  .mistakes__list-row {
    display: flex;
    gap: 30px;

    .mistake__title {
      text-align: center;
      font-weight: 700;
      padding-bottom: 30px;
      width: 33%
    }

    .mistake__title.w50 {
      width: 50%
    }

    .mistake__title.w60 {
      width: 60%
    }
  }

  .mistake__item {
    border-radius: 10px;
    background-color: var(--yellow);
    color: var(--dark);
    padding: 20px;
    margin-bottom: 30px;
    width: 33%;
    border: 1px solid var(--dark);
    //box-shadow: 1px 4px 1px var(--dark);
  }

  .mistake__item.w60 {
    width: 60%
  }

  .mistake__item.w50 {
    width: 50%
  }

  .mistake__item.w40 {
    width: 40%
  }
}

@media screen and (max-width: 700px) {
  .mistakes__list-wrap {

    .mistakes__list-row {
      gap: 10px;

      .mistake__title {
        font-size: 12px;
      }

      .mistake__title.w50 {

      }

      .mistake__title.w60 {

      }
    }

    .mistake__item {
      margin-bottom: 10px;
      font-size: 10px;
      padding: 7px;
    }

    .mistake__item.w60 {

    }

    .mistake__item.w50 {

    }

    .mistake__item.w40 {

    }
  }
}
</style>
