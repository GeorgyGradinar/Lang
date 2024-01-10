import {mainStore} from "@/store/mainStore";
import {useWeekResult} from "@/store/weekResult";

export default function shared() {
    const {clearMainStore} = mainStore();
    const {cleanStore} = useWeekResult();

    function prepareForLogout() {
        clearMainStore();
        cleanStore();
    }

    return {prepareForLogout}
}
