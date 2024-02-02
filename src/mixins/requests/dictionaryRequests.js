import axios from "axios";
import {testUrl} from '@/../config';
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {HEADER_PARAMETERS} from "@/../config"
import {dictionaryStore} from "@/store/dictionaryStore";
import {chatStore} from "@/store/chatStore";

export default function dictionaryRequests() {
    const dictionary = dictionaryStore();
    const {changeWord} = dictionary;
    const chat = chatStore();
    const {changeSearchWord, changeActiveSearching} = chat;

    function getGroups() {
        axios.get(`${testUrl}/api/group`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
    }

    function getAllWords() {
        axios.get(`${testUrl}/api/word`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
    }

    function getAllUsersWords() {
        axios.get(`${testUrl}/api/user/dictionary/words`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(response => {
                console.log(response)
                changeWord(response.data.data);
            })
    }

    function searchWord(word, isChatsSearch) {
        axios.get(`${testUrl}/api/user/dictionary/words/search?word=${word}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(response => {
                if (isChatsSearch) {
                    changeSearchWord(response.data.data[0].word);
                    changeActiveSearching(false);
                } else {
                    changeWord(response.data.data);
                }
            })
    }


    function addWords(idWord) {
        axios.post(`${testUrl}/api/user/dictionary/words/add`, {id: idWord}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
    }

    return {
        getGroups,
        getAllWords,
        getAllUsersWords,
        searchWord,
        addWords
    }
}
