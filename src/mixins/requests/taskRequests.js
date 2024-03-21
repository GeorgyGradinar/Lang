import axios from "axios";
import {HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import dialogsRequests from "@/mixins/requests/dialogsRequests";
import {tasksStore} from "@/store/tasksStore";
import {useRouter} from "vue-router/dist/vue-router";

export default function taskRequests() {
    const taskStore = tasksStore();
    const {changeTasks, changeUserPasts, changeCurrentTask} = taskStore;
    const {getAllMessagesInTask} = dialogsRequests();
    const router = useRouter();

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
            .catch(error => handleError(error))
    }

    function getTaskInformation() {
        // axios.post(`${testUrl}/api/task/${2}/start`, {id: 1}, {
        //     headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        // })
        //     .then(response => {
        //         console.log(response)
        //     })
    }

    function taskShow(id) {
        axios.get(`${testUrl}/api/user/tasks/show?id=${id}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeCurrentTask(response.data.data);
                getAllMessagesInTask(response.data.data.id, false);
            })
            .catch(error => handleError(error))
    }

    function taskStart(id) {
        axios.post(`${testUrl}/api/task/start?task_id=${id}`, {}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                router.push({path: '/lesson', query: {id: response.data.data.id}});
                // changeCurrentTask(response.data.data);
                // getAllMessagesInTask(response.data.data.id, response.data.data.task.id);
            })
            .catch(error => handleError(error))
    }

    function taskRestart(id) {
        axios.post(`${testUrl}/api/user/tasks/restart?id=${id}`, {id: 1}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeCurrentTask(response.data.data.task);
                getAllMessagesInTask(response.data.data.id, false);
            })
            .catch(error => handleError(error))
    }

    function taskCancel(id) {
        axios.post(`${testUrl}/api/user/tasks/cancel?id=${id}`, {id: 1}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => handleError(error))
    }

    function handleError(error) {
        console.log(error)
    }

    return {
        getAllTasks,
        getAllUsersTasks,
        getTaskInformation,
        taskShow,
        taskStart,
        taskRestart,
        taskCancel
    }
}
