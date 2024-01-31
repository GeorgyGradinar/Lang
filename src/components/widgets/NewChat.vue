<template>
  <div class="wrapper-chart animate__animated animate__bounceInRight">
    <div class="title-chat">
      <h3>ИИ-репетитор</h3>

      <img v-if="isMiniChat" src="img/chart/close.svg" alt="close" @click="emit('closeMini')">
      <div class="wrapper-messages-counter" v-if="!isMiniChat">
        <p>Использованно сообщений</p>
        <p> {{ messages.length }} / {{ allowCountMessages }}</p>
      </div>
    </div>

    <div class="chat" :class="{'size-mini': isMiniChat}">
      <div class="wrapper-messages" ref="messagesBlock">
        <div class="wrapper-message"
             v-for="message in messages" :key="message.id">
          <!--          <template v-if="message.isText">-->
          <div class="message animate__animated animate__bounceInLeft"
               :class="{'person_message animate__bounceInRight': !message.is_bot}">
            <p v-for="word in message.message" :key="word.id"
               @click="openOptionBlock($event, word)">
              {{ word }}
            </p>
          </div>
          <template v-if="!message.is_bot">
            <p class="error-message animate__animated animate__bounceInRight" v-if="message.errorMessage">
              {{ message.errorMessage }}
            </p>
            <p class="done-message animate__animated animate__bounceInRight" v-else>Верно составлено</p>
          </template>
          <!--          </template>-->
          <!--          <template v-else>-->
          <!--            <div class="message sound-message animate__animated animate__bounceInLeft"-->
          <!--                 :class="{'person_message animate__bounceInRight': !message.isBot}">-->
          <!--              <Vue3WaveAudioPlayer-->
          <!--                  :wave_width="200"-->
          <!--                  :wave_height="40"-->
          <!--                  :wave_options='{"samples":40,"type":"steps","width":192,"height":40}'-->
          <!--                  :src="message.message"-->
          <!--                  :disable_seeking="false"-->
          <!--              />-->
          <!--            </div>-->
          <!--          </template>-->
        </div>
      </div>
    </div>
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
          <button class="trash" @click="deleteRecord" :class="{'show': isActiveRecord}">
            <img src="img/chart/trash.svg" alt="">
          </button>

          <button class="sendMessage"
                  :class="{'show': isActiveRecord || !!messageToBot}"
                  @click="sendMessageToNetwork">
            <img src="img/chart/send.svg" alt="">
          </button>

          <button class="micro"
                  :class="{ 'show': !messageToBot && !isActiveRecord}"
                  @click="toggleActiveRecord">
            <img src="img/chart/mic.svg" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
  <AllowMicrophoneMessage :isShowMessage="isShowMessage"></AllowMicrophoneMessage>
  <OptionWordBlock ref="optionBlock"
                   :topPosition="top"
                   :leftPosition="left"
                   :word="currentWord?.innerHTML">
  </OptionWordBlock>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useChart} from '@/store/chart';
import {chatStore} from "@/store/chatStore";
import {storeToRefs} from "pinia/dist/pinia";
// eslint-disable-next-line no-unused-vars
import Vue3WaveAudioPlayer from 'vue3-wave-audio-player';
import dialogsRequests from "@/mixins/requests/dialogsRequests";
import AllowMicrophoneMessage from "@/components/chat/AllowMicrophoneMessage";
import OptionWordBlock from "@/components/chat/OptionWordBlock";
import {onClickOutside} from '@vueuse/core'

// eslint-disable-next-line no-undef
const emit = defineEmits(['closeMini']);
// eslint-disable-next-line no-undef,no-unused-vars
const prop = defineProps({
  isMiniChat: Boolean
});
// eslint-disable-next-line no-unused-vars
const chat = chatStore();
const {messages} = storeToRefs(chat);
// eslint-disable-next-line no-unused-vars
const {sendMessage, getMessageFormNetwork, deleteMessages} = dialogsRequests();

const chart = useChart();
const {addMessage} = chart;
const {getMessages} = dialogsRequests();

let messageToBot = ref('');
let timer = ref(0);
let timerInterval;
let ms = ref(0);
let second = ref(0);
let isActiveRecord = ref(false);
let isDeleteRecord = ref(false);
let isShowMessage = ref(false);
// eslint-disable-next-line no-unused-vars
let stream = ref(null);

let audioRecorder = ref();
let audioChunks = ref([]);
let messagesBlock = ref(null);
let isAllowMicrophone = ref(false);
let top = ref(637);
let left = ref(null);
let allowCountMessages = ref(15);

