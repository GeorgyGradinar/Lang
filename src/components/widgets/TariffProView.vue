<template>
  <div class="price__upgrade">
    <h2 class="price__upgrade-title ">Обновление до PRO&nbsp;<img src="img/icon/bxs-crown1.svg"></h2>
    <p class="price__upgrade-descr">Получите неограниченный доступ ко всем разговорным курсам английского языка, а
      также к ИИ-симуляторам разговорной и письменной речи.
    </p>
    <h3 class="advantages-title">Ваши преимущества</h3>
    <div class="price__upgrade-list">
      <img class="look-robot animate__animated animate__bounceInLeft animate__delay-1s"
           src="img/robots/робот-02.png" alt="robot">
      <div class="advantages-block animate__animated animate__bounceInUp">
        <div class="advantage" v-for="text in leftBlock" :key="text.id">
          <img src="img/done.svg">
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
  'Индивидуальные тесты IELTS для устной и письменной речи',
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
  color: var(--dark);

  .price__upgrade-title {
    display: flex;
    align-items: center;
    font-size: 35px;
    font-weight: 900;
    margin-bottom: 40px;

    img {
      width: 35px;
      height: 35px;
    }
  }

  .price__upgrade-descr {
    width: 70%;
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 80px;
  }

  .advantages-title {
    text-align: center;
    font-size: 28px;
    font-weight: 900;
    margin-bottom: 30px;
  }

  .price__upgrade-list {
    position: relative;
    width: 100%;
    padding: 0 50px;
    display: flex;
    justify-content: center;
    gap: 50px;

    .look-robot {
      position: absolute;
      bottom: 70px;
      left: 0;
      width: 200px;
    }

    .advantages-block {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 70%;
      padding: 30px;
      border-radius: 10px;
      color: var(--light-yellow);
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      background-color: var(--dark-pink);

      .advantage {
        width: 46%;
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 10px 20px 10px;
        margin-bottom: 10px;
        border-bottom: 2px solid rgba(255, 244, 204, 0.3);

        img {
          width: 30px;
        }

        &:last-child {
          border-bottom: unset;
          padding: 10px;
          margin-bottom: unset;
        }

        &:nth-child(7) {
          border-bottom: unset;
          padding: 10px;
          margin-bottom: unset;
        }
      }
    }
  }
}

@media screen and (max-width: 1300px) {
  .price__upgrade {

    .price__upgrade-title {

      img {

      }
    }

    .price__upgrade-descr {

    }

    .advantages-title {

    }

    .price__upgrade-list {

      .look-robot {
        width: 130px;

      }

      .advantages-block {
        width: 85%;

        .advantage {

          img {

          }

          &:last-child {

          }

          &:nth-child(7) {

          }
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .price__upgrade {

    .price__upgrade-title {

      img {

      }
    }

    .price__upgrade-descr {

    }

    .advantages-title {

    }

    .price__upgrade-list {
      padding:  0 25px;

      .look-robot {
        display: none;

      }

      .advantages-block {
        width: 100%;

        .advantage {

          img {

          }

          &:last-child {

          }

          &:nth-child(7) {

          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .price__upgrade {

    .price__upgrade-title {
      font-size: 27px;

      img {

      }
    }

    .price__upgrade-descr {
      width: 85%;
    }

    .advantages-title {

    }

    .price__upgrade-list {

      .look-robot {

      }

      .advantages-block {
        padding: 15px;

        .advantage {
          width: 100%;
          padding: 15px 5px;

          img {

          }

          &:last-child {
            border-bottom: 2px solid rgba(255, 244, 204, 0.3);
            margin-bottom: 10px;
          }

          &:nth-child(7) {
            border-bottom: 2px solid rgba(255, 244, 204, 0.3);
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
