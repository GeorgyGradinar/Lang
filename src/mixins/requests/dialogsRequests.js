import axios from "axios";
import {HEADER_PARAMETERS, testUrl} from "../../../config";
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {chatStore} from "@/store/chatStore";

export default function dialogsRequests() {
    const chat = chatStore()
    const {changeMessages} = chat;

    function getMessages() {
        axios.get(`${testUrl}/api/user/dialog`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeMessages(response.data.data);
            })
    }

    function sendMessage(message) {
        axios.post(`${testUrl}/api/user/dialog/message/send`, {
            message: message
        }, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
                getMessageFormNetwork()
            })
            .catch(error => {
                console.log(error)
            })
    }

    function getMessageFormNetwork() {
        axios.get(`${testUrl}/api/user/dialog/message/get`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
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
        sendMessage,
        getMessageFormNetwork,
        deleteMessages
    }
}
