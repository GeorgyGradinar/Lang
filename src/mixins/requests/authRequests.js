import axios from 'axios';
import {testUrl} from '@/../config';
import {mainStore} from '@/store/mainStore';
import {ACCOUNT_STORAGE_KEY} from "../../../constants";
import storage from "@/mixins/storage";
import {notificationStore} from "@/store/notificationStore";

export default function authRequests() {
    const main = mainStore();
    const {changePerson} = main;
    const {getLocalStorage} = storage();
    const notifications = notificationStore();
    const {openSnackBarDone} = notifications;

    function checkLocalStorage() {
        const personData = getLocalStorage(ACCOUNT_STORAGE_KEY);

        if (personData?.id) changePerson(personData);
    }

    function registration(data) {
        return axios.post(`${testUrl}/api/auth/register`, data)
            .then(response => {
                openSnackBarDone('Успешная регистрация');
                changePerson({...response.data.data.user, token: response.data.data.access_token});
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
                return response
            })
            .catch(error => {
                handleError(error);
                return error;
            })
    }

    function handleError(error) {
        console.log(error)
    }

    return {checkLocalStorage, registration, login};
}
