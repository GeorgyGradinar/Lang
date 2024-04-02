<template>
  <div class="tasks">
    <h2 class="tasks-title">{{ title }}</h2>
    <div class="wrapper-tasks">

      <template v-if="isUserTasks">
        <CardUserView v-for="card in cards" :key="card.id" :card="card"></CardUserView>

      </template>

      <template v-else>
        <card-view v-for="card in cards" :key="card.id" :card="card"/>
      </template>
    </div>
    <div class="wrapper-pagination-button" v-if="isUserTasks && pagination?.current_page < pagination?.last_page">
      <button @click="getMoreTasks">Больше заданий</button>
    </div>
  </div>
</template>

<script setup>
import CardView from '@/components/widgets/CardView.vue';
import CardUserView from '@/components/widgets/CardUserView'
// eslint-disable-next-line no-unused-vars
import {Swiper, SwiperSlide} from 'swiper/vue';
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";
import taskRequests from "@/mixins/requests/taskRequests";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  bgclass: String,
  title: String,
  cards: Array,
  isUserTasks: Boolean
})
const taskStore = tasksStore();
const {pagination} = storeToRefs(taskStore);
const {getAllUsersTasks} = taskRequests();

function getMoreTasks() {
  getAllUsersTasks(true);
}
</script>

<style scoped lang="scss">
.tasks {
  padding: 30px;
  border: 1px solid var(--dark);

  .tasks-title {
    font-size: 35px;
  }

  .wrapper-tasks {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 50px;
    padding: 50px 0;
  }

  .wrapper-pagination-button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      border-radius: 10px;
      padding: 7px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      background-color: var(--dark-pink);
      color: var(--white);
      transition: all 0.2s;

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(4px);
      }

      &:hover {
        background-color: var(--pink);
      }
    }
  }
}
</style>
