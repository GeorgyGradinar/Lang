import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const chatStore = defineStore('chat', () => {
    let messages = ref([]);
    let isTriggerScrollDown = ref(false);
    let isActiveGeneration = ref(false);
    let currentPage = ref(1);
    let lastPage = ref(null);
    let foundWord = ref(null);
    let isActiveSearching = ref(false);
    let triggerSaveScrollForPagination = ref(false);

    function clearChatStore() {
        messages.value = [];
        isTriggerScrollDown.value = false;
        isActiveGeneration.value = false;
        currentPage.value = 1;
        lastPage.value = null;
        foundWord.value = null;
        isActiveSearching.value = false;
        triggerSaveScrollForPagination.value = false;
    }

    function changeMessages(allMessages) {
        messages.value = allMessages.map(data => {
            return {
                ...data,
                message: data.message.split(' ')
            }
        })
        triggerScrollDown();
    }

    function addNextPageMessages(allMessages) {
        const newData = allMessages.map(data => {
            return {
                ...data,
                message: data.message.split(' ')
            }
        })

        messages.value.unshift(...newData);

        triggerSaveScrollForPagination.value = !triggerSaveScrollForPagination.value;
    }

    function addNewMessage(newMessage, isBot, timestamp) {
        const changedMessage = newMessage.split(' ');
        const completedMessageData = {
            is_bot: isBot,
            message: changedMessage,
            timestamp
        }
        messages.value.push(completedMessageData);
        triggerScrollDown();
    }

    function triggerScrollDown() {
        isTriggerScrollDown.value = !isTriggerScrollDown.value;
    }

    function changeActiveGeneration(isActive) {
        isActiveGeneration.value = isActive;
    }

    function changeCurrentPage(page) {
        currentPage.value = page;
    }

    function changeLastPage(page) {
        lastPage.value = page;
    }

    function changeSearchWord(word) {
        foundWord.value = word;
    }

    function changeActiveSearching(isActive) {
        isActiveSearching.value = isActive;
    }

    return {
        messages, changeMessages, addNextPageMessages, addNewMessage,
        isTriggerScrollDown, triggerScrollDown,
        isActiveGeneration, changeActiveGeneration,
        currentPage, changeCurrentPage,
        lastPage, changeLastPage,
        foundWord, changeSearchWord,
        isActiveSearching, changeActiveSearching,
        triggerSaveScrollForPagination,
        clearChatStore
    }
})
