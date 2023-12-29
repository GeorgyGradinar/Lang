<template>
  <!--  <div class="progress bg-orange ">-->
  <!--    <div class="wrap">-->
  <!--      <month-select-view -->
  <!--        @changeMonth="changedMonth"-->
  <!--      />-->

  <!--      <progress-data-view-->
  <!--        :progressData="progressData"-->
  <!--       />-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="wrapper-progress-page">
    <div class="wrapper-show-result">
      <div class="progress-chart">
        <p>5 / 10</p>
      </div>
      <div class="progress-chart">
        <p>3 / 10</p>
      </div>
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

let progressData = ref([]);
let currentData = ref(new Date());

onMounted(() => {

})

// eslint-disable-next-line no-unused-vars
function changedMonth(date) {
  createRandomData()
}

function createRandomData() {
  progressData.value = [];
  const week = [
    {id: 0, title: 'понедельник', bgclass: 'bg-base-blue'},
    {id: 1, title: 'вторник', bgclass: 'bg-base-light-violet'},
    {id: 2, title: 'среда', bgclass: 'bg-base-purple'},
    {id: 3, title: 'четверг', bgclass: 'bg-base-dark-purple'},
    {id: 4, title: 'пятница', bgclass: 'bg-base-blue'},
    {id: 5, title: 'суббота', bgclass: 'bg-base-light-violet'},
    {id: 6, title: 'воскресенье', bgclass: 'bg-base-purple'}
  ]

  for (let i = 0; i < week.length; i++) {
    // создаем день
    let days = []
    for (let j = 0; j < 4; j++) {
      let randompoint = Math.random() * 1000;
      let day = {}

      day.id = i * 4 + j
      if (randompoint <= 350) {
        day.type = 1
        day.day = '25'
        day.task = {total: 10, done: 10, success: 10, words: 3}
        day.img = 'img/icon/bxs-party.png'
        day.bgclass = 'bg-base-purple'
      }
      if ((randompoint > 350) && (randompoint <= 700)) {
        day.type = 2
        day.day = '1'
        day.img = 'img/icon/bxs-star.png'
        day.bgclass = 'bg-base-light-violet'
        day.task = {total: 12, done: 7, success: 10, error: 2, words: 3}
      }
      if ((randompoint > 700) && (randompoint <= 850)) {
        day.type = 3
        day.day = '14'
        day.bgclass = 'bg-base-blue'
      }
      if ((randompoint > 850) && (randompoint <= 1000)) {
        day.type = 4
        day.day = 45
        day.bgclass = 'bg-base-blue'
      }

      days.push(day)
    }

    // заполняем массив с данными
    progressData.value.push({
      title: week[i],
      days: days
    })
  }
}

function handleSelectedDay() {
  console.log(currentData.value)
}

</script>

<style scoped lang="scss">
.wrapper-progress-page {
  display: flex;
  justify-content: space-between;

  .wrapper-show-result {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50%;
    height: 70vh;

    .progress-chart {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
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

      &:before,
      &:after {
        content: "";
        position: absolute;
        left: 50%;
        min-width: 100vw;
        min-height: 100vw;
        background-color: var(--light-yellow);
        animation-name: rotate;
        animation-iteration-count: 1;
        animation-timing-function: linear;
        transition: all 1s;
        animation-fill-mode: forwards;
      }

      // 100% - 110
      &:before {
        bottom: 60%;
        border-radius: 45%;
        animation-duration: 10s;
      }

      // 100% - 105
      &:after {
        bottom: 55%;
        opacity: .5;
        border-radius: 47%;
        animation-duration: 10s;
        animation-name: rotateLeft;
      }

      &:nth-child(even) {
        background-color: var(--yellow);

        &:before,
        &:after {
          animation-delay: 1s;
          transform: translate(-50%, 0) rotateZ(10deg);
        }

        &:before {
          bottom: 30%;
        }

        &:after {
          bottom: 25%;
        }
      }
    }

    @keyframes rotate {
      0% {
        transform: translate(-50%, 0) rotateZ(10deg);
        bottom: 0;
      }
      50% {
        transform: translate(-50%, -2%) rotateZ(180deg);
      }
      90% {
        transform: translate(-50%, 0%) rotateZ(360deg);
      }
      100% {
        transform: translate(-50%, 0%) rotateZ(370deg);
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
      90% {
        transform: translate(-50%, 0%) rotateZ(0deg);
      }
      100% {
        transform: translate(-50%, 0) rotateZ(-10deg);
      }
    }
  }

  :deep(.v-container) {
    max-width: 800px;
    padding: unset;
    margin-left: unset;
    margin-right: 20px;
    margin-top: 40px;

    .v-picker.v-sheet {
      width: 800px;
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
        padding: 0 12px 30px;

        .v-date-picker-month__days {
          row-gap: 30px;

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
