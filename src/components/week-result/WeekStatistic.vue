<template>
  <div class="state-week__statistic">
    <div class="statistic">
      <div class="wrapper__success">
        <img src="img/icon/check-done.svg">&nbsp;
        <p class="title"> Успешно:</p>
        <p class="bold">{{ currentDay?.tasks?.count_succeeded_tasks }}</p>
      </div>
      <div class="wrapper__errors">
        <img src="img/icon/info.svg">&nbsp;
        <p class="title">С процессе:</p>
        <p class="bold">{{ currentDay?.tasks?.count_processing_tasks }}</p>
      </div>
      <div class="wrapper__without-result">
        <img src="img/icon/close.svg">&nbsp;
        <p class="title">Не выполнено:</p>
        <p class="bold">{{ currentDay?.tasks?.count_failed_tasks }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {toRefs} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  currentDay: Object
})
const {currentDay} = toRefs(props);
</script>

<style scoped lang="scss">
.state-week__statistic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
  font-size: 15px;
  font-weight: 600;

  p {
    display: flex;
    width: 100%;
    text-align: start;

    span {
      letter-spacing: 2px;
    }
  }

  .bold {
    display: block;
    width: 20px;
    font-weight: 900;
  }

  .statistic {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 5px;

    .wrapper__success,
    .wrapper__errors,
    .wrapper__without-result {
      display: flex;
      align-items: center;
      color: var(--green);

      img {
        width: 30px;
        height: 30px;
      }
    }

    .wrapper__errors {
      color: var(--yellow);
    }

    .wrapper__without-result {
      color: var(--light-green);
    }
  }
}

@media screen and (min-width: 2200px) {
  .state-week__statistic {
    font-size: 15px;

    p {
      font-size: 25px;

      span {
        letter-spacing: 2px;
      }
    }

    .bold {
      width: 20px;
    }

    .statistic {
      gap: 25px;

      .wrapper__success,
      .wrapper__errors,
      .wrapper__without-result {

        img {
          width: 45px;
          height: 45px;
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .state-week__statistic {
    font-size: 15px;

    p {

      span {
      }
    }

    .bold {

    }

    .statistic {

      .wrapper__success,
      .wrapper__errors,
      .wrapper__without-result {

        img {
          width: 26px;
          height: 26px;
        }

        p {
          font-size: 12px;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .state-week__statistic {

    p {

      span {
      }
    }

    .title {
      display: none;
    }

    .bold {

    }

    .statistic {

      .wrapper__success,
      .wrapper__errors,
      .wrapper__without-result {

        img {

        }

        p {
        }
      }
    }
  }
}
</style>
