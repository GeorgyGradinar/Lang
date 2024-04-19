<template>
  <v-dialog
      v-model="isOpenConfirmEmailModal"
      width="auto"
      persistent
  >
    <div class="confirm-email-modal">
      <div class="email">
        <p>Подтвердите почту</p>
        <p>{{ person?.email }}</p>
      </div>

      <div class="send-verify-message">
        <button v-if="minutes || seconds" class="secondary-button">
          Отправить повторно через: {{ addZero(minutes) }} : {{ addZero(seconds) }}
        </button>
        <button v-if="!minutes && !seconds" class="secondary-button" @click="sendOneMoreTime">
          Отправить повторно
        </button>

        <button class="secondary-button logout" @click="logout">Выйти</button>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
import {notificationStore} from "@/store/notificationStore";
import {storeToRefs} from "pinia/dist/pinia";
import {mainStore} from "@/store/mainStore";
import {ref, watch} from "vue";
import authRequests from "@/mixins/requests/authRequests";
import shared from "@/mixins/shared";

const notifications = notificationStore();
const {changeShowConfirmEmailModal} = notifications;
const {isOpenConfirmEmailModal} = storeToRefs(notifications);
const main = mainStore();
const {person} = storeToRefs(main);
const {sendMessageToEmail} = authRequests();
const {prepareForLogout} = shared();

const sixteenSeconds = 60;

let minutes = ref(0);
let seconds = ref(0);

watch(isOpenConfirmEmailModal, () => {
  if (isOpenConfirmEmailModal.value) {
    minutes.value = 1;
    startTimer();
  }
})

function startTimer() {
  if (!seconds.value) {
    if (minutes.value) {
      minutes.value = minutes.value - 1;
      seconds.value = sixteenSeconds;
    }
  } else {
    seconds.value = seconds.value - 1;
  }

  if (seconds.value) {
    setTimeout(() => {
      startTimer();
    }, 1000)
  }
}

function addZero(number) {
  return number < 10 ? `0${number}` : number;
}

function sendOneMoreTime() {
  sendMessageToEmail()
      .then(() => {
        minutes.value = 1;
        startTimer();
      })
}

function logout() {
  changeShowConfirmEmailModal(false);
  prepareForLogout();
}
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

.confirm-email-modal {
  width: 450px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 25px;
  background-color: var(--light-yellow);
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  .email {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    font-size: 17px;
    margin-bottom: 25px;

    p {
      color: var(--dark-pink);
      font-size: 19px;
      font-weight: 800;
    }
  }

  .send-verify-message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    .secondary-button {
      background-color: var(--pink);
      color: var(--light-yellow);

      &:hover {
        background-color: var(--dark-pink);
      }
    }

    .logout {
      background-color: var(--light-red);
      color: var(--dark-pink);
      font-weight: 800;

      &:hover {
        background-color: var(--red);
      }
    }
  }
}

@media screen and (min-width: 2200px) {
  .confirm-email-modal {
    width: 600px;
    padding: 50px;

    .email {
      gap: 15px;
      margin-bottom: 40px;

      p {
        font-size: 28px;
      }
    }

    .send-verify-message {
      .secondary-button {
        font-size: 23px;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .confirm-email-modal {
    width: 300px;

    .email {

      p {
      }
    }

    .send-verify-message {

      .secondary-button {

      }
    }
  }
}
</style>
