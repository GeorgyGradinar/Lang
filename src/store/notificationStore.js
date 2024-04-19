import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const notificationStore = defineStore('notifications', () => {
    let isOpenSnackBarDone = ref(false);
    let textForSnackBarDone = ref(null);
    let isOpenSnackBarReject = ref(false);
    let textForSnackBarReject = ref(null);
    let isOpenConfirmEmailModal = ref(false);

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

    function changeShowConfirmEmailModal(isOpen) {
        isOpenConfirmEmailModal.value = isOpen;
    }

    return {
        isOpenSnackBarDone, openSnackBarDone,
        textForSnackBarDone, changeTextForSnackBarDone,
        isOpenSnackBarReject, openSnackBarReject,
        textForSnackBarReject, changeTextForSnackBarReject,
        isOpenConfirmEmailModal, changeShowConfirmEmailModal,
    }
})
