import axios from 'axios';
import {testUrl} from '@/../config';
import {mainStore} from '@/store/mainStore';
import {ACCOUNT_STORAGE_KEY} from "../../../constants";
import storage from "@/mixins/storage";

export default function authRequests() {
    const main = mainStore();
    const {changePerson} = main;
    const {getLocalStorage} = storage();

    function checkLocalStorage() {
        const personData = getLocalStorage(ACCOUNT_STORAGE_KEY);

        if (personData?.id) changePerson(personData);
    }

    function registration(data) {
        return axios.post(`${testUrl}/api/auth/register`, data)
            .then(response => {
                changePerson({...response.data.data.user, token: response.data.data.access_token});
                return response
            })
            .catch(error => {
                return error
            })
    }

    function login(data) {
        return axios.post(`${testUrl}/api/auth/login`, data)
            .then(response => {
                changePerson({...response.data.data.user, token: response.data.data.access_token});
                return response
            })
            .catch(error => {
                return error
            })
    }

    return {checkLocalStorage, registration, login};
}
