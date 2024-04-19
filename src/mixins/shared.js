import {mainStore} from "@/store/mainStore";
import storage from "@/mixins/storage";
import {ACCOUNT_STORAGE_KEY} from "../../constants";
import {useRouter} from "vue-router/dist/vue-router";
import {AUTH} from "@/configuration/Routers";
import {chatStore} from "@/store/chatStore";
import {tasksStore} from "@/store/tasksStore";
import {dictionaryStore} from "@/store/dictionaryStore";
import {statisticStore} from "@/store/statisticStore";

export default function shared() {
    const router = useRouter();
    const {clearChatStore} = chatStore();
    const {clearMainStore} = mainStore();
    const {clearTasksStore} = tasksStore();
    const {clearDictionaryStore} = dictionaryStore();
    const {clearStatisticStore} = statisticStore();
    const {setLocalStorage} = storage();

    function prepareForLogout() {
        clearChatStore();
        clearMainStore();
        clearTasksStore();
        clearDictionaryStore();
        clearStatisticStore();
        setLocalStorage(ACCOUNT_STORAGE_KEY, '');
        router.push({path: AUTH, query: {type: 'signin'}});
    }

    function getDate(timestamp) {
        const currentData = new Date(timestamp * 1000);
        const hours = currentData.getHours() < 10 ? `0${currentData.getHours()}` : `${currentData.getHours()}`;
        const minutes = currentData.getMinutes() < 10 ? `0${currentData.getMinutes()}` : `${currentData.getMinutes()}`;
        const time = `${hours}:${minutes}`;
        const day = currentData.getDate() < 10 ? `0${currentData.getDate()}` : `${currentData.getDate()}`;
        const moth = currentData.getMonth() < 10 ? `0${currentData.getMonth()}` : `${currentData.getMonth()}`;
        const date = `${day}.${moth}.${currentData.getFullYear()}`;

        return `${date} ${time}`;
    }

    return {
        prepareForLogout,
        getDate
    }
}
