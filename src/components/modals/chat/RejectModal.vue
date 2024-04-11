<template>
  <v-dialog
      v-model="isOpenRejectModal"
      width="auto"
  >
    <v-card>
      <v-card-text>
        <div class="dialog">
          <div class="title">
            <div class="reject-icon">
              <img src="img/chart/reject.svg" alt="">
            </div>

            <h2>Заданее провалено</h2>
          </div>
          <div class="wrapper-buttons">
            <button class="secondary-button" @click="exit">Выйти</button>
            <button class="secondary-button stay-in-chat"
                    @click="changeIsOpenRejectDialog(false)">
              Остаться в чате
            </button>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";
import {useRouter} from "vue-router/dist/vue-router";
import {TASKS} from "@/configuration/Routers";

const router = useRouter();
const taskStore = tasksStore();
const {changeIsOpenRejectDialog} = taskStore;
const {isOpenRejectModal} = storeToRefs(taskStore);

function exit() {
  changeIsOpenRejectDialog(false);
  router.push({path: TASKS});
}
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

:deep(.v-overlay__content) {
  .v-card {
    background-color: var(--dark-pink);
    border: 2px solid var(--dark);
    border-radius: 10px !important;
  }
}

.dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;

    .reject-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 50%;
      border: 4px solid var(--light-red);
    }

    h2 {
      color: var(--light-red);
    }
  }

  .wrapper-buttons {
    display: flex;
    gap: 10px;

    .secondary-button {
      padding: 5px 10px;
      background-color: var(--red);
      color: var(--light-yellow);

      &:hover {
        background-color: var(--pink);
      }
    }

    .stay-in-chat {
      background-color: var(--light_pink);
      color: var(--dark);

      &:hover {
        color: var(--light-yellow);
      }
    }
  }
}
</style>
