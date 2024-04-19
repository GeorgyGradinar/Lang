import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import storage from "@/mixins/storage";
import {ACCOUNT_STORAGE_KEY} from "../../constants";

export const mainStore = defineStore('main', () => {
    const {setLocalStorage} = storage();

    let person = ref({});
    let plans = ref(null);
    let transactions = ref(null);

    function clearMainStore() {
        person.value = {};
        plans.value = null;
        transactions.value = null;
    }

    function changePerson(personData) {
        person.value = {...person.value, ...personData};
        setLocalStorage(ACCOUNT_STORAGE_KEY, person.value);
    }

    function changePlans(allPlans) {
        plans.value = allPlans;
    }

    function changeTransactions(userTransactions) {
        transactions.value = userTransactions;
    }

    return {
        person, changePerson,
        plans, changePlans,
        transactions, changeTransactions,
        clearMainStore
    }
})
