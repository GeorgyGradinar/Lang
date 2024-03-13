import axios from "axios";
import {HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import dialogsRequests from "@/mixins/requests/dialogsRequests";
import {tasksStore} from "@/store/tasksStore";

export default function taskRequests() {
    const taskStore = tasksStore();
    const {changeTasks, changeUserPasts, changeCurrentTask} = taskStore;
    const {getAllMessagesInTask} = dialogsRequests();

    function getAllTasks() {
        axios.get(`${testUrl}/api/task`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeTasks(response.data.data)
            })
    }

    function getAllUsersTasks() {
        axios.get(`${testUrl}/api/user/tasks?sort_by=asc&column=created_at`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeUserPasts(response.data.data)
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

    function taskStart(id, isUserTask) {
        axios.post(`${testUrl}/api/task/start?task_id=${id}`, {id: 1}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (isUserTask) {
                    changeCurrentTask(response.data.data);
                    getAllMessagesInTask(response.data.data.task.id);
                } else {
                    getAllUsersTasks();
                }
            })
    }

    function taskRestart(id) {
        axios.post(`${testUrl}/api/user/tasks/restart?id=${id}`, {id: 1}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
                changeCurrentTask(response.data.data.task);
                getAllMessagesInTask(response.data.data.task.id);
            })
    }

    function taskCancel(id) {
        axios.post(`${testUrl}/api/user/tasks/cancel?id=${id}`, {id: 1}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
    }

    return {
        getAllTasks,
        getAllUsersTasks,
        getTaskInformation,
        taskStart,
        taskRestart,
        taskCancel
    }
}
