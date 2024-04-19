import axios from "axios";
import {ERROR_SOME_THING_WRONG, ERROR_TO_MANY_REQUESTS, HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {tasksStore} from "@/store/tasksStore";
import {useRouter} from "vue-router/dist/vue-router";
import {storeToRefs} from "pinia/dist/pinia";
import {chatStore} from "@/store/chatStore";
import shared from "@/mixins/shared";
import {notificationStore} from "@/store/notificationStore";

export default function taskRequests() {
    const taskStore = tasksStore();
    const {
        changeTasks,
        changeUserTasks,
        addToUserTasks,
        changePagination,
        changeCurrentTask,
        changeUsersErrors
    } = taskStore;
    const {pagination} = storeToRefs(taskStore);
    const chat = chatStore()
    const {changeActiveLoaderMessageGeneration} = chat;
    const router = useRouter();
    const {prepareForLogout} = shared();
    const notifications = notificationStore();
    const {openSnackBarReject} = notifications;

    function getAllTasks() {
        axios.get(`${testUrl}/api/task`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeTasks(response.data.data)
            })
            .catch(error => handleError(error))
    }

    function getAllUsersTasks(isPagination) {
        let body = {
            'sort_by': 'desc',
            'column': 'created_at',
        }

        const currentPage = pagination.value?.current_page
        body = currentPage < pagination.value?.last_page ? {...body, page: currentPage + 1} : body;

        axios.get(`${testUrl}/api/user/tasks?${new URLSearchParams(body)}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (isPagination) {
                    addToUserTasks(response.data.data);
                } else {
                    changeUserTasks(response.data.data);
                }

                changePagination(response.data.pagination);
            })
            .catch(error => handleError(error))
    }

    function taskShow(id) {
        axios.get(`${testUrl}/api/user/tasks/show?id=${id}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeCurrentTask(response.data.data);
                changeActiveLoaderMessageGeneration(false);
            })
            .catch(error => handleError(error))
    }

    function taskStart(id, wordId) {
        let body = {
            'task_id': id,
        }
        body = wordId ? {...body, user_word_id: wordId} : body;

        axios.post(`${testUrl}/api/task/start?${new URLSearchParams(body)}`, {'task_id': id,}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                router.push({path: '/lesson', query: {id: response.data.data.id}});
            })
            .catch(error => handleError(error))
    }

    function taskRestart(id) {
        axios.post(`${testUrl}/api/user/tasks/restart?id=${id}`, {id: 1}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeCurrentTask(response.data.data.task);
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

    function getUsersErrors() {
        axios.get(`${testUrl}/api/user/errors`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeUsersErrors(response.data.data);
            })
            .catch(error => handleError(error))
    }

    function handleError(error) {
        changeActiveLoaderMessageGeneration(false);

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
        getAllTasks,
        getAllUsersTasks,
        taskShow,
        taskStart,
        taskRestart,
        taskCancel,
        getUsersErrors
    }
}
