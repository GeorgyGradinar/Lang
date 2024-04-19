<template>
  <div class="mistakes__list-wrap">
    <template v-for="error in userErrors" :key="error.id">
      <div class="error" v-if="error.user_text">
        <p class="user-message"><span>Ваше сообщение</span> {{ error.user_text }}</p>
        <p class="comment"><span>Комментарий к сообщению</span> {{ error.spelling_comment }}</p>
        <p class="time">{{ getDate(error.timestamp) }}</p>
      </div>
    </template>

  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";
import taskRequests from "@/mixins/requests/taskRequests";
import shared from "@/mixins/shared";

const {getUsersErrors} = taskRequests();
const taskStore = tasksStore();
const {userErrors} = storeToRefs(taskStore);
const {getDate} = shared();

onMounted(() => {
  getUsersErrors();
})
</script>

<style scoped lang="scss">
.mistakes__list-wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 30px;
  height: 100%;

  .error {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background-color: var(--dark-pink);
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);

    .user-message,
    .comment {
      position: relative;
      color: var(--yellow);
      font-size: 20px;
      white-space: pre-wrap;
      border: 1px solid var(--yellow);
      padding: 15px;
      border-radius: 10px;

      span {
        position: absolute;
        top: -14px;
        padding: 0 5px;
        background-color: var(--dark-pink);
        color: var(--light-yellow);
      }
    }

    .comment {
      font-size: 17px;
    }

    .time {
      color: var(--light-yellow);
      font-size: 20px;
      text-align: end;
    }
  }
}

@media screen and (min-width: 2200px) {
  .mistakes__list-wrap {
    .error {
      .user-message,
      .comment {
        font-size: 28px;
        padding: 20px 15px;

        span {
          font-size: 25px;
          top: -20px;
        }
      }

      .time {
        font-size: 25px;
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .mistakes__list-wrap {
    .mistakes__list-row {
      gap: 10px;

      .mistake__title {
        font-size: 12px;
      }
    }

    .mistake__item {
      margin-bottom: 10px;
      font-size: 10px;
      padding: 7px;
    }
  }
}

@media screen and (max-width: 500px) {
  .mistakes__list-wrap {
    .error {
      padding: 20px 10px;
    }
  }
}
</style>
