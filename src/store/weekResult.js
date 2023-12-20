import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const useWeekResult = defineStore('weekResult', () => {
    const templateDataResult = [
        {day: 'Пн', total: 10, success: 1, errors: 5, state: ''},
        {day: 'Вт', total: 10, success: 5, errors: 5, state: ''},
        {day: 'Ср', total: 10, success: 9, errors: 0, state: ''},
        {day: 'Чт', total: 0, success: 0, errors: 0, state: 'lock'},
        {day: 'Пт', total: 0, success: 0, errors: 0, state: 'lock'},
        {day: 'Сб', total: 0, success: 0, errors: 0, state: 'lock'},
        {day: 'Вс', total: 0, success: 0, errors: 0, state: 'lock'}
    ];
    let weekResults = ref(templateDataResult);
    let currentIndex = ref(0);

    function cleanStore() {
        weekResults.value = templateDataResult;
    }

    function changeWeekResults(data) {
        weekResults.value = data;
    }

    function changeIndex(index) {
        currentIndex.value = index;
    }

    return {
        weekResults, changeWeekResults,
        currentIndex, changeIndex,
        cleanStore
    }
})
