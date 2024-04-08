<template>
  <div>
  </div>
</template>

<script setup>

import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";
import {watch} from "vue";

const taskStore = tasksStore();
const {currentTask} = storeToRefs(taskStore);

watch(currentTask, () => {
  let test = new Date(currentTask.value?.ended_at)
  console.log(test)
  let end = new Date(test.getTime()+ (3600 * 1000))
  console.log(end)

  console.log(test.getTime())
  console.log((end.getTime() / 1000) - (new Date().getTime() / 1000))
  console.log(end < new Date())
})


</script>

<style scoped lang="scss">

</style>
