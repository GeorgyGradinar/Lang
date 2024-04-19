<template>
  <div class="wrapper-character animate__animated animate__bounceIn" v-if="currentTask?.character_info">
    <div class="character-block">
      <div class="wrapper-img">
        <img src="img/chart/Белый мужчина.webp" alt="logo character">

      </div>
      <p>{{ currentTask?.character_info }}</p>
    </div>
  </div>
</template>

<script setup>
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";

const taskStore = tasksStore();
const {currentTask} = storeToRefs(taskStore);
</script>

<style scoped lang="scss">
.wrapper-character {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;

  .character-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 270px;
    border-radius: 20px;
    padding: 15px;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    background-color: var(--light-gray);

    .wrapper-img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid var(--dark);
      margin-bottom: 15px;

      img {
        width: 100%;
      }
    }

    p {
      text-align: center;
      font-size: 15px;
      font-weight: 900;
    }
  }
}

@media screen and (min-width: 2200px) {
  .wrapper-character {
    .character-block {
      width: 450px;

      .wrapper-img {
        width: 250px;
        height: 250px;
      }

      p {
        font-size: 23px;
      }
    }
  }
}
</style>
