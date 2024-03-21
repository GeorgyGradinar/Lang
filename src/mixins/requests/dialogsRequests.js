import axios from "axios";
import {HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {chatStore} from "@/store/chatStore";
import {tasksStore} from "@/store/tasksStore";
import shared from "@/mixins/shared";

export default function dialogsRequests() {
    const chat = chatStore()
    const {changeMessages, addNewMessage, changeActiveGeneration, changeLastPage, addNextPageMessages} = chat;
    const taskStore = tasksStore();
    const {prepareForLogout} = shared();

    function getMessages(isPagination) {
        axios.get(`${testUrl}/api/user/dialog?page=${chat.currentPage}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (isPagination) {
                    addNextPageMessages(response.data.data);
                } else {
                    changeMessages(response.data.data);
                    changeLastPage(response.data.pagination.last_page);
                }
            })
            .catch(error => handleError(error))
    }

    function getAllMessagesInTask(id, isPagination) {
        axios.get(`${testUrl}/api/user/tasks/messages?user_task_id=${id}&page=${chat.currentPage}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (isPagination) {
                    addNextPageMessages(response.data.data);
                } else {
                    changeMessages(response.data.data);
                    changeLastPage(response.data.pagination.last_page);
                }
            })
            .catch(error => handleError(error))
    }

    function sendMessage(message) {
        axios.post(`${testUrl}/api/user/dialog/message/send`, {
            message: message
        }, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                getMessageFormNetwork(response.data.message_id, response);
            })
            .catch(error => handleError(error))
    }

    function sendMessageToTask(message) {
        axios.post(`${testUrl}/api/user/tasks/messages/send`, {
            text: message,
            user_task_id: taskStore.currentTask.id
        }, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
                getMessageFromTask(response.data.task_message_id);
            })
            .catch(error => handleError(error))
    }

    function getMessageFromTask(id) {
        axios.get(`${testUrl}/api/user/tasks/messages/get?user_task_id=${id}&task_message_id=${taskStore.currentTask.id}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (response.data.data.status === "processing") {
                    setTimeout(() => {
                        getMessageFromTask(id)
                    }, 1000);
                } else {
                    console.log(response)
                    addNewMessage(response.data.data.message, true, response.data.data.date);
                    changeActiveGeneration(false);
                }
            })
            .catch(error => handleError(error))
    }

    function getMessageFormNetwork(id) {
        axios.get(`${testUrl}/api/user/dialog/message/get?message_id=${id}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                if (response.data.data.status === "processing") {
                    setTimeout(() => {
                        getMessageFormNetwork(id)
                    }, 1000);
                } else {
                    addNewMessage(response.data.data.response, true, response.data.data.date);
                    changeActiveGeneration(false);
                }
            })
            .catch(error => handleError(error))
    }

    function deleteMessages() {
        axios.delete(`${testUrl}/api/user/dialog`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => handleError(error))
    }

    function handleError(error) {
        switch (error.response.status) {
            case 401:
                prepareForLogout();
                break;
        }
    }

    return {
        getMessages,
        getAllMessagesInTask,
        sendMessage,
        sendMessageToTask,
        getMessageFormNetwork,
        deleteMessages
    }
}
