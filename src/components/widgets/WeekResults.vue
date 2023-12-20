<template>
  <div class="state-week">
    <div class="state-week__statistic">
      <p>Задания на сегодня:&nbsp;&nbsp;<span class="bold">{{ success + errors }}/{{ total }}</span></p>
      <div class="statistic">
        <div class="wrapper__success">
          <img src="img/icon/bxs-check-circle.png">&nbsp;
          Успешно:&nbsp;<span class="bold">{{ success }}</span>
        </div>
        <div class="wrapper__errors">
          <img src="img/icon/bxs-error-circle.png">&nbsp;
          С ошибками:&nbsp;<span class="bold">{{ errors }}</span>
        </div>
      </div>
    </div>
    <div class="state-week__days">
      <div class="day"
           v-for="(item, index) in weekResults" :key="item.day"
      >
        <div>{{ item.day }} {{ index + 1 }}</div>
        <div
            class="results"
            :class="{'no': item.state === 'lock', 'now': index === currentIndex, 'cursor': item.state !== 'lock'}"
            @click="changeDay(index)"
        >
          <span v-if="item.total">{{ item.success + item.errors }}/{{ item.total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useWeekResult} from '@/store/weekResult';
import {storeToRefs} from "pinia/dist/pinia";
import {onMounted, ref, watch} from "vue";

const weekResult = useWeekResult();
const {changeIndex} = weekResult;
const {weekResults, currentIndex} = storeToRefs(weekResult);

let success = ref(0);
let errors = ref(0);
let total = ref(0);

onMounted(() => {
  showResults();
})

watch(currentIndex, () => {
  showResults();
})

function showResults() {
  success.value = weekResults.value[currentIndex.value].success;
  errors.value = weekResults.value[currentIndex.value].errors;
  total.value = weekResults.value[currentIndex.value].total;
}

function changeDay(index) {
  if (weekResults.value[index].state !== 'lock') {
    changeIndex(index);
  }
}
</script>

<style lang="scss">
.state-week {
  height: 90px;
  display: flex;
  justify-content: space-around;
  background-color: var(--pink);

  .state-week__statistic {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 300px;
    height: 100%;
    font-size: 15px;
    font-weight: 600;

    p {
      width: 100%;
      text-align: start;

      span {
        letter-spacing: 2px;
      }
    }

    .bold {
      width: 20px;
      font-weight: 900;
    }

    .statistic {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .wrapper__success,
      .wrapper__errors {
        display: flex;
        align-items: center;
      }
    }
  }

  .state-week__days {
    width: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    text-align: center;

    .day {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 100%;
      font-size: 12px;
      font-weight: 700;
    }

    .results {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 900;
      margin-top: 8px;
      background-color: #4f3dca;
      border-radius: 8px;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      transition: all 0.2s;

      &:hover {
        color: var(--yellow);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }

      &.now {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }

      &.no {

      }
    }
  }

}

@media screen and (max-width: 800px) {
  .state-week {
    height: unset;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    gap: 25px;

    .state-week__statistic {
      height: unset;

      p {
        text-align: center;
        span {

        }
      }

      .bold {

      }

      .statistic {

        .wrapper__success,
        .wrapper__errors {

        }
      }
    }

    .state-week__days {


      .day {

      }

      .results {


        &:hover {

        }

        &:active {

        }

        &.now {

        }

        &.no {

        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .state-week {
    padding: 20px;

    .state-week__statistic {

      p {

        span {

        }
      }

      .bold {

      }

      .statistic {

        .wrapper__success,
        .wrapper__errors {

        }
      }
    }

    .state-week__days {
      width: 100%;
      max-width: 450px;
      flex-wrap: wrap;
      justify-self: flex-start;

      .day {

      }

      .results {


        &:hover {

        }

        &:active {

        }

        &.now {

        }

        &.no {

        }
      }
    }
  }
}
</style>

