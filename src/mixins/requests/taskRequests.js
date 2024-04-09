import axios from "axios";
import {HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
// import dialogsRequests from "@/mixins/requests/dialogsRequests";
import {tasksStore} from "@/store/tasksStore";
import {useRouter} from "vue-router/dist/vue-router";
import {storeToRefs} from "pinia/dist/pinia";
import {chatStore} from "@/store/chatStore";

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
    // const {getAllMessagesInTask} = dialogsRequests();
    const router = useRouter();

    function getAllTasks() {
        axios.get(`${testUrl}/api/task`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeTasks(response.data.data)
            })
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
                // getAllMessagesInTask(response.data.data.id, false);
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
                console.log(response)
                changeUsersErrors(response.data.data);
            })
            .catch(error => handleError(error))
    }

    function handleError(error) {
        console.log(error)
        changeActiveLoaderMessageGeneration(false);
    }

    return {
        getAllTasks,
        getAllUsersTasks,
        getTaskInformation,
        taskShow,
        taskStart,
        taskRestart,
        taskCancel,
        getUsersErrors
    }
}
