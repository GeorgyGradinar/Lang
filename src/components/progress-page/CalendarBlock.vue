<template>
  <div class="wrapper-calendar">
    <v-container>
      <v-row justify="space-around">
        <div class="wrapper-data-picker" ref="dataPicker">
          <v-date-picker
              v-model="data"
              title="text"
              hide-header="false"
              show-adjacent-months
              @update:modelValue="handleSelectedDay($event)"
              @update:month="handleUpdateMonth"
          ></v-date-picker>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {statisticStore} from "@/store/statisticStore";
import {storeToRefs} from "pinia/dist/pinia";
import statisticRequests from "@/mixins/requests/statisticRequests";

const statistic = statisticStore();
const {monthStatistic} = storeToRefs(statistic);
const {changeCurrentDayStatistic} = statistic;
const {getMonthlyStatistic} = statisticRequests();

let dataPicker = ref(null);

let data = ref(null);

onMounted(() => {
  data.value = new Date();
  getMonthlyStatistic(getCurrentDate());
})

watch(monthStatistic, () => {
  updateDataPicker();
})

function handleSelectedDay() {
  changeCurrentDayStatistic(monthStatistic.value, data.value.getDate());
}

function handleUpdateMonth(event) {
  removeInfoFromDataPicker();

  let month = event + 1;
  month = month < 10 ? `0${month}` : `${month}`;

  getMonthlyStatistic(`${new Date().getFullYear()}-${month}`);
}

function getCurrentDate() {
  let month = new Date().getMonth() + 1
  month = month < 10 ? `0${month}` : `${month}`;

  return `${new Date().getFullYear()}-${month}`;
}

function removeInfoFromDataPicker() {
  Array.from(document.getElementsByClassName('info-statistic')).forEach(element => {
    element.remove();
  })
}

function updateDataPicker() {
  const listDate = dataPicker.value.children[0].children[0].children[1].children[0].children;
  const titleClass = 'v-date-picker-month__weekday';
  const anotherClass = 'v-date-picker-month__day--adjacent';

  let indexCurrentMonth = 0;
  for (let index = 0; index < listDate.length; index++) {
    if (!listDate[index].className.includes(titleClass) && !listDate[index].className.includes(anotherClass)) {

      const findHistoryDate = monthStatistic.value.find(dataHistory => {
        if (new Date(dataHistory.date).getDate() === indexCurrentMonth) return dataHistory
      })

      if (findHistoryDate) addDataToCurrentDay(listDate, index, findHistoryDate);

      indexCurrentMonth = indexCurrentMonth + 1;
    }
  }
}

function addDataToCurrentDay(listDate, index, dataHistory) {
  const wrapperDone = document.createElement('div');
  wrapperDone.appendChild(getImageForStatistic(true));
  wrapperDone.appendChild(getHtmlTextElement(true, dataHistory?.tasks?.count_succeeded_tasks));
  wrapperDone.appendChild(getImageForStatistic(false));
  wrapperDone.appendChild(getHtmlTextElement(false, dataHistory?.tasks?.count_processing_tasks));
  wrapperDone.classList.add("info-statistic")
  listDate[index - 1].children[0].appendChild(wrapperDone);
}

function getHtmlTextElement(isDoneText, textData) {
  const textElement = document.createElement('p');
  isDoneText ? textElement.classList.add("done-result") : textElement.classList.add("reject-result");
  textElement.innerHTML = `${textData}`;
  return textElement;
}

function getImageForStatistic(isDoneImage) {
  const image = document.createElement('img');
  image.src = isDoneImage ? 'img/progress/check-done.svg' : 'img/progress/info.svg';
  return image;
}
</script>

