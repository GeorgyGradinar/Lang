import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const dictionaryStore = defineStore('dictionary', () => {
    let words = ref([]);
    let groups = ref([]);
    let groupWords = ref([]);
    let isSearching = ref(false);
    let isActiveLoading = ref(false);
    let isActiveGroupWordLoader = ref(false);
    let isShowWordsTypeList = ref(false);

    function clearDictionaryStore() {
        groups.value = [];
        groupWords.value = [];
        isActiveLoading.value = false;
        isActiveGroupWordLoader.value = false;
        isShowWordsTypeList.value = false;
        clearForSearching();
    }

    function clearForSearching() {
        words.value = [];
        isSearching.value = false;
    }

    function changeWords(newWords) {
        words.value = newWords;
    }

    function changeGroups(newGroups) {
        groups.value = newGroups;
    }

    function changeGroupWords(newWords) {
        groupWords.value = newWords;
    }

    function changeIsSearch(isSearched) {
        isSearching.value = isSearched;
    }

    function toggleActiveLoader(isActive) {
        isActiveLoading.value = isActive;
    }

    function toggleActiveGroupWordsLoader(isActive) {
        isActiveGroupWordLoader.value = isActive;
    }

    function toggleTypeShowWords(isList) {
        isShowWordsTypeList.value = isList;
    }

    return {
        words, changeWords,
        groups, changeGroups,
        groupWords, changeGroupWords,
        isSearching, changeIsSearch,
        isActiveLoading, toggleActiveLoader,
        isActiveGroupWordLoader, toggleActiveGroupWordsLoader,
        isShowWordsTypeList, toggleTypeShowWords,
        clearDictionaryStore, clearForSearching
    }
})
