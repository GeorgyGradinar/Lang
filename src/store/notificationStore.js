import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const notificationStore = defineStore('notifications', () => {
    const timeout = 2000;

    let isOpenSnackBarDone = ref(false);
    let textForSnackBarDone = ref(null);

    let isOpenSnackBarReject = ref(false);
    let textForSnackBarReject = ref(null);

    function openSnackBarDone(text) {
        isOpenSnackBarDone.value = true;
        changeTextForSnackBarDone(text);
    }

    function changeTextForSnackBarDone(text) {
        textForSnackBarDone.value = text;
    }

    function openSnackBarReject(text) {
        isOpenSnackBarReject.value = true;
        changeTextForSnackBarReject(text);
    }

    function changeTextForSnackBarReject(text) {
        textForSnackBarReject.value = text;
    }

    return {
        timeout,
        isOpenSnackBarDone, openSnackBarDone,
        textForSnackBarDone, changeTextForSnackBarDone,
        isOpenSnackBarReject, openSnackBarReject,
        textForSnackBarReject, changeTextForSnackBarReject
    }
})
