import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";

export const tasksStore = defineStore('tasks', () => {
    let tasks = ref(null);

    function clearTasksStore() {
        tasks.value = null;
    }

    function changeTasks(allTasks) {
        tasks.value = allTasks;
        console.log(tasks.value)
    }

    return {
        tasks, changeTasks,
        clearTasksStore
    }
})
