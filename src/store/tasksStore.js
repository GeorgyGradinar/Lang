import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const tasksStore = defineStore('taskStore', () => {
    let allTasks = ref(null);
    let userTasks = ref(null);
    let currentTask = ref(null);
    let isOpenFinalModal = ref(false);

    function clearTasksStore() {
        allTasks.value = null;
        userTasks.value = null;
        currentTask.value = null;
        isOpenFinalModal.value = false;
    }

    function changeTasks(tasks) {
        allTasks.value = tasks;
    }

    function changeUserPasts(tasks) {
        userTasks.value = tasks
    }

    function changeCurrentTask(task) {
        currentTask.value = task;
    }

    function changeIsOpenDialog(isOpen) {
        isOpenFinalModal.value = isOpen;
    }

    return {
        allTasks, changeTasks,
        userTasks, changeUserPasts,
        currentTask, changeCurrentTask,
        isOpenFinalModal, changeIsOpenDialog,
        clearTasksStore
    }
})
