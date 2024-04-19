import axios from "axios";
import {ERROR_SOME_THING_WRONG, ERROR_TO_MANY_REQUESTS, HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {mainStore} from "@/store/mainStore";
import {storeToRefs} from "pinia/dist/pinia";
import shared from "@/mixins/shared";
import {notificationStore} from "@/store/notificationStore";

export default function userRequests() {
    const main = mainStore();
    const {changePlans, changePerson, changeTransactions} = main;
    const {transactions} = storeToRefs(main);
    const {prepareForLogout} = shared();
    const notifications = notificationStore();
    const {openSnackBarReject, changeShowConfirmEmailModal} = notifications;

    function getUser() {
        axios.get(`${testUrl}/api/auth/user`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changePerson(response.data.data);
                checkConfirmEmail(response.data.data);
            })
            .catch(error => handleError(error))
    }

    function getPlans() {
        axios.get(`${testUrl}/api/plans`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changePlans(response.data.data);
            })
            .catch(error => handleError(error))
    }

    function getPaymentLink(id) {
        axios.post(`${testUrl}/api/payment`, {plan_id: id}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => location.href = response.data.link)
            .catch(error => handleError(error))
    }

    function getTransactions(selectPage) {
        const page = transactions.value?.pagination?.current_page ? selectPage : 1;
        axios.get(`${testUrl}/api/payment/transactions?page=${page}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => changeTransactions(response.data))
            .catch(error => handleError(error))
    }

    function checkConfirmEmail(personData) {
        if (!personData?.id) return;

        if (!personData?.email_verified_at) {
            changeShowConfirmEmailModal(true);
            setTimeout(() => {
                getUser();
            }, 2000);
        } else {
            changeShowConfirmEmailModal(false);
        }
    }

    function handleError(error) {
        switch (error.response?.status) {
            case 401:
                prepareForLogout();
                break;
            case 500:
            case 404:
                openSnackBarReject(ERROR_SOME_THING_WRONG);
                break;
            case 429:
                openSnackBarReject(ERROR_TO_MANY_REQUESTS);
                break;
            case 503:
            case 422:
            case 409:
                openSnackBarReject(error.response?.data?.message);
        }
    }

    return {
        getUser,
        getPlans,
        getPaymentLink,
        getTransactions
    }
}
