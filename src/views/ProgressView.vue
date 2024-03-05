<template>
  <div class="wrapper-progress-page">
    <div class="wrapper-show-result">
      <StatisticBlock :current-history-day="currentHistoryDay"
                      :is-active-clean-animation="isActiveCleanAnimation">
      </StatisticBlock>
      <DetailStatistic></DetailStatistic>
    </div>
    <CalendarBlock :currentData="currentData"
                   @changeData="handleSelectedDay">
    </CalendarBlock>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import DetailStatistic from "@/components/progress-page/DetailStatistic";
import StatisticBlock from "@/components/progress-page/StatisticBlock";
import CalendarBlock from "@/components/progress-page/CalendarBlock";

const history = [
  {
    done: 6,
    exception: 2
  },
  {
    done: 2,
    exception: 4
  },
  {
    done: 8,
    exception: 0
  },
  {
    done: 4,
    exception: 4
  },
  {
    done: 1,
    exception: 4
  },
  {
    done: 1,
    exception: 1
  },
  {
    done: 2,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
  {
    done: 7,
    exception: 2
  },
]

let currentData = ref(new Date());
let currentHistoryDay = ref();
let isActiveCleanAnimation = ref(false);

onMounted(() => {
  currentHistoryDay.value = history[currentData.value.getDate()];
})

function handleSelectedDay(event) {
  isActiveCleanAnimation.value = true;
  setTimeout(() => {
    currentHistoryDay.value = history[event.getDate()];
    isActiveCleanAnimation.value = false;
  }, 500);
}
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
