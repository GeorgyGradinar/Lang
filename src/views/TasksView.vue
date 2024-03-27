<template>
  <week-results/>

  <cards-slider-view
      :bgclass="'bg-white'"
      :title="'Задания'"
      :cards="allTasks"
      :isUserTasks="false"
  />

  <cards-slider-view
      :bgclass="'bg-white'"
      :title="'Ваши задания'"
      :cards="userTasks"
      :isUserTasks="true"
  />
  <MiniChat></MiniChat>
</template>

<script setup>
import WeekResults from "@/components/widgets/WeekResults.vue";
import CardsSliderView from "@/components/widgets/CardsSliderView.vue";
import MiniChat from "@/components/widgets/MiniChat";
import {onMounted} from "vue";
import taskRequests from "@/mixins/requests/taskRequests";
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";

const {getAllTasks, getAllUsersTasks, getTaskInformation} = taskRequests();
const taskStore = tasksStore();
const {allTasks, userTasks} = storeToRefs(taskStore);

onMounted(() => {
  getAllTasks();
  getAllUsersTasks();
  getTaskInformation();
})
</script>

<style scoped lang="scss">
</style>
