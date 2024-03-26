import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const statisticStore = defineStore('statistic', () => {
    let allStatistic = ref(null);

    function clearStatisticStore() {
        allStatistic.value = null;
    }

    function changeAllStatistic(statistic) {
        allStatistic.value = statistic;
    }

    return {
        allStatistic, changeAllStatistic,
        clearStatisticStore
    }
})
