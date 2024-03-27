import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const statisticStore = defineStore('statistic', () => {
    let monthStatistic = ref(null);
    let currentDayStatistic = ref(null);
    let isActiveCleanAnimation = ref(false);

    function clearStatisticStore() {
        monthStatistic.value = null;
        currentDayStatistic.value = null;
    }

    function changeMonthStatistic(statistic) {
        monthStatistic.value = statistic;
        if (!currentDayStatistic.value) {
            changeCurrentDayStatistic(new Date().getDate())
        }
    }

    function changeCurrentDayStatistic(currentDay) {
        toggleClearAnimation();
        setTimeout(() => {
            let foundDay = monthStatistic.value.find(day => new Date(day.date).getDate() === currentDay)
            currentDayStatistic.value = foundDay ? foundDay : null;
            toggleClearAnimation();
        }, 500);
    }

    function toggleClearAnimation() {
        isActiveCleanAnimation.value = !isActiveCleanAnimation.value;
    }

    return {
        monthStatistic, changeMonthStatistic,
        currentDayStatistic, changeCurrentDayStatistic,
        isActiveCleanAnimation,
        clearStatisticStore
    }
})
