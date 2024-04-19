<template>
  <div class="welcome">
    <img class="robot" src="img/robots/робот-05.png" alt="робот">
    <h2>Приветствую, я - НейроРепититор!</h2>
    <div class="text">
      <p>Самое время заняться английским. Начните с выполнения интересного задания</p>
      <button class="secondary-button" @click="openTask">
        Выполнить задание
        <img src="img/main/arrow-top-right.svg">
      </button>
    </div>
  </div>
</template>

<script setup>
import taskRequests from "@/mixins/requests/taskRequests";
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";

const {taskStart} = taskRequests();
const taskStore = tasksStore();
const {allTasks} = storeToRefs(taskStore);

function openTask() {
  if (allTasks.value?.length) {
    taskStart(allTasks.value[0].id);
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

.welcome {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin: 35px 20px;
  padding: 35px;
  border-radius: 10px;
  background-color: var(--light-green);
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  .robot {
    position: absolute;
    top: 0;
    left: 100px;
    width: 140px;
  }

  h2 {
    color: var(--dark-pink);
    font-size: 30px;
    font-weight: 800;
  }

  .text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-top: 30px;

    p {
      color: var(--dark-pink);
      font-size: 18px;
      font-weight: 800;
    }

    button {
      padding: 7px 18px;
      color: var(--light-green);
      background-color: var(--pink);

      img {
        width: 20px;
      }

      &:hover {
        background-color: var(--dark-pink);
      }
    }
  }
}

@media screen and (min-width: 2200px){
  .welcome {
    max-width: 1920px;

    .robot {
      width: 160px;
    }

    h2 {
      font-size: 43px;
    }

    .text {

      p {
        font-size: 23px;
      }

      button {
        font-size: 22px;

        img {
          width: 24px;
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .welcome {
    .robot {
      left: 0;
    }
  }
}

@media screen and (max-width: 850px) {
  .welcome {
    .robot {
      display: none;
    }
  }
}

@media screen and (max-width: 650px) {
  .welcome {
    padding: 30px 10px;
    margin: 30px 10px;

    h2 {
      text-align: center;
    }

    .text {
      flex-direction: column;

      p {
        text-align: center;
      }
    }
  }
}
</style>
