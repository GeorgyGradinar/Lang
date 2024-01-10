import axios from 'axios';
import {testUrl} from '@/../config';
import {mainStore} from '@/store/mainStore';

export default function authRequests() {
    const main = mainStore();
    const {changePerson} = main;

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

    return {registration, login};
}
