<template>
  <div class="wrapper-state-week">
    <div class="state-week">
      <div class="chart">
        <canvas ref="chart" v-if="isShowChart"></canvas>
      </div>
      <WeekStatistic :currentDay="currentDayStatistic"></WeekStatistic>
      <WeekDay @changeDay="changeDay"></WeekDay>
      <RemaindersBlock></RemaindersBlock>
    </div>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import {storeToRefs} from "pinia/dist/pinia";
import {onMounted, onUnmounted, ref, watch} from "vue";
import {statisticStore} from "@/store/statisticStore";
import dictionaryRequests from "@/mixins/requests/statisticRequests";
import WeekStatistic from "@/components/week-result/WeekStatistic";
import WeekDay from "@/components/week-result/WeekDay";
import RemaindersBlock from "@/components/week-result/RemaindersBlock";

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

  const dataChat = currentDayStatistic.value ? getDataChart(currentDayStatistic.value) : [0, 0, 0];
  setDataToChart(dataChat);
})

watch(currentDayStatistic, () => {
  if (currentDayStatistic.value) {
    changeDataForChat(currentDayStatistic.value);
  }
})

function setDataToChart(setData) {
  myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labelsT,
      datasets: [
        {
          data: setData,
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
  if (Object.keys(data).length) {
    changeCurrentDayStatistic(weeklyStatistic.value, new Date(data.date).getDate())
  }
}

function changeDataForChat(data) {
  myChart.data.datasets[0].data = getDataChart(data);
  currentDay.value = weeksDay[new Date(data.date).getDay() - 1];
  myChart.update();
}

function getDataChart(data) {
  const success = data?.tasks?.count_succeeded_tasks;
  const processing = data?.tasks?.count_processing_tasks;
  const fail = data?.tasks?.count_failed_tasks;
  return [success, processing, fail];
}

onUnmounted(() => {
  myChart.clear();
})
</script>

<style lang="scss">

.info-remainders.v-tooltip > .v-overlay__content {
  background-color: var(--dark-pink) !important;
  opacity: 0.95;
  color: var(--light-yellow) !important;
  border-radius: 10px;
  border: 1px solid var(--dark);
  padding: 5px;
}


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
    margin: 0 30px;

    .chart {
      width: 80px;
      height: 80px;

      canvas {
        max-height: 250px;
      }
    }
  }
}

@media screen and (min-width: 2200px) {
  .wrapper-state-week {

    .state-week {
      max-width: 1920px;
      height: 130px;

      .chart {
        width: 110px;
        height: 110px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .wrapper-state-week {
    .state-week {
      margin: 0 10px;

      .chart {
        width: 65px;
        height: 65px;
      }
    }
  }
}
</style>

