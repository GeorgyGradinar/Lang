<template>
  <div class="wrapper-state-week">
    <div class="state-week">
      <div class="chart">
        <canvas ref="chart" v-if="isShowChart"></canvas>
      </div>
      <div class="state-week__statistic">
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
        <div class="day" v-for="(item, index) in weeklyStatistic" :key="item.day">
          <p>{{ weeksDay[index] }}</p>
          <div class="results"
               :class="{'no': item.state === 'lock', 'now': currentDayStatistic?.date === item.date, 'cursor': item.state !== 'lock'}"
               @click="changeDay(index, item)">
            <span v-if="item?.tasks?.count_all_tasks">
              {{ item?.tasks?.count_succeeded_tasks }}/{{ item.tasks?.count_all_tasks }}
            </span>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import {storeToRefs} from "pinia/dist/pinia";
import {onMounted, ref, watch} from "vue";
import {statisticStore} from "@/store/statisticStore";
import dictionaryRequests from "@/mixins/requests/statisticRequests";

const labelsT = ['Выполненно', 'С ошибками', 'Не выполненно'];
const weeksDay = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const {getWeeklyStatistic} = dictionaryRequests();
const statistic = statisticStore();
const {changeCurrentDayStatistic} = statistic;
const {currentDayStatistic, weeklyStatistic} = storeToRefs(statistic);

let chart = ref(null);

let currentDay = ref(weeksDay[0]);
let myChart;
let ctx;

let isShowChart = ref(true);

onMounted(() => {
  getWeeklyStatistic();
  ctx = chart.value.getContext("2d");
  setDataToChart();
})

watch(weeklyStatistic, () => {
})

watch(currentDayStatistic, () => {
  if (currentDayStatistic.value) {
    changeDataForChat(currentDayStatistic.value);
  }
})

function setDataToChart() {
  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labelsT,
      datasets: [
        {
          data: [0, 0, 0],
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
        beforeDatasetsDraw(chart) {
          const {ctx} = chart;
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

function changeDay(index, data) {
  changeCurrentDayStatistic(weeklyStatistic.value, new Date(data.date).getDate())
}

function changeDataForChat(data) {
  const success = data?.tasks?.count_succeeded_tasks;
  const processing = data?.tasks?.count_processing_tasks;
  const fail = data?.tasks?.count_failed_tasks;
  myChart.data.datasets[0].data = [success, processing, fail];
  currentDay.value = weeksDay[new Date(data.date).getDay() - 1];
  myChart.update();
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

