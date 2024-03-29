<template>
  <div class="wrapper-progress-page">
    <div class="wrapper-show-result">
      <StatisticBlock></StatisticBlock>
      <DetailStatistic></DetailStatistic>
    </div>
    <CalendarBlock></CalendarBlock>
  </div>
</template>

<script setup>
import DetailStatistic from "@/components/progress-page/DetailStatistic";
import StatisticBlock from "@/components/progress-page/StatisticBlock";
import CalendarBlock from "@/components/progress-page/CalendarBlock";
</script>

<style scoped lang="scss">
.wrapper-progress-page {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: calc(100vh - 90px);

  .wrapper-show-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    height: calc(100vh - 90px);
    flex: 1;
  }

  .wrapper-data-picker {
    width: 100%;
  }
}

@media screen and (max-width: 1200px) {
  .wrapper-progress-page {
    flex-direction: column-reverse;
    height: unset;


    .wrapper-show-result {

    }

    .wrapper-data-picker {

    }
  }
}
</style>
