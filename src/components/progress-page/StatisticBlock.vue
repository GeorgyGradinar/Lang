<template>
  <div class="statistic">
    <div class="progress-chart" :class="{'clean-history': isActiveCleanAnimation}">
      <p>{{ currentHistoryDay?.done }} / 10</p>
      <p class="progress-chart--title">Выполненно</p>
      <div class="main_wave"
           :style="{'bottom': currentHistoryDay?.done * 10 + '%'}">
      </div>
      <div class="secondary_wave" :style="{'bottom':( currentHistoryDay?.done * 10) * 0.95 + '%'}"></div>
    </div>
    <div class="progress-chart" :class="{'clean-history': isActiveCleanAnimation}">
      <p>{{ currentHistoryDay?.exception }} / 10</p>
      <p class="progress-chart--title">С ошибкой</p>
      <div class="main_wave" :style="{'bottom': currentHistoryDay?.exception * 10 + '%'}"></div>
      <div class="secondary_wave" :style="{'bottom':( currentHistoryDay?.exception * 10) * 0.95 + '%'}"></div>
    </div>
  </div>
</template>

<script setup>

import {toRefs} from "vue";
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  currentHistoryDay: Object,
  isActiveCleanAnimation: Boolean
})
const {currentHistoryDay, isActiveCleanAnimation} = toRefs(props);
</script>

<style scoped lang="scss">
.statistic {
  display: flex;
  gap: 30px;

  .progress-chart {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: var(--green);
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    overflow: hidden;

    p {
      font-size: 40px;
      font-weight: 700;
      color: var(--red);
      mix-blend-mode: difference;
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
      background-color: var(--light-yellow);
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

    &:nth-child(even) {
      background-color: var(--yellow);

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
      width: 500px;
      height: 500px;

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
    gap: 10px;

    .progress-chart {
      width: 250px;
      height: 250px;

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
      width: 350px;
      height: 350px;

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

@media screen and (max-width: 750px) {
  .statistic {
    flex-direction: column;

    .progress-chart {
      width: 75vw;
      height: 75vw;

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
