import {mainStore} from "@/store/mainStore";
import {useWeekResult} from "@/store/weekResult";
import storage from "@/mixins/storage";
import {ACCOUNT_STORAGE_KEY} from "../../constants";

export default function shared() {
    const {clearMainStore} = mainStore();
    const {cleanStore} = useWeekResult();
    const {setLocalStorage} = storage();

    function prepareForLogout() {
        clearMainStore();
        cleanStore();
        setLocalStorage(ACCOUNT_STORAGE_KEY, '');
    }

    return {prepareForLogout}
}
