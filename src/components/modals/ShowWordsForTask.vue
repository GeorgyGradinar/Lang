<template>
  <v-dialog
      v-model="isOpenDialog"
      width="auto"
  >
    <v-card :class="'rounded-lg'">
      <div class="word-list-dialog">
        <h3>Выберите слово для тренировки</h3>
        <div class="wrapper-words" v-if="words.length">
          <button v-for="word in words" :key="word.id" @click="openTask(word?.id)">
            {{ word?.word?.word }}
            <v-tooltip activator="parent" location="bottom">{{ word?.word?.translation }}</v-tooltip>
          </button>
        </div>
        <p class="have-not-words" v-if="!words.length && !isActiveLoading">У вас пока нет слов, перейдите в словарь, что
          бы добавить новые слова.
        </p>

        <div class="wrapper-loader" v-if="!words.length && isActiveLoading">
          <LoaderSpiner></LoaderSpiner>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import LoaderSpiner from "@/components/widgets/LoaderSpiner";
import {onMounted, ref, watch} from "vue";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";
import taskRequests from "@/mixins/requests/taskRequests";

const {getAllUsersWords} = dictionaryRequests();
const dictionary = dictionaryStore();
const {words, isActiveLoading} = storeToRefs(dictionary);
// eslint-disable-next-line
const emit = defineEmits(['hiddenBlock']);
const {taskStart} = taskRequests();

let isOpenDialog = ref(true);

onMounted(() => {
  getAllUsersWords();
})

watch(isOpenDialog, () => {
  if (!isOpenDialog.value) emit('hiddenBlock', false);
})

function openTask(id) {
  taskStart(6, id);
}

</script>

<style scoped lang="scss">

:deep(.v-card) {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none !important;
}

:deep(.v-overlay__content) {
  max-height: unset !important;
}

.word-list-dialog {
  width: 600px;
  max-height: 70vh;
  border-radius: 20px;
  background-color: var(--light_pink);
  padding: 25px 20px;
  border: 1px solid var(--dark);

  h3 {
    color: var(--dark-pink);
    font-weight: 800;
    font-size: 20px;
  }

  .wrapper-words {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;

    button {
      color: var(--yellow);
      padding: 5px 10px;
      border-radius: 10px;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      background-color: var(--pink);
      transition: all 0.2s;

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(4px);
      }

      &:hover {
        background-color: var(--dark-pink);
      }
    }
  }

  .have-not-words {
    color: var(--dark-pink);
    font-size: 17px;
    font-weight: 800;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    background-color: var(--light_pink);
    border: 2px solid var(--dark-pink);
    margin-top: 20px;
  }

  .wrapper-loader {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 700px) {
  .word-list-dialog {
    width: 100%;
    max-width: 700px;
    max-height: 70vh;
    padding: 25px 15px;

    h3 {
      text-align: center;
    }

    .wrapper-words {
      gap: 15px;
    }
  }
}
</style>
