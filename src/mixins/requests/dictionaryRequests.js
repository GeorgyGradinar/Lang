import axios from "axios";
import {testUrl} from '@/../config';
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {HEADER_PARAMETERS} from "@/../config"
import {dictionaryStore} from "@/store/dictionaryStore";
import {chatStore} from "@/store/chatStore";

export default function dictionaryRequests() {
    const dictionary = dictionaryStore();
    const {
        changeWords,
        deleteWord,
        changeIsSearch,
        changeGroups,
        // eslint-disable-next-line no-unused-vars
        changeGroupWords,
        // eslint-disable-next-line no-unused-vars
        addWordsToGroupWords,
        toggleActiveLoader,
        toggleActiveGroupWordsLoader,
        // eslint-disable-next-line no-unused-vars
        changeAllPagesWordsInGroup,
        // eslint-disable-next-line no-unused-vars
        changeCurrentPageWordsInGroup
    } = dictionary;
    const chat = chatStore();
    const {changeSearchWord, changeActiveSearching} = chat;

    function getGroups() {
        axios.get(`${testUrl}/api/group`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                changeGroups(response.data.data);
            })
    }

    function getWordsFromGroup(isPagination) {
        toggleActiveGroupWordsLoader(true);

        const currentPage = isPagination ? dictionary.currentPageWordsInGroup + 1 : dictionary.currentPageWordsInGroup;

        axios.get(`${testUrl}/api/group/show?id=${dictionary.selectedGroupWords.id}&page=${currentPage}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                isPagination ? addWordsToGroupWords(response.data.data.words.data) : changeGroupWords(response.data.data.words);
                // changeAllPagesWordsInGroup(response.data.data.words.last_page);
                // changeCurrentPageWordsInGroup(response.data.data.words.current_page);

                setTimeout(() => {
                    toggleActiveGroupWordsLoader(false);
                }, 1000)
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
        toggleActiveLoader(true);
        axios.get(`${testUrl}/api/user/dictionary/words`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(response => {
                setTimeout(() => {
                    changeWords(response.data.data);
                    toggleActiveLoader(false);
                }, 1000);
            })
    }

    function searchWord(word, isChatsSearch) {
        toggleActiveLoader(true);
        axios.get(`${testUrl}/api/user/dictionary/words/search?word=${word}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(response => {
                if (isChatsSearch) {
                    changeSearchWord(response.data.data[0].word);
                    changeActiveSearching(false);
                } else {
                    setTimeout(() => {
                        changeWords(response.data.data);
                        changeIsSearch(true);
                        toggleActiveLoader(false);
                    }, 1000);
                }
            })
    }

    function addWordsToUserDictionary(idWord) {
        axios.post(`${testUrl}/api/user/dictionary/words/add`, {id: idWord}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(() => {
                getAllUsersWords();
                getWordsFromGroup();
            })
    }

    function requestToDeleteWord(idWord) {
        axios.delete(`${testUrl}/api/user/dictionary/words/delete?id=${idWord}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(() => {
                deleteWord(idWord);
                if (dictionary.selectedGroupWords?.id) getWordsFromGroup();
            })
    }

    return {
        getGroups,
        getWordsFromGroup,
        getAllWords,
        getAllUsersWords,
        searchWord,
        addWordsToUserDictionary,
        requestToDeleteWord
    }
}
