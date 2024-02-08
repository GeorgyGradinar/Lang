import axios from "axios";
import {HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {tasksStore} from "@/store/tasksStore";

export default function taskRequests() {
    const tasks = tasksStore();
    const {changeTasks} = tasks;

    function getAllTasks() {
        axios.get(`${testUrl}/api/task`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeTasks(response.data.data)
            })
    }

    function getTaskInformation() {
        // axios.post(`${testUrl}/api/task/${2}/start`, {id: 1}, {
        //     headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        // })
        //     .then(response => {
        //         console.log(response)
        //     })
    }

    // eslint-disable-next-line no-unused-vars
    function taskRestart() {
        axios.post(`${testUrl}/api/user/tasks/${2}/restart`, {id: 1}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
    }

    // eslint-disable-next-line no-unused-vars
    function taskCancel() {
        axios.post(`${testUrl}/api/user/tasks/${2}/cancel`, {id: 1}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
    }

    return {
        getAllTasks,
        getTaskInformation
    }
}
