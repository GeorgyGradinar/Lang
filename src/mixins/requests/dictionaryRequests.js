import axios from "axios";
import {testUrl} from '@/../config';
import requestOptions from "@/mixins/prepare-requests/requestOptions";
import {HEADER_PARAMETERS} from "@/../config"
import {dictionaryStore} from "@/store/dictionaryStore";
import {chatStore} from "@/store/chatStore";
import {notificationStore} from "@/store/notificationStore";

export default function dictionaryRequests() {
    const dictionary = dictionaryStore();
    const {
        changeWords,
        addMoreWords,
        changePaginationForUserWords,
        deleteWord,
        changeIsSearch,
        changeGroups,
        changeGroupWords,
        addWordsToGroupWords,
        toggleActiveLoader,
        toggleActiveUserWordLoader,
        toggleActiveGroupWordsLoader,
        changeAllPagesWordsInGroup,
        changeCurrentPageWordsInGroup
    } = dictionary;
    const chat = chatStore();
    const {changeSearchWord, changeActiveSearching, changeActiveLoaderTranslate, changeTranslationsMessage} = chat;
    const notifications = notificationStore();
    const {openSnackBarDone} = notifications;

    function getGroups() {
        axios.get(`${testUrl}/api/group`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => changeGroups(response.data.data))
            .catch(error => handleError(error))
    }

    function getWordsFromGroup(isPagination) {
        toggleActiveGroupWordsLoader(true);

        const currentPage = isPagination ? dictionary.currentPageWordsInGroup + 1 : dictionary.currentPageWordsInGroup;

        axios.get(`${testUrl}/api/group/show?id=${dictionary.selectedGroupWords.id}&page=${currentPage}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                isPagination ? addWordsToGroupWords(response.data.data.words.data) : changeGroupWords(response.data.data.words.data);
                changeAllPagesWordsInGroup(response.data.data.words.pagination.last_page);
                changeCurrentPageWordsInGroup(response.data.data.words.pagination.current_page);

                setTimeout(() => {
                    toggleActiveGroupWordsLoader(false);
                }, 1000)
            })
            .catch(error => handleError(error))
    }

    function getAllWords() {
        axios.get(`${testUrl}/api/word`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => handleError(error))
    }

    function getAllUsersWords(isPagination) {
        isPagination ? toggleActiveUserWordLoader(true) : toggleActiveLoader(true);

        let body = {
            'column': dictionary.sortUserWords.type,
            'per_page': 20
        };

        const currentPage = dictionary.paginationUserWords?.current_page
        body = currentPage < dictionary.paginationUserWords?.last_page ? {...body, page: currentPage + 1} : body;

        axios.get(`${testUrl}/api/user/dictionary/words?${new URLSearchParams(body)}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(response => {
                setTimeout(() => {
                    if (isPagination) {
                        addMoreWords(response.data.data);
                    } else {
                        changeWords(response.data.data);
                    }

                    changePaginationForUserWords(response.data.pagination);
                    toggleActiveLoader(false);
                    toggleActiveUserWordLoader(false);
                }, 1000);
            })
            .catch(error => handleError(error))
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
            .catch(error => handleError(error))
    }

    function searchFromAllWords(word) {
        changeActiveSearching(true);
        axios.get(`${testUrl}/api/word/search?word=${word}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(response => {
                changeSearchWord(response.data.data);
                changeActiveSearching(false);
            })
            .catch(error => handleError(error))
    }

    function translateFullMessage(id) {
        changeActiveLoaderTranslate(true);
        axios.post(`${testUrl}/api/user/tasks/messages/translate`, {user_task_message_id: id}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(response => {
                console.log(response)
                changeActiveLoaderTranslate(false);
                changeTranslationsMessage(response.data.data);
            })
            .catch(error => handleError(error))
    }

    function addWordsToUserDictionary(idWord) {
        axios.post(`${testUrl}/api/user/dictionary/words/add`, {id: idWord}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(() => {
                openSnackBarDone('Слово добавлено');
                getAllUsersWords();
                getWordsFromGroup();
            })
            .catch(error => handleError(error))
    }

    function addGroupToUser(idGroup) {
        axios.post(`${testUrl}/api/user/dictionary/groups/add`, {id: idGroup}, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization])
        })
            .then(() => {
                openSnackBarDone('Группа добавлена');
                getGroups();
            })
            .catch(error => handleError(error))
    }

    function requestToDeleteWord(idWord) {
        axios.delete(`${testUrl}/api/user/dictionary/words/delete?id=${idWord}`, {
            headers: requestOptions([HEADER_PARAMETERS.content, HEADER_PARAMETERS.accept, HEADER_PARAMETERS.authorization]),
        })
            .then(() => {
                openSnackBarDone('Слово удалено');
                deleteWord(idWord);
                if (dictionary.selectedGroupWords?.id) getWordsFromGroup();
            })
            .catch(error => handleError(error))
    }

    function handleError(error) {
        console.log(error)
        changeActiveSearching(false);
    }

    return {
        getGroups,
        getWordsFromGroup,
        getAllWords,
        getAllUsersWords,
        searchWord,
        searchFromAllWords,
        translateFullMessage,
        addWordsToUserDictionary,
        addGroupToUser,
        requestToDeleteWord
    }
}
