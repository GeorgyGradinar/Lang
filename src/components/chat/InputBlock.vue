<template>
  <div class="input-block">
    <div class="wrapper-input">
      <input v-model="messageToBot"
             v-if="!isActiveRecord"
             @keydown.enter="sendMessageToNetwork">

      <div class="record" v-if="isActiveRecord">
        <div class="marker"></div>
        <p class="timer">{{ second }},{{ ms }}</p>
      </div>

      <div class="wrapper-buttons">
        <!--        <button class="trash" @click="deleteRecord" :class="{'show': isActiveRecord}">-->
        <!--          <img src="img/chart/trash.svg" alt="trash">-->
        <!--        </button>-->

        <button class="sendMessage show"
                @click="sendMessageToNetwork">
          <img src="img/chart/send.svg" alt="send">
        </button>

        <!--        <button class="sendMessage"-->
        <!--                :class="{'show': isActiveRecord || !!messageToBot}"-->
        <!--                @click="sendMessageToNetwork">-->
        <!--          <img src="img/chart/send.svg" alt="send">-->
        <!--        </button>-->

        <!--        <button class="micro"-->
        <!--                :class="{ 'show': !messageToBot && !isActiveRecord}"-->
        <!--                @click="toggleActiveRecord">-->
        <!--          <img src="img/chart/mic.svg" alt="micro">-->
        <!--        </button>-->
      </div>
    </div>
  </div>

  <AllowMicrophoneMessage :isShowMessage="isShowMessage"></AllowMicrophoneMessage>
</template>

<script setup>
import {ref} from "vue";
import {chatStore} from "@/store/chatStore";
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";
import dialogsRequests from "@/mixins/requests/dialogsRequests";
import AllowMicrophoneMessage from "@/components/chat/AllowMicrophoneMessage";
import {useRouter} from "vue-router/dist/vue-router";
import {notificationStore} from "@/store/notificationStore";
import {LESSON} from "@/configuration/Routers";

// eslint-disable-next-line no-undef
const emit = defineEmits(['scrollDown']);
const chat = chatStore();
const {addNewMessage, changeActiveGeneration} = chat;
const {
  isActiveGeneration,
} = storeToRefs(chat);
const taskStore = tasksStore();
const {currentTask} = storeToRefs(taskStore);
const notifications = notificationStore();
const {openSnackBarReject} = notifications;
const {sendMessage, sendMessageToTask} = dialogsRequests();
const router = useRouter();

let messageToBot = ref('');
let timer = ref(0);
let timerInterval;
let ms = ref(0);
let second = ref(0);
let isActiveRecord = ref(false);
let isDeleteRecord = ref(false);
let isShowMessage = ref(false);
let stream = ref(null);

let audioRecorder = ref();
let audioChunks = ref([]);
let isAllowMicrophone = ref(false);

function getAllowForMicrophone(isStartRecord = false) {
  navigator.mediaDevices.getUserMedia({audio: true})
      .then(activeStream => {
        isAllowMicrophone.value = true;
        audioRecorder.value = '';
        stream.value = activeStream;
        audioRecorder.value = new MediaRecorder(activeStream);
        audioRecorder.value.addEventListener('dataavailable', handleRecord);
        audioRecorder.value.addEventListener('stop', handleStopRecord);
        if (isStartRecord) {
          toggleActiveRecord();
        }
      })
      .catch(() => {
        isAllowMicrophone.value = false;
        activeMessageForMicrophone();
      })
}

function sendMessageToNetwork() {
  if (currentTask.value?.status === "success") {
    openSnackBarReject('Задание уже выполнено');
    return;
  } else if (currentTask.value?.status === "failed") {
    openSnackBarReject('Задание завершено');
    return;
  }

  if (isCyrillic(messageToBot.value) && router.currentRoute.value.path === LESSON) {
    openSnackBarReject('В заданиях пишите только на английском');
    return;
  }

  if (!messageToBot.value.trim().length && !isActiveRecord.value) return;
  if (isActiveGeneration.value) return;

  if (isActiveRecord.value) {
    toggleActiveRecord();
  } else {
    addNewMessage(messageToBot.value, null, false, new Date, false);
    if (router.currentRoute.value.path === LESSON) {
      sendMessageToTask(messageToBot.value);
    } else {
      sendMessage(messageToBot.value);
    }
    changeActiveGeneration(true);
  }

  messageToBot.value = '';
  emit('scrollDown');
}

