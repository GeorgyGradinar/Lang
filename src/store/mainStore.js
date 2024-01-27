import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import storage from "../mixins/storage";
import {ACCOUNT_STORAGE_KEY} from "../../constants";


export const mainStore = defineStore('main', () => {
    const {setLocalStorage} = storage();

    let person = ref({});

    function clearMainStore() {
        person.value = {};
    }

    function changePerson(personData) {
        person.value = personData;
        setLocalStorage(ACCOUNT_STORAGE_KEY, person.value);
    }

    return {
        person, changePerson,
        clearMainStore
    }
})
