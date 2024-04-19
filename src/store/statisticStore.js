import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const statisticStore = defineStore('statistic', () => {
    let monthStatistic = ref(null);
    let weeklyStatistic = ref(null);
    let currentDayStatistic = ref(null);
    let isActiveCleanAnimation = ref(false);

    function clearStatisticStore() {
        monthStatistic.value = null;
        weeklyStatistic.value = null;
        currentDayStatistic.value = null;
    }

    function changeMonthStatistic(statistic) {
        monthStatistic.value = statistic;
        if (!currentDayStatistic.value) {
            changeCurrentDayStatistic(monthStatistic.value, new Date().getDate());
        }
    }

    function changeWeeklyStatistic(statistic) {
        weeklyStatistic.value = statistic;
        if (!currentDayStatistic.value) {
            changeCurrentDayStatistic(weeklyStatistic.value, new Date().getDate());
        }
    }

    function changeCurrentDayStatistic(allStatistic, currentDay) {
        toggleClearAnimation();
        const foundDay = allStatistic.find(day => new Date(day.date).getDate() === currentDay);
        setTimeout(() => {
            toggleClearAnimation();
            currentDayStatistic.value = foundDay ? foundDay : null;
        }, 1000)
    }

    function toggleClearAnimation() {
        isActiveCleanAnimation.value = !isActiveCleanAnimation.value;
    }

    return {
        monthStatistic, changeMonthStatistic,
        weeklyStatistic, changeWeeklyStatistic,
        currentDayStatistic, changeCurrentDayStatistic,
        isActiveCleanAnimation,
        clearStatisticStore
    }
})
