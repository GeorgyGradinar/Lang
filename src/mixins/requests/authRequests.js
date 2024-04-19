import axios from 'axios';
import {ERROR_SOME_THING_WRONG, ERROR_TO_MANY_REQUESTS, HEADER_PARAMETERS, testUrl} from '@/../config';
import {mainStore} from '@/store/mainStore';
import {ACCOUNT_STORAGE_KEY} from "../../../constants";
import storage from "@/mixins/storage";
import {notificationStore} from "@/store/notificationStore";
import userRequests from "@/mixins/requests/userRequesrs";
import requestOptions from "@/mixins/prepare-requests/requestOptions";

export default function authRequests() {
    const main = mainStore();
    const {changePerson} = main;
    const {getLocalStorage} = storage();
    const notifications = notificationStore();
    const {openSnackBarDone, openSnackBarReject} = notifications;
    const {getUser} = userRequests();

    function checkLocalStorage() {
        const personData = getLocalStorage(ACCOUNT_STORAGE_KEY);

        if (personData?.id) {
            changePerson(personData);
            getUser();
        }
    }

    function registration(data) {
        return axios.post(`${testUrl}/api/auth/register`, data)
            .then(response => {
                openSnackBarDone('Успешная регистрация');
                changePerson({...response.data.data.user, token: response.data.data.access_token});
                getUser();
                return response
            })
            .catch(error => {
                handleError(error);
                return error;
            })
    }

    function login(data) {
        return axios.post(`${testUrl}/api/auth/login`, data)
            .then(response => {
                openSnackBarDone('Успешный вход');
                changePerson({...response.data.data.user, token: response.data.data.access_token});
                getUser();
                return response
            })
            .catch(error => {
                handleError(error);
                return error;
            })
    }

    function sendMessageToEmail() {
        return axios.post(`${testUrl}/api/auth/email/resend`, {}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                return response
            })
            .catch(error => {
                handleError(error);
                return error;
            })
    }

    function handleError(error) {
        switch (error.response?.status) {
            case 500:
            case 404:
                openSnackBarReject(ERROR_SOME_THING_WRONG);
                break;
            case 429:
                openSnackBarReject(ERROR_TO_MANY_REQUESTS);
                break;
        }
    }

    return {checkLocalStorage, registration, login, sendMessageToEmail};
}
