<template>
  <div class="tasks-card" @click="startTask">
    <!--    <div class="tasks-card__img">-->
    <!--      <img :src="card.img">-->
    <!--    </div>-->
    <div class="wrapper-task-title">
      <img :src="card.task.type.image" alt="task icon">
      <h4 class="tasks-card__title">№{{ card.id }} {{ card.task.title }}</h4>
    </div>

    <p class="tasks-card__descr">{{ card.task.description }}</p>
    <p class="character" v-if="card.character_info"><span>Персонаж:</span> {{ card.character_info }}</p>
    <p class="study-word"><span>Изучаемое слово:</span>{{ card?.user_word?.word?.word }}</p>
    <!--    <div class="info">-->
    <!--      <div class="count_tasks">-->
    <!--        <img src="img/tasks/book.svg" alt="">-->
    <!--        <p>{{ card?.countLesson }} уроков</p>-->
    <!--      </div>-->
    <!--      <div class="hours">-->
    <!--        <img src="img/tasks/clock.svg" alt="">-->
    <!--        <p>{{ card?.hours }} hours</p>-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="progress" v-if="card?.status === 'processing'">
      <div class="load_line">
        <div class="done_progress" :style="{'width': `${card?.progress}%`} "></div>
      </div>
      <p>{{ card?.progress }}%</p>
    </div>
    <div class="progress_done" v-if="card?.status === 'success'">
      <div class="done">
        <img src="img/done.svg" alt="done">
      </div>
      <p>Выполненно</p>
    </div>
    <div class="progress_reject" v-if="card?.status === 'failed'">
      <div class="reject-icon">
        <img src="img/chart/reject.svg" alt="reject">
      </div>
      <p>Не выполнено</p>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router/dist/vue-router";

// eslint-disable-next-line no-undef
const props = defineProps({
  card: Object
});
const router = useRouter();

function startTask() {
  router.push({path: '/lesson', query: {id: props.card.id}});
}
</script>

<style scoped lang="scss">
.tasks-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  border-radius: 10px;
  width: 300px;
  padding: 30px 20px;
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--white);
  background-color: var(--dark-pink);

  //&:active {
  //  box-shadow: 0 0 1px var(--dark);
  //  transform: translateY(5px);
  //}

  &:hover {
    transform: scale(1.05);
  }

  .wrapper-task-title {
    display: flex;
    align-items: flex-start;
    gap: 10px;

    img {
      width: 30px;
    }

    .tasks-card__title {
      font-size: 20px;
      font-weight: 800;
      color: var(--yellow);
    }
  }

  .tasks-card__img {
    width: 40px;
    height: 40px;
  }

  .tasks-card__descr {
    font-size: 14px;
    font-weight: 700;
  }

  .character {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--yellow);

    span {
      color: var(--yellow);
      font-weight: 700;
      margin-right: 5px;
    }
  }

  .study-word {
    color: var(--yellow);

    span {
      color: var(--white);
      margin-right: 10px;
    }
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

    p {
      color: #2ec386;
      font-weight: 700;
      font-size: 15px;
    }

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

  .progress_reject {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    margin-top: 10px;

    .reject-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      padding: 3px;
      border: 2px solid var(--light-red);

      img {
        width: 10px;
        height: 10px;
      }
    }

    p {
      color: var(--light-red);
      font-weight: 700;
      font-size: 15px;
    }
  }
}
</style>