let currentWord = ref();
let optionBlock = ref(null);

onMounted(() => {
  getMessages();
})

onClickOutside(optionBlock, event => {
  if (JSON.stringify(event.target) !== JSON.stringify(currentWord.value)) {
    top.value = null;
  }
})

function openOptionBlock(event) {
  top.value = event.y - 140;
  left.value = event.x - 100;
  currentWord.value = event.target;
}

function getAllowForMicrophone(isStartRecord = false) {
  navigator.mediaDevices.getUserMedia({audio: true})
      .then(activeStream => {
        isAllowMicrophone.value = true;
        audioRecorder.value = ''
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
  if (!messageToBot.value.trim().length && !isActiveRecord.value) return;

  deleteMessages()
  // getMessageFormNetwork();
  // sendMessage(messageToBot.value);

  // if (isActiveRecord.value) {
  //   toggleActiveRecord();
  // } else {
  //   addMessage({
  //     isBot: false,
  //     isText: true,
  //     message: messageToBot.value,
  //     errorMessage: ''
  //   });
  // }
  //
  // messageToBot.value = '';
  // scrollDown();
}

// eslint-disable-next-line no-unused-vars
function handleRecord(event) {
  audioChunks.value.push(event.data)

  const blobObj = new Blob(audioChunks.value, {type: 'audio/mp3'});
  const audioUrl = URL.createObjectURL(blobObj);

  if (!isDeleteRecord.value) {
    addMessage({
      isBot: false,
      isText: false,
      message: audioUrl,
      errorMessage: ''
    });
  }

  isDeleteRecord.value = false;
  audioChunks.value = [];
}

// eslint-disable-next-line no-unused-vars
function handleStopRecord() {
  stream.value.getAudioTracks().forEach(function (track) {
    track.stop();
  });
  audioRecorder.value.removeEventListener('dataavailable', handleRecord);
  audioRecorder.value.removeEventListener('stop', handleStopRecord);
  scrollDown();
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

function scrollDown() {
  setTimeout(() => {
    messagesBlock.value.scrollTo({
      top: messagesBlock.value.scrollHeight,
      behavior: "smooth"
    });
  }, 0)
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
.wrapper-chart {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  background-color: var(--light_pink);
  color: var(--dark);

  .title-chat {
    display: flex;
    justify-content: space-between;
    margin: 10px 20px;

    h3 {

    }

    img {
      width: 30px;
      height: 30px;
      transition: all 0.2s;

      &:hover {
        transform: scale(1.2);
      }
    }

    .wrapper-messages-counter {
      display: flex;
      gap: 10px;

      p {
        font-weight: 800;
        font-size: 18px;
      }
    }
  }

  .chat {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
    width: 100%;
    border-top: 1px solid var(--dark);
    border-bottom: 1px solid var(--dark);
    overflow: hidden;

    .wrapper-messages {
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-gutter: stable;
      padding: 5px 10px 0 10px;

      .wrapper-message {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
        margin-bottom: 10px;

        .message {
          display: flex;
          flex-wrap: wrap;
          align-self: flex-start;
          background-color: var(--yellow);
          border-radius: 20px;
          padding: 5px 10px;
          border: 1px solid var(--dark);
          box-shadow: 1px 4px 1px var(--dark);
          max-width: 60%;

          p {
            position: relative;
            margin-right: 5px;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              color: var(--red);
            }
          }
        }

        .sound-message {
          padding: 5px 10px 0 10px;
        }

        .error-message,
        .done-message {
          margin-top: 3px;
          color: red;
          font-size: 12px;
        }

        .done-message {
          color: #67f967;
        }

        .person_message {
          align-self: flex-end;
        }

        :deep(.player) {
          #duration,
          #current-time {
            opacity: 0;
            margin: 0;
            min-width: 0;
            width: 0;
          }

          #play {
            padding: 0;

            svg {
              fill: var(--green);
            }
          }

          #slider {
            svg {
              #path1 {
                stroke: #232323;
              }

              #path2 {
                stroke: #00c6ad;
              }
            }
          }

          #seek-slider::-webkit-slider-thumb {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            -webkit-appearance: none;
            cursor: ew-resize;
            background: var(--green);
          }
        }
      }
    }
  }

  .size-mini {
    height: 475px;
    flex: unset;

    .wrapper-messages {
      .wrapper-message {
        :deep(.player) {
          #slider {
            svg {
              width: 150px;
            }
          }
        }
      }
    }
  }

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
      border: 1px solid var(--dark);
      padding: 5px;

      input {
        width: 100%;

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
}
</style>
