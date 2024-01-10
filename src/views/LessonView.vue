<template>
  <div class="lesson--page">
    <TaskAndAnswer></TaskAndAnswer>
    <ChartBlock></ChartBlock>
  </div>
</template>

<script setup>
import TaskAndAnswer from "@/components/widgets/TaskAndAnswer";
import ChartBlock from "@/components/widgets/ChartBlock";
</script>

<style scoped lang="scss">
.lesson--page {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  width: 100vw;
  height: calc(100vh - 82px);
  padding: 30px;
}
</style>
