import axios from "axios";
import {HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {chatStore} from "@/store/chatStore";
import {tasksStore} from "@/store/tasksStore";

export default function dialogsRequests() {
    const chat = chatStore()
    const {changeMessages, addNewMessage, changeActiveGeneration, changeLastPage, addNextPageMessages} = chat;
    const taskStore = tasksStore();

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
    }

    function getAllMessagesInTask(id, isPagination) {
        axios.get(`${testUrl}/api/user/tasks/messages?id=${id}&page=${chat.currentPage}`, {
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
            .catch(error => {
                console.log(error)
            })
    }

    function sendMessageToTask(message) {
        axios.post(`${testUrl}/api/user/tasks/messages/send`, {
            text: message,
            id: taskStore.currentTask.id
        }, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
                getMessageFormNetwork(response.data.task_message_id);
            })
            .catch(error => {
                console.log(error)
            })
    }

    function getMessageFormNetwork(id) {
        axios.get(`${testUrl}/api/user/dialog/message/get/${id}`, {
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
    }

    function deleteMessages() {
        axios.delete(`${testUrl}/api/user/dialog`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
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