<style lang="scss">
.wrapper-calendar {
  width: 50vw;
  margin-right: 35px;
  margin-top: 40px;

  .v-container {
    max-height: calc(100vh - 125px);
    padding: unset;
    margin-left: unset;
    margin-right: unset;

    .v-picker.v-sheet {
      width: 50vw;
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

          .v-date-picker-month__day {
            width: 6vw;
            height: 60%;
          }

          button {
            display: flex;
            flex-direction: column;
            --v-btn-height: 10vh;
            background-color: var(--light-green);

            &:active {
              box-shadow: 0 0 1px var(--dark);
              transform: translateY(5px);
            }

            &:hover {
              background-color: var(--light-yellow);
            }

            div {
              display: flex;
              gap: 1px;
              justify-content: center;
              align-items: center;

              p {
                font-size: 16px;
                font-weight: 800;
              }

              img {
                width: 20px;
                height: 20px;
              }

              .done-result {
                margin-right: 3px;
                padding-right: 3px;
                border-right: 2px solid rgba(24, 25, 30, 0.3);
                color: var(--green);
              }

              .reject-result {
                color: #ffa900;
                margin-right: 0;
                border-right: unset;
              }
            }

            .v-btn__content {
              font-size: 30px;
              font-weight: 800;
            }
          }

          .v-date-picker-month__weekday {
            height: 20px;
            margin: 15px 0;

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

@media screen and (min-width: 2500px) {
  .wrapper-calendar {

    .v-container {


      .v-picker.v-sheet {

      }

      .v-btn--icon {
        border-radius: 15px;
        border: 4px solid var(--dark);
        box-shadow: 2px 6px 1px var(--dark);
      }

      .v-picker__body {


        .v-date-picker-controls {

          .v-date-picker-controls__month-btn {
            font-size: 20px;

            &:active {

            }
          }

          .v-date-picker-controls__mode-btn {

          }

          .v-date-picker-controls__month {
            button {

              &:active {

              }

              &:hover {

              }
            }
          }
        }

        .v-date-picker-month {

          .v-date-picker-month__days {

            .v-date-picker-month__day {

            }

            button {


              &:active {

              }

              &:hover {

              }

              div {

                p {
                  font-size: 30px;
                }

                img {
                  width: 35px;
                  height: 35px;
                }

                .done-result {

                }

                .reject-result {

                }
              }

              .v-btn__content {
                font-size: 40px;
              }
            }

            .v-date-picker-month__weekday {
              font-size: 20px;
            }
          }

          .v-date-picker-month__day--selected {

            button {

              &:hover {

              }
            }
          }

          .v-date-picker-month__day--adjacent {
            button {

            }
          }
        }

        .v-date-picker-months {

          .v-date-picker-months__content {

            button {

            }

            .v-btn--active {

            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1500px) {
  .wrapper-calendar {
    width: unset;

    .v-container {

      .v-picker.v-sheet {
        width: 660px;
      }

      .v-btn--icon {

      }

      .v-picker__body {

        .v-date-picker-controls {

          .v-date-picker-controls__month-btn {

            &:active {

            }
          }

          .v-date-picker-controls__mode-btn {

          }

          .v-date-picker-controls__month {
            button {

              &:active {

              }

              &:hover {

              }
            }
          }
        }

        .v-date-picker-month {

          .v-date-picker-month__days {

            .v-date-picker-month__day {
              width: 90px;
            }

            button {
              --v-btn-height: 70px;

              &:active {

              }

              &:hover {

              }

              div {

                p {

                }

                img {

                }

                .done-result {

                }

                .reject-result {

                }
              }

              .v-btn__content {

              }
            }

            .v-date-picker-month__weekday {

            }
          }

          .v-date-picker-month__day--selected {

            button {

              &:hover {

              }
            }
          }

          .v-date-picker-month__day--adjacent {
            button {

            }
          }
        }

        .v-date-picker-months {

          .v-date-picker-months__content {

            button {

            }

            .v-btn--active {

            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .wrapper-calendar {
    //height: 800px;
    margin-right: unset;
    display: flex;
    justify-content: center;
    align-content: center;

    .v-container {
      margin-bottom: 80px;

      .v-picker.v-sheet {
        width: unset;
        height: unset;
      }

      .v-btn--icon {

      }

      .v-picker__body {
        min-height: unset;

        .v-date-picker-controls {

          .v-date-picker-controls__month-btn {

            &:active {

            }
          }

          .v-date-picker-controls__mode-btn {

          }

          .v-date-picker-controls__month {
            button {

              &:active {

              }

              &:hover {

              }
            }
          }
        }

        .v-date-picker-month {

          .v-date-picker-month__days {

            .v-date-picker-month__day {
              width: 90px;
            }

            button {
              --v-btn-height: 70px;

              &:active {

              }

              &:hover {

              }

              div {

                p {

                }

                img {

                }

                .done-result {

                }

                .reject-result {

                }
              }

              .v-btn__content {

              }
            }

            .v-date-picker-month__weekday {

            }
          }

          .v-date-picker-month__day--selected {

            button {

              &:hover {

              }
            }
          }

          .v-date-picker-month__day--adjacent {
            button {

            }
          }
        }

        .v-date-picker-months {

          .v-date-picker-months__content {

            button {

            }

            .v-btn--active {

            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .wrapper-calendar {
    height: unset;

    .v-container {


      .v-picker.v-sheet {
        width: 95vw;
      }

      .v-btn--icon {

      }

      .v-picker__body {


        .v-date-picker-controls {

          .v-date-picker-controls__month-btn {

            &:active {

            }
          }

          .v-date-picker-controls__mode-btn {

          }

          .v-date-picker-controls__month {
            button {

              &:active {

              }

              &:hover {

              }
            }
          }
        }

        .v-date-picker-month {

          .v-date-picker-month__days {

            .v-date-picker-month__day {
              width: 12vw;
              height: 10%;
            }

            button {
              --v-btn-height: 10vw;


              &:active {

              }

              &:hover {

              }

              div {

                p {

                }

                img {
                  width: 15px;
                  height: 15px;
                }

                .done-result {
                  margin-right: 1px;
                  padding-right: 1px;
                }

                .reject-result {

                }
              }

              .v-btn__content {
                font-size: 20px;
              }
            }

            .v-date-picker-month__weekday {
              height: 20px;
              margin-bottom: 40px;
            }
          }

          .v-date-picker-month__day--selected {

            button {

              &:hover {

              }
            }
          }

          .v-date-picker-month__day--adjacent {
            button {

            }
          }
        }

        .v-date-picker-months {

          .v-date-picker-months__content {

            button {

            }

            .v-btn--active {

            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .wrapper-calendar {

    .v-container {


      .v-picker.v-sheet {
        width: 97vw;
      }

      .v-btn--icon {

      }

      .v-picker__body {


        .v-date-picker-controls {

          .v-date-picker-controls__month-btn {

            &:active {

            }
          }

          .v-date-picker-controls__mode-btn {

          }

          .v-date-picker-controls__month {
            button {

              &:active {

              }

              &:hover {

              }
            }
          }
        }

        .v-date-picker-month {

          .v-date-picker-month__days {

            .v-date-picker-month__day {

            }

            button {


              &:active {

              }

              &:hover {

              }

              div {

                p {

                }

                img {
                  display: none;
                }

                .done-result {

                }

                .reject-result {

                }
              }

              .v-btn__content {

              }
            }

            .v-date-picker-month__weekday {

            }
          }

          .v-date-picker-month__day--selected {

            button {

              &:hover {

              }
            }
          }

          .v-date-picker-month__day--adjacent {
            button {

            }
          }
        }

        .v-date-picker-months {

          .v-date-picker-months__content {

            button {

            }

            .v-btn--active {

            }
          }
        }
      }
    }
  }
}
</style>
