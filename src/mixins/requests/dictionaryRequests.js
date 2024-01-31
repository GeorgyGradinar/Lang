import axios from "axios";
import {testUrl} from '@/../config';
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {HEADER_PARAMETERS} from "@/../config"

export default function dictionaryRequests() {

    function getGroups() {
        axios.get(`${testUrl}/api/group`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
    }

    function searchWord(word) {
        axios.get(`${testUrl}/api/user/dictionary/words/search?word=${word}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(response => {
                console.log(response)
            })
    }

    function addWords(dataWord) {
        axios.post(`${testUrl}/api/user/dictionary/words/add?`, dataWord, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
    }

    return {
        getGroups,
        searchWord,
        addWords
    }
}