function isCyrillic(message) {
  return /[а-я]/i.test(message);
}

function handleRecord(event) {
  audioChunks.value.push(event.data);

  const blobObj = new Blob(audioChunks.value, {type: 'audio/mp3'});
  const audioUrl = URL.createObjectURL(blobObj);

  if (!isDeleteRecord.value) {
    addNewMessage({
      isBot: false,
      isText: false,
      message: audioUrl,
      errorMessage: ''
    });
  }

  isDeleteRecord.value = false;
  audioChunks.value = [];
}

function handleStopRecord() {
  stream.value.getAudioTracks().forEach(function (track) {
    track.stop();
  });
  audioRecorder.value.removeEventListener('dataavailable', handleRecord);
  audioRecorder.value.removeEventListener('stop', handleStopRecord);
  emit('scrollDown');
}

function toggleActiveRecord() {
  if (!isAllowMicrophone.value) {
    getAllowForMicrophone(true);
    return;
  }

  if (isActiveRecord.value) {
    isActiveRecord.value = false;
    stopTimer();
    audioRecorder.value.stop();
    isAllowMicrophone.value = false;
  } else {
    isActiveRecord.value = true;
    startTimer();
    audioRecorder.value.start();
  }
}

// eslint-disable-next-line no-unused-vars
function deleteRecord() {
  isDeleteRecord.value = true;
  toggleActiveRecord();
}

let activeTimeOut = ref(null);

function activeMessageForMicrophone() {
  if (activeTimeOut.value) {
    clearTimeout(activeTimeOut.value);
  }

  isShowMessage.value = true;
  activeTimeOut.value = setTimeout(() => {
    isShowMessage.value = false;
  }, 2000);
}

function startTimer() {
  stopTimer();
  timerInterval = setInterval(function () {
    timer.value += 1 / 60;
    ms.value = Math.floor((timer.value - Math.floor(timer.value)) * 10);
    second.value = Math.floor(timer.value);
  }, 1000 / 60);
}

function stopTimer() {
  clearInterval(timerInterval);
  timer.value = 0;
  ms.value = 0;
  second.value = 0;
}
</script>

<style scoped lang="scss">
.input-block {
  display: flex;
  padding: 10px;

  .record {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100px;
    height: 50px;

    .marker {
      width: 20px;
      height: 20px;
      background-color: var(--red);
      border-radius: 50%;
      animation: pulse 1s infinite linear;
    }
  }

  .wrapper-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 1px solid var(--light-gray);
    padding: 5px;

    input {
      width: 100%;
      color: var(--light-gray);

      &:focus {
        outline: none;
      }
    }

    .wrapper-buttons {
      display: flex;

      .trash {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 0;
        height: 35px;
        opacity: 0;
        background-color: rgba(89, 155, 255, 0);
        border-radius: 50%;
        transition: all 0.2s;
        overflow: hidden;

        img {
          width: 35px;
          height: 35px;
        }

        &:hover {
          transform: scale(0.9);
        }
      }

      .sendMessage {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0;
        height: 35px;
        opacity: 0;
        overflow: hidden;
        transition: all 0.2s;
        margin-right: 5px;

        img {
          width: 35px;
          height: 35px;
        }

        &:hover {
          transform: scale(0.9);
        }

        &:active {
          transform: scale(0.85);
        }
      }

      .micro {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        width: 0;
        height: 35px;
        opacity: 0;
        overflow: hidden;
        transition: all 0.2s;

        img {
          width: 35px;
          height: 35px;
        }

        &:hover {
          transform: scale(0.9);
        }

        &:active {
          transform: scale(0.85);
        }
      }

      .show {
        width: 35px;
        opacity: 1;
      }
    }
  }


  @keyframes pulseShadow {
    0% {
      -moz-box-shadow: 0 0 0 0 var(--red);
      box-shadow: 0 0 0 0 var(--red);
    }
    70% {
      -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
      box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    }
    100% {
      -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
      box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      -moz-box-shadow: 0 0 0 0 var(--red);
      box-shadow: 0 0 0 0 var(--red);
    }
    70% {
      transform: scale(0.9);
      opacity: 0.4;
      -moz-box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
      box-shadow: 0 0 0 10px rgba(204, 169, 44, 0);
    }
    100% {
      transform: scale(1);
      -moz-box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
      box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
    }
  }

}
</style>
