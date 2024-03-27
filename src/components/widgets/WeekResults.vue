<template>
  <div class="wrapper-state-week">
    <div class="state-week">
      <div class="chart">
        <canvas ref="chart" v-if="isShowChart"></canvas>
      </div>
      <div class="state-week__statistic">
        <!--      <p>Задания на сегодня:&nbsp;&nbsp;<span class="bold">{{ success + errors }}/{{ total }}</span></p>-->
        <div class="statistic">
          <div class="wrapper__success">
            <img src="img/icon/check-done.svg">&nbsp;
            <p> Успешно:&nbsp;<span class="bold">{{ currentDayStatistic?.tasks?.count_succeeded_tasks }}</span></p>
          </div>
          <div class="wrapper__errors">
            <img src="img/icon/info.svg">&nbsp;
            С процессе:&nbsp;<span class="bold">{{ currentDayStatistic?.tasks?.count_processing_tasks }}</span>
          </div>
          <div class="wrapper__without-result">
            <img src="img/icon/close.svg">&nbsp;
            Не выполнено:&nbsp;<span class="bold">{{ currentDayStatistic?.tasks?.count_failed_tasks }}</span>
          </div>
        </div>
      </div>

      <div class="state-week__days">
        <div class="day"
             v-for="(item, index) in weekResults" :key="item.day"
        >
          <p>{{ item.day }}</p>
          <div
              class="results"
              :class="{'no': item.state === 'lock', 'now': index === currentIndex, 'cursor': item.state !== 'lock'}"
              @click="changeDay(index, item)"
          >
            <span v-if="item.total">{{ item.success + item.errors }}/{{ item.total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import {useWeekResult} from '@/store/weekResult';
import {storeToRefs} from "pinia/dist/pinia";
import {onMounted, ref, watch} from "vue";
import {statisticStore} from "@/store/statisticStore";
import dictionaryRequests from "@/mixins/requests/statisticRequests";

const weekResult = useWeekResult();
// eslint-disable-next-line no-unused-vars
const {changeIndex} = weekResult;
const {weekResults, currentIndex} = storeToRefs(weekResult);

const labelsT = ['Выполненно', 'С ошибками', 'Не выполненно'];

const {getMonthlyStatistic} = dictionaryRequests();
const statistic = statisticStore();
const {changeCurrentDayStatistic} = statistic;
const {monthStatistic, currentDayStatistic} = storeToRefs(statistic);

let chart = ref(null);

let success = ref(0);
let errors = ref(0);
let total = ref(0);
let currentDay = ref('Пн');
// eslint-disable-next-line no-unused-vars
let myChart;
let ctx;

let isShowChart = ref(true);

// let doughnutLabel = ref({
//   id: 'doughnutLabel',
//
//   // eslint-disable-next-line no-unused-vars
//   beforeDatasetsDraw(chart, args, options) {
//     // eslint-disable-next-line no-unused-vars
//     const {ctx, data} = chart;
//     ctx.save();
//
//     const x = chart.getDatasetMeta(0).data[0].x;
//     const y = chart.getDatasetMeta(0).data[0].y;
//     ctx.font = 'bold 15px sans-serif'
//     ctx.fillStyle = '#f45b49';
//     ctx.textAlign = 'center';
//     ctx.fillText(currentDay.value, x, y + 5)
//   }
// })

onMounted(() => {
  showResults();
  ctx = chart.value.getContext("2d");
  setDataToChart();
  getMonthlyStatistic(getCurrentDate());
})

watch(currentIndex, () => {
  showResults();
})

watch(monthStatistic, () => {
  console.log(monthStatistic.value)
})

watch(currentDayStatistic, () => {
  console.log()
})

function getCurrentDate() {
  let month = new Date().getMonth() + 1
  month = month < 10 ? `0${month}` : `${month}`;

  return `${new Date().getFullYear()}-${month}`;
}

let dataT = ref([1, 5, 4]);

function setDataToChart() {
  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labelsT,
      datasets: [
        {
          data: dataT.value,
          backgroundColor: [
            '#00c6ad',
            '#ffd073',
            '#d4fdf7',
          ],
          borderColor: [
            '#00c6ad',
            '#ffd073',
            '#d4fdf7',
          ],
          borderWidth: 1,
          borderRadius: 5,
          offset: 6,
        }],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false
        }
      },
    },
    plugins: [
      {
        id: 'doughnutLabel',

        // eslint-disable-next-line no-unused-vars
        beforeDatasetsDraw(chart, args, options) {
          // eslint-disable-next-line no-unused-vars
          const {ctx, data} = chart;
          ctx.save();
          const x = chart.getDatasetMeta(0).data[0].x;
          const y = chart.getDatasetMeta(0).data[0].y;
          ctx.font = 'bold 15px sans-serif'
          ctx.fillStyle = '#fef7f1';
          ctx.textAlign = 'center';
          ctx.fillText(currentDay.value, x, y + 5)
        }
      }
    ]
  });
}

function showResults() {
  success.value = weekResults.value[currentIndex.value].success;
  errors.value = weekResults.value[currentIndex.value].errors;
  total.value = weekResults.value[currentIndex.value].total;
}

let toggle = ref(false);

function changeDay(index, data) {
  console.log(index)
  console.log(data)
  if (toggle.value) {
    changeCurrentDayStatistic(27)
    myChart.data.datasets[0].data = [2, 5, 3]
    myChart.update();
  } else {
    changeCurrentDayStatistic(26)
    myChart.data.datasets[0].data = [3, 1, 6]
    myChart.update();
  }

  toggle.value = !toggle.value

  // if (weekResults.value[index].state !== 'lock') {
  //   changeIndex(index);
  //   currentDay.value = data.day;
  //   // dataT.value[1] = 10
  //   // myChart.value.data.datasets[0].data = [data.success, data.errors, data.total - (data.success + data.errors)]
  //   // myChart.value.draw();
  //
  //   dataT.value = [data.success, data.errors, data.total - (data.success + data.errors)];
  // }
}
</script>

<style lang="scss">
.wrapper-state-week {
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: var(--pink);

  .state-week {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    height: 100px;

    .chart {
      width: 80px;
      height: 80px;

      canvas {
        max-height: 250px;
      }
    }

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

        p {
          font-size: 15px;
        }
      }

      .results {
        width: 45px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 900;
        margin-top: 4px;
        background-color: var(--white);
        color: var(--dark-pink);
        border-radius: 8px;
        border: 2px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        transition: all 0.2s;
        cursor: pointer;

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

