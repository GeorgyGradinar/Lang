import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const useChart = defineStore('chart', () => {
    let messages = ref([
        {
            isBot: false,
            isText: true,
            message: ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown prin',
            errorMessage: ''
        },
        {
            isBot: true,
            isText: true,
            message: 't is a long established fact that a reader ',
            errorMessage: null
        },
        {
            isBot: false,
            isText: true,
            message: 'by accident, sometimes on purpose (injected humour and the like',
            errorMessage: null
        },
        {
            isBot: false,
            isText: true,
            message: 'test1',
            errorMessage: 'Граматическая ошибка'
        },
        {
            isBot: true,
            isText: false,
            message: 'sound/brown.mp3',
            errorMessage: 'Граматическая ошибка'
        },
    ])

    function addMessage(message) {
        messages.value.push(message);
    }

    return {
        messages, addMessage
    }
})
