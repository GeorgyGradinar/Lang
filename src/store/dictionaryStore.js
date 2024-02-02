import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const dictionaryStore = defineStore('dictionary', () => {
    let words = ref(null);

    function changeWord(newWord) {
        words.value = newWord;
        console.log(words.value)
    }

    return {
        words, changeWord,
    }
})
