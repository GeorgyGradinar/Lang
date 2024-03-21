import {mainStore} from "@/store/mainStore";
import {useWeekResult} from "@/store/weekResult";
import storage from "@/mixins/storage";
import {ACCOUNT_STORAGE_KEY} from "../../constants";
import {useRouter} from "vue-router/dist/vue-router";
import {AUTH} from "@/configuration/Routers";
import {chatStore} from "@/store/chatStore";
import {tasksStore} from "@/store/tasksStore";

export default function shared() {
    const router = useRouter();
    const {clearMainStore} = mainStore();
    const {cleanStore} = useWeekResult();
    const {clearChatStore} = chatStore();
    const {clearTasksStore} = tasksStore();
    const {setLocalStorage} = storage();


    function prepareForLogout() {
        clearMainStore();
        cleanStore();
        clearChatStore();
        clearTasksStore();
        setLocalStorage(ACCOUNT_STORAGE_KEY, '');
        router.push({path: AUTH});
    }

    return {prepareForLogout}
}
