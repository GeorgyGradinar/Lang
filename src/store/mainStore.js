import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import storage from "@/mixins/storage";
import {ACCOUNT_STORAGE_KEY} from "../../constants";


export const mainStore = defineStore('main', () => {
    const {setLocalStorage} = storage();

    let person = ref({});
    let plans = ref(null);

    function clearMainStore() {
        person.value = {};
        plans.value = null;
    }

    function changePerson(personData) {
        person.value = personData;
        setLocalStorage(ACCOUNT_STORAGE_KEY, person.value);
    }

    function changePlans(allPlans) {
        plans.value = allPlans;
    }

    return {
        person, changePerson,
        plans, changePlans,
        clearMainStore
    }
})
