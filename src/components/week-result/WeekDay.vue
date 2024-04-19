<template>
  <div class="state-week__days">
    <div class="day" v-for="(item, index) in weeklyStatistic" :key="item.day">
      <p>{{ weeksDay[index] }}</p>
      <div class="results"
           :class="{'now': currentDayStatistic?.date === item.date || !Object.keys(item).length}"
           @click="emit('changeDay', index, item)">
            <span v-if="item?.tasks?.count_all_tasks">
              {{ item?.tasks?.count_succeeded_tasks }}/{{ item?.tasks?.count_all_tasks }}
            </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {statisticStore} from "@/store/statisticStore";
import {storeToRefs} from "pinia/dist/pinia";

// eslint-disable-next-line no-undef
const emit = defineEmits(['changeDay']);
const statistic = statisticStore();
const {currentDayStatistic, weeklyStatistic} = storeToRefs(statistic);

const weeksDay = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
</script>

<style scoped lang="scss">
.state-week__days {
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;

  .day {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
    font-size: 12px;
    font-weight: 700;

    p {
      font-size: 15px;
      color: var(--light-yellow);
    }
  }

  .results {
    width: 45px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    margin-top: 4px;
    background-color: var(--white);
    color: var(--dark-pink);
    border-radius: 8px;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      color: var(--yellow);
    }

    &.now {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }
}

@media screen and (min-width: 2200px) {
  .state-week__days {
    width: 450px;
    gap: 30px;

    .day {
      width: unset;

      p {
        font-size: 20px;
      }
    }

    .results {
      width: 60px;
      height: 55px;
      border: 3px solid var(--dark);
      box-shadow: 1px 6px 2px var(--dark);

      span {
        font-size: 18px;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .state-week__days {
    width: unset;
    gap: 10px;

    .day {
      width: 40px;
      font-size: 12px;

      p {
        font-size: 15px;
      }
    }

    .results {
      width: 40px;
      height: 35px;

      &.now {
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .state-week__days {
    display: none;
  }
}
</style>
