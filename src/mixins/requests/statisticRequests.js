import axios from "axios";
import {HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {statisticStore} from "@/store/statisticStore";

export default function dictionaryRequests() {
    const statistic = statisticStore();
    const {changeMonthStatistic, changeWeeklyStatistic} = statistic;

    function getAllStatistics() {
        axios.get(`${testUrl}/api/user/statistics/all`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeMonthStatistic(response.data.data)
            })
    }

    function getMonthlyStatistic(currentDate) {
        axios.get(`${testUrl}/api/user/statistics/monthly?month=${currentDate}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeMonthStatistic(response.data.data);
            })
    }

    function getWeeklyStatistic() {
        axios.get(`${testUrl}/api/user/statistics/weekly`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeWeeklyStatistic(response.data.data);
            })
    }

    function getDailyStatistic() {
        axios.get(`${testUrl}/api/user/statistics/daily?day=2024-03-26`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
    }

    return {
        getAllStatistics,
        getMonthlyStatistic,
        getWeeklyStatistic,
        getDailyStatistic
    }
}
