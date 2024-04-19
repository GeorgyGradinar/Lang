<template>
  <div class="wrapper-timer">
    <p class="done" v-if="taskStatus === 'success'">Задание выполнено</p>
    <p class="reject" v-if="taskStatus === 'failed'">Не выполнено</p>

    <template v-if="taskStatus === 'processing'">
      <p>Время выполнения</p>
      <div class="timer">
        <p>
          <span v-if="hours < 10">0</span>
          {{ hours }}
        </p>
        <span>:</span>
        <p>
          <span v-if="minutes < 10">0</span>
          {{ minutes }}
        </p>
        <span>:</span>
        <p>
          <span v-if="seconds < 10">0</span>
          {{ seconds }}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";
import {onUnmounted, ref, watch} from "vue";

const taskStore = tasksStore();
const {changeIsOpenRejectDialog} = taskStore;
const {currentTask} = storeToRefs(taskStore);

let taskStatus = ref(null);
let interval = ref(null);
let hours = ref(null);
let minutes = ref(null);
let seconds = ref(null);

let startTimeTask = ref(null);

let timestamp = ref(null);

watch(currentTask, () => {

  taskStatus.value = currentTask.value?.status;

  if (taskStatus.value !== 'processing') return;

  timestamp.value = currentTask.value.task.timeout * 1000;
  startTimeTask.value = currentTask.value.started_at

  if (startTimeTask.value.toString().split('').length === 10) {
    startTimeTask.value = startTimeTask.value * 1000;
  }

  if ((startTimeTask.value + timestamp.value) > new Date().getTime()) {
    setDataToTimer();
    timer();
  }
}, {deep: true})

function timer() {
  interval.value = setInterval(() => {
    setDataToTimer();
  }, 1000)
}

function setDataToTimer() {
  const restOfTime = Math.round((timestamp.value - (new Date().getTime() - startTimeTask.value)) / 1000);
  hours.value = Math.floor(restOfTime / 3600);
  minutes.value = Math.floor((restOfTime - (hours.value * 3600)) / 60);
  seconds.value = restOfTime - (hours.value * 3600) - (minutes.value * 60);

  if (hours.value <= 0 && minutes.value <= 0 && seconds.value <= 0) {
    taskStatus.value = 'failed';
    changeIsOpenRejectDialog(true);
  }
}

onUnmounted(() => {
  clearInterval(interval.value);
})

</script>

<style scoped lang="scss">
.wrapper-timer {
  display: flex;
  align-items: center;
  gap: 7px;

  .reject,
  .done {
    font-size: 15px;
    font-weight: 800;
    border-radius: 10px;
    padding: 5px;
  }

  .done {
    color: var(--green);
    border: 2px solid var(--green);
  }

  .reject {
    color: var(--red);
    border: 2px solid var(--red);
  }

  .timer {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--yellow);

    p {
      display: flex;
    }
  }
}

@media screen and (min-width: 2200px) {
  .wrapper-timer {

    .reject,
    .done {
      font-size: 23px;
    }

    .done {

    }

    .reject {

    }


    p {
      font-size: 23px;
    }

    .timer {

      p {
        font-size: 23px;
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .wrapper-timer {

    .reject,
    .done {

    }

    .done {

    }

    .reject {

    }

    p {
      font-size: 14px;
    }

    .timer {
      gap: 2px;

      p {
        font-size: 14px;
      }
    }
  }
}
</style>
