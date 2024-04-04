<template>
  <v-dialog
      v-model="isOpenDialog"
      width="auto"
  >
    <v-card :class="'rounded-lg'">
      <div class="words-wrap">
        <p class="words__title">Группа слов {{ selectedGroupWords?.title }}</p>
        <wordlist-view
            :words="groupWords"
            :columns="3"
            :is-popup="true"
        />

        <div class="wrapper-button">
          <router-link to="/dictionary" class="secondary-button">
            Посмотреть больше слов &nbsp;&nbsp;&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"/>
            </svg>
          </router-link>

          <button class="secondary-button add-group" @click="addGroup"
                  :disabled="selectedGroupWords.in_dictionary"
                  :class="{'added-group': selectedGroupWords.in_dictionary}">
            <span v-if="selectedGroupWords.in_dictionary">Группа добавлена</span>
            <span v-else>Добавить группу</span>
          </button>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import WordlistView from '@/components/widgets/WordlistView.vue';
import {onUnmounted, ref, watch} from "vue";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";

const dictionary = dictionaryStore();
const {changeGroupWords, changeSelectedGroup} = dictionary;
const {groupWords, selectedGroupWords} = storeToRefs(dictionary);
const {addGroupToUser} = dictionaryRequests();
// eslint-disable-next-line
const emit = defineEmits(['hiddenBlock']);
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  groupName: String
})

let isOpenDialog = ref(true);

watch(isOpenDialog, () => {
  if (!isOpenDialog.value) emit('hiddenBlock', false);
})

function addGroup() {
  addGroupToUser(selectedGroupWords.value.id);
}

onUnmounted(() => {
  changeGroupWords([]);
  changeSelectedGroup(null);
})
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

:deep(.v-card) {
  background-color: rgba(0, 0, 0, 0);
  box-shadow: none !important;
}

:deep(.v-overlay__content) {
  max-height: unset !important;
}

.words-wrap {
  background-color: var(--light_pink);
  width: 100%;
  max-width: 950px;
  border-radius: 10px;
  padding: 35px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  .words__title {
    color: var(--dark-pink);
    font-size: 24px;
    font-weight: 900;
  }

  .wrapper-button {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .secondary-button {
      text-decoration: none;
      background-color: var(--pink);
      color: var(--light-yellow);

      svg {
        fill: var(--light-yellow);
        transition: fill 0.2s;
      }

      &:hover {
        background-color: var(--dark-pink);
      }
    }

    .add-group {
      background-color: var(--green);
      color: var(--dark-pink);

      &:hover {
        background-color: var(--yellow);
      }
    }

    .added-group {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);

      &:hover {
        background-color: var(--green);
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .words-wrap {
    height: 100%;
    max-height: 70vh;
    overflow: auto;

    .words__title {
      span {

      }
    }

    .secondary-button {
      svg {
      }
    }
  }
}
</style>
