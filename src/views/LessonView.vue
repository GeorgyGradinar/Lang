<template>
  <div class="lesson--page">
    <TaskAndAnswer></TaskAndAnswer>
    <NewChat></NewChat>
  </div>
</template>

<script setup>
import TaskAndAnswer from "@/components/widgets/TaskAndAnswer";
import NewChat from "@/components/widgets/NewChat";
</script>

<style scoped lang="scss">
.lesson--page {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  width: 100vw;
  height: calc(100vh - 82px);
  padding: 30px;
  background-color: var(--white);
  overflow: hidden;
}

@media screen and (max-width: 1100px){
  .lesson--page {
    padding: 10px;
    gap: 10px;
  }
}

@media screen and (max-width: 800px){
  .lesson--page {
    padding: unset;
  }
}
</style>
