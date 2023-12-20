<template>
  <div class="bg-base-light-violet price__upgrade">
    <h2 class="price__upgrade-title div-center">Обновление до PRO&nbsp;<img src="img/icon/bxs-crown1.svg"></h2>
    <p class="price__upgrade-descr">Получите неограниченный доступ ко всем разговорным курсам английского языка, а
      также к ИИ-симуляторам разговорной и письменной речи.
    </p>
    <h3 class="price__upgrade-title">Ваши преимущества</h3>
    <div class="price__upgrade-list">
      <div class="wrapper-left-block">
        <div class="price__upgrade-row" v-for="text in leftBlock" :key="text.id">
          <div class="wrapper-image"><img src="img/done.svg"></div>
          <p>{{ text }}</p>
        </div>
      </div>
      <div class="wrapper-right-block">
        <div class="price__upgrade-row" v-for="text in rightBlock" :key="text.id">
          <div class="wrapper-image"><img src="img/done.svg"></div>
          <p>{{ text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const leftBlock = [
  'Более 100 наборов тестов по устной и письменной речи',
  'Отзывы о вашем тесте IELTS и собеседовании',
  'Советы по перефразированию',
  'Индивидуальные тесты IELTS для устной и письменной речи'
];

const rightBlock = [
  'Наш специальный курс для подготовки к собеседованию',
  'Неограниченное количество тестов уровня CEFR',
  'Все курсы разговорной речи по всем темам',
  'Неограниченное использование анализатора речи'
];
</script>

<style scoped lang="scss">
.price__upgrade {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 60px 0;

  .price__upgrade-title {
    text-align: center;
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 20px;
  }

  .price__upgrade-descr {
    width: 70%;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 24px;
  }

  .price__upgrade-list {
    width: 100%;
    padding: 0 50px;
    display: flex;
    gap: 50px;

    .wrapper-left-block,
    .wrapper-right-block {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 50%;

      .price__upgrade-row {
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        padding: 10px;
        border: 1px solid var(--dark);
        background-color: var(--yellow);

        .wrapper-image {
          width: 24px;
          height: 24px;
          display: flex;
          border-radius: 50%;
          padding: 2px;
          background-color: #32c928;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .price__upgrade {

    .price__upgrade-title {

    }

    .price__upgrade-descr {
      width: 90%;
    }

    .price__upgrade-list {
      flex-direction: column;
      gap: 15px;
      padding: 0 30px;

      .wrapper-left-block,
      .wrapper-right-block {
        width: 100%;

        .price__upgrade-row {

          .wrapper-image {

          }
        }
      }
    }
  }
}
</style>
