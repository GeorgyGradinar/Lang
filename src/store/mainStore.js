import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const mainStore = defineStore('main', () => {
    let person = ref({});

    function clearMainStore() {
        person.value = {};
    }

    function changePerson(personData) {
        person.value = personData;
    }

    return {
        person, changePerson,
        clearMainStore
    }
})
