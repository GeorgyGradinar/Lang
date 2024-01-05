<template>
  <div class="wrapper-progress-page">
    <div class="wrapper-show-result">
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
      <DetailStatistic></DetailStatistic>
    </div>

    <v-container>
      <v-row justify="space-around">
        <v-date-picker
            v-model="currentData"
            title="text"
            hide-header="false"
            show-adjacent-months
            @update:modelValue="handleSelectedDay"
        ></v-date-picker>
      </v-row>
    </v-container>
  </div>

</template>

<script setup>
import {onMounted, ref} from "vue";
import DetailStatistic from "@/components/progress-page/DetailStatistic";

const history = [
  {
    done: 6,
    exception: 2
  },
  {
    done: 2,
    exception: 4
  },
  {
    done: 8,
    exception: 0
  },
  {
    done: 4,
    exception: 4
  },
  {
    done: 1,
    exception: 4
  },
  {
    done: 1,
    exception: 1
  },
  {
    done: 2,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
]

let currentData = ref(new Date());
let currentHistoryDay = ref();
let isActiveCleanAnimation = ref(false)

onMounted(() => {
  currentHistoryDay.value = history[currentData.value.getDate()];
})

function handleSelectedDay() {
  isActiveCleanAnimation.value = true;
  setTimeout(() => {
    currentHistoryDay.value = history[currentData.value.getDate()];
    isActiveCleanAnimation.value = false;
  }, 500);
}
</script>

<style scoped lang="scss">
.wrapper-progress-page {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: calc(100vh - 122px);

  .wrapper-show-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    width: 50%;
    height: calc(100vh - 122px);

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
  }

  :deep(.v-container) {
    max-width: 45vw;
    max-height: calc(100vh - 125px);
    padding: unset;
    margin-left: unset;
    margin-right: 2.5%;
    margin-top: 40px;

    .v-picker.v-sheet {
      width: 100%;
      height: calc(100vh - 125px);
      border-radius: 10px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
    }

    .v-btn--icon {
      border-radius: 10px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
    }

    .v-picker__body {
      min-height: calc(100vh - 125px);
      background-color: var(--green);

      .v-date-picker-controls {
        padding: 10px 20px;

        .v-date-picker-controls__month-btn {
          border-radius: 10px;
          background-color: var(--light-green);
          border: 2px solid var(--dark);
          box-shadow: 1px 4px 1px var(--dark);

          &:active {
            box-shadow: 0 0 1px var(--dark);
            transform: translateY(5px);
          }
        }

        .v-date-picker-controls__mode-btn {
          display: none;
        }

        .v-date-picker-controls__month {
          button {
            background-color: var(--light-green);

            &:active {
              box-shadow: 0 0 1px var(--dark);
              transform: translateY(5px);
            }

            &:hover {
              background-color: var(--light-yellow);
            }
          }
        }
      }

      .v-date-picker-month {
        height: 100%;
        padding: 0 12px 75px;

        .v-date-picker-month__days {
          row-gap: 0;

          button {
            --v-btn-height: 40px;
            background-color: var(--light-green);

            &:active {
              box-shadow: 0 0 1px var(--dark);
              transform: translateY(5px);
            }

            &:hover {
              background-color: var(--light-yellow);
            }
          }
        }

        .v-date-picker-month__day--selected {

          button {
            background-color: var(--red);
            box-shadow: 0 0 1px var(--dark);
            transform: translateY(5px);

            &:hover {
              background-color: var(--red);
            }
          }
        }

        .v-date-picker-month__day--adjacent {
          button {
            box-shadow: 0 0 1px var(--dark);
            transform: translateY(5px);
            background-color: var(--white);
          }
        }
      }

      .v-date-picker-months {
        overflow-y: hidden;
        height: unset;

        .v-date-picker-months__content {
          padding: 30px;
          grid-gap: 25px;

          button {
            border-radius: 10px;
            background-color: var(--light-green);
            border: 2px solid var(--dark);
            box-shadow: 1px 4px 1px var(--dark);
          }

          .v-btn--active {
            background-color: var(--red);
            box-shadow: 0 0 1px var(--dark);
            transform: translateY(5px);
            color: var(--white);
          }
        }
      }
    }
  }
}
</style>
