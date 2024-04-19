import axios from "axios";
import {ERROR_SOME_THING_WRONG, ERROR_TO_MANY_REQUESTS, HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {statisticStore} from "@/store/statisticStore";
import shared from "@/mixins/shared";
import {notificationStore} from "@/store/notificationStore";

export default function dictionaryRequests() {
    const statistic = statisticStore();
    const {changeMonthStatistic, changeWeeklyStatistic} = statistic;
    const {prepareForLogout} = shared();
    const notifications = notificationStore();
    const {openSnackBarReject} = notifications;

    function getAllStatistics() {
        axios.get(`${testUrl}/api/user/statistics/all`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeMonthStatistic(response.data.data)
            })
            .catch(error => handleErrors(error))
    }

    function getMonthlyStatistic(currentDate) {
        axios.get(`${testUrl}/api/user/statistics/monthly?month=${currentDate}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeMonthStatistic(response.data.data);
            })
            .catch(error => handleErrors(error))
    }

    function getWeeklyStatistic() {
        axios.get(`${testUrl}/api/user/statistics/weekly`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeWeeklyStatistic(response.data.data);
            })
            .catch(error => handleErrors(error))
    }

    function getDailyStatistic() {
        axios.get(`${testUrl}/api/user/statistics/daily?day=2024-03-26`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => handleErrors(error))
    }

    function handleErrors(error) {
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
        getAllStatistics,
        getMonthlyStatistic,
        getWeeklyStatistic,
        getDailyStatistic
    }
}
