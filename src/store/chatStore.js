import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const chatStore = defineStore('chat', () => {
    let messages = ref([]);

    function changeMessages(allMessages) {
        allMessages[0].message = allMessages[0].message.split(' ');
        messages.value = allMessages;
    }

    function addNewMessage(newMessage) {
        messages.value.push(newMessage);
    }

    return {
        messages, changeMessages, addNewMessage
    }
})
