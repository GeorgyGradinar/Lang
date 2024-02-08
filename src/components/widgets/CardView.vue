<template>
  <div class="tasks-card" :class="card.bgclass" @click="onClick">
    <div class="tasks-card__img">
      <img :src="card.img">
    </div>
    <h3 class="tasks-card__title">{{ card.title }}</h3>
    <!--    <p class="tasks-card__descr">{{ card.text }}</p>-->
    <div class="info">
      <div class="count_tasks">
        <img src="img/tasks/book.svg" alt="">
        <p>{{ card?.countLesson }} уроков</p>
      </div>
      <div class="hours">
        <img src="img/tasks/clock.svg" alt="">
        <p>{{ card?.hours }} hours</p>
      </div>
    </div>

    <div class="progress" v-if="card?.progress !== 100">
      <div class="load_line">
        <div class="done_progress" :style="{'width': `${card?.progress}%`} "></div>
      </div>
      <p>{{ card?.progress }}%</p>
    </div>
    <div class="progress_done" v-else>
      <div class="done">
        <img src="img/done.svg" alt="">
      </div>
      <p>Выполненно!</p>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router/dist/vue-router";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  card: Object
});
const router = useRouter();

function onClick() {
  if (props.card.route !== '') {
    router.push(props.card.route);
  }
}
</script>

<style scoped lang="scss">
.tasks-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  border-radius: 10px;
  width: 300px;
  padding: 24px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--white);

  //&:active {
  //  box-shadow: 0 0 1px var(--dark);
  //  transform: translateY(5px);
  //}

  &:hover {
    transform: scale(1.05);
  }

  .tasks-card__title {
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 20px;
    color: var(--white);
  }

  .tasks-card__img {
    width: 40px;
    height: 40px;

  }

  .tasks-card__descr {
    font-size: 15px;
    font-weight: 600;
  }

  .info {
    display: flex;
    gap: 10px;

    .count_tasks,
    .hours {
      display: flex;
      align-items: center;
      gap: 3px;
      color: #d1d1d1;

      img {
        width: 25px;
        height: 25px;
      }

      p {
        font-size: 10px;
      }
    }
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    color: var(--white);

    .load_line {
      display: flex;
      position: relative;
      width: 100%;
      height: 3px;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 40px;

      .done_progress {
        position: absolute;
        top: 0;
        left: 0;
        width: 25%;
        height: 3px;
        border-radius: 40px;
        background-color: #2ec386;
      }
    }
  }

  .progress_done {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    margin-top: 10px;
    color: var(--white);

    .done {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #2ec386;

      img {
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
