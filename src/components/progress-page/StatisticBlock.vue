<template>
  <div class="statistic">
    <div class="progress-chart" :class="{'clean-history': isActiveCleanAnimation}">
      <p>{{ currentDayStatistic?.tasks?.count_succeeded_tasks }} / {{ currentDayStatistic?.tasks?.count_all_tasks }}</p>
      <p class="progress-chart--title">Выполненно</p>
      <div class="main_wave"
           :style="{'bottom': getPercentDone(currentDayStatistic?.tasks?.count_succeeded_tasks,  currentDayStatistic?.tasks?.count_all_tasks) + '%'}">
      </div>
      <div class="secondary_wave"
           :style="{'bottom':getPercentDone(currentDayStatistic?.tasks?.count_succeeded_tasks,  currentDayStatistic?.tasks?.count_all_tasks) * 0.95 + '%'}"></div>
    </div>
    <div class="progress-chart" :class="{'clean-history': isActiveCleanAnimation}">
      <p>{{ currentDayStatistic?.tasks?.count_processing_tasks }} / {{
          currentDayStatistic?.tasks?.count_all_tasks
        }}</p>
      <p class="progress-chart--title">В процессе</p>
      <div class="main_wave"
           :style="{'bottom': getPercentDone(currentDayStatistic?.tasks?.count_processing_tasks, currentDayStatistic?.tasks?.count_all_tasks) + '%'}"></div>
      <div class="secondary_wave"
           :style="{'bottom': getPercentDone(currentDayStatistic?.tasks?.count_processing_tasks, currentDayStatistic?.tasks?.count_all_tasks)* 0.95 + '%'}"></div>
    </div>
    <div class="progress-chart" :class="{'clean-history': isActiveCleanAnimation}">
      <p>{{ currentDayStatistic?.tasks?.count_failed_tasks }} / {{ currentDayStatistic?.tasks?.count_all_tasks }}</p>
      <p class="progress-chart--title">С ошибкой</p>
      <div class="main_wave"
           :style="{'bottom': getPercentDone(currentDayStatistic?.tasks?.count_failed_tasks, currentDayStatistic?.tasks?.count_all_tasks) + '%'}"></div>
      <div class="secondary_wave"
           :style="{'bottom': getPercentDone(currentDayStatistic?.tasks?.count_failed_tasks, currentDayStatistic?.tasks?.count_all_tasks)* 0.95 + '%'}"></div>
    </div>
  </div>
</template>

<script setup>
import {statisticStore} from "@/store/statisticStore";
import {storeToRefs} from "pinia/dist/pinia";

const statistic = statisticStore();
const {currentDayStatistic, isActiveCleanAnimation} = storeToRefs(statistic);

function getPercentDone(done, totalTasks) {
  return done && totalTasks ? (done * 120) / totalTasks : 0;
}
</script>

<style scoped lang="scss">
.statistic {
  display: flex;
  gap: 35px;

  .progress-chart {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 13vw;
    height: 13vw;
    border-radius: 50%;
    background-color: var(--green);
    border: 4px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    overflow: hidden;

    p {
      font-size: 40px;
      font-weight: 700;
      color: var(--green);
      mix-blend-mode: color-dodge;
      z-index: 2;
    }

    .progress-chart--title {
      font-size: 20px;
    }

    .main_wave,
    .secondary_wave {
      position: absolute;
      left: 50%;
      min-width: 100vw;
      min-height: 100vw;
      background-color: var(--dark-pink);
      animation-name: rotate;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
      transition: all 1s;
      animation-fill-mode: forwards;
    }

    // 100% - 110
    .main_wave {
      border-radius: 45%;
      animation-duration: 1s;
    }

    // 100% - 105
    .secondary_wave {
      opacity: .5;
      border-radius: 47%;
      animation-duration: 1s;
      animation-name: rotateLeft;
    }

    &:nth-child(2) {
      background-color: var(--yellow);

      p {
        color: var(--yellow);
      }

      .main_wave,
      .secondary_wave {
        transform: translate(-50%, 0) rotateZ(10deg);
      }
    }

    &:nth-child(3) {
      background-color: var(--red);

      p {
        color: var(--red);
      }

      .main_wave,
      .secondary_wave {
        transform: translate(-50%, 0) rotateZ(10deg);
      }
    }
  }

  .clean-history {
    .main_wave {
      animation-duration: 0.5s;
      animation-name: clean;
    }
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, 0) rotateZ(10deg);
      bottom: 0;
    }
    100% {
      transform: translate(-50%, 0%) rotateZ(90deg);
    }
  }

  @keyframes rotateLeft {
    0% {
      transform: translate(-50%, 0%) rotateZ(360deg);
      bottom: 0;
    }
    50% {
      transform: translate(-50%, -2%) rotateZ(180deg);
    }
    85% {
      transform: translate(-50%, 0%) rotateZ(200deg);
    }
    90% {
      transform: translate(-50%, 0%) rotateZ(210deg);
    }
    95% {
      transform: translate(-50%, 0%) rotateZ(220deg);
    }
    100% {
      transform: translate(-50%, 0) rotateZ(240deg);
    }
  }

  @keyframes clean {
    0% {
      transform: translate(-50%, 0%) rotateZ(360deg);
    }
    100% {
      transform: translate(-50%, 0) rotateZ(350deg);
      bottom: 0;
    }
  }
}

@media screen and (min-width: 2500px) {
  .statistic {

    .progress-chart {
      //width: 400px;
      //height: 400px;

      p {
        font-size: 60px;
      }

      .progress-chart--title {
        font-size: 25px;
      }

      .main_wave,
      .secondary_wave {

      }

      // 100% - 110
      .main_wave {

      }

      // 100% - 105
      .secondary_wave {

      }

      &:nth-child(even) {

        .main_wave,
        .secondary_wave {

        }
      }
    }
  }
}

@media screen and (max-width: 1500px) {
  .statistic {
    gap: 25px;

    .progress-chart {
      //width: 230px;
      //height: 230px;

      p {

      }

      .progress-chart--title {

      }

      .main_wave,
      .secondary_wave {

      }

      // 100% - 110
      .main_wave {

      }

      // 100% - 105
      .secondary_wave {

      }

      &:nth-child(even) {

        .main_wave,
        .secondary_wave {

        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .statistic {
    gap: 40px;

    .progress-chart {
      width: 23vw;
      height: 23vw;

      p {

      }

      .progress-chart--title {

      }

      .main_wave,
      .secondary_wave {

      }

      // 100% - 110
      .main_wave {

      }

      // 100% - 105
      .secondary_wave {

      }

      &:nth-child(even) {

        .main_wave,
        .secondary_wave {

        }
      }
    }
  }
}


@media screen and (max-width: 750px) {
  .statistic {
    gap: 4vw;

    .progress-chart {
      width: 30vw;
      height: 30vw;

      p {

      }

      .progress-chart--title {

      }

      .main_wave,
      .secondary_wave {

      }

      // 100% - 110
      .main_wave {

      }

      // 100% - 105
      .secondary_wave {

      }

      &:nth-child(even) {

        .main_wave,
        .secondary_wave {

        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .statistic {
    flex-wrap: wrap;
    justify-content: center;

    .progress-chart {
      width: 200px;
      height: 200px;

      p {

      }

      .progress-chart--title {

      }

      .main_wave,
      .secondary_wave {

      }

      // 100% - 110
      .main_wave {

      }

      // 100% - 105
      .secondary_wave {

      }

      &:nth-child(even) {

        .main_wave,
        .secondary_wave {

        }
      }
    }
  }
}
</style>
