<template>
  <div class="wrapper-chart">
    <h3>ИИ-репетитор</h3>
    <div class="chart">
      <div class="wrapper-messages" ref="messagesBlock">
        <div class="wrapper-message" v-for="message in messages" :key="message.id">
          <template v-if="message.isText">
            <p class="message" :class="{'person_message': !message.isBot}">{{ message.message }}</p>
            <template v-if="!message.isBot">
              <p class="error-message" v-if="message.errorMessage">{{ message.errorMessage }}</p>
              <p class="done-message" v-else>Верно составлено</p>
            </template>
          </template>
          <template v-else>
            <div class="message sound-message" :class="{'person_message': !message.isBot}">
              <Vue3WaveAudioPlayer
                  :wave_width="200"
                  :wave_height="40"
                  :wave_options='{"samples":40,"type":"steps","width":192,"height":40}'
                  :src="message.message"
                  :disable_seeking="false"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="input-block">

      <div class="wrapper-input">
        <input v-model="messageToBot"
               v-if="!isActiveRecord"
               @keydown.enter="sendMessage">

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
                  @click="sendMessage">
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
  <div class="allow_microphone_message" :class="{'show-message': isShowMessage}">
    <p>Пожалуйста, разрешите доступ к своему микрофону</p>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useChart} from '@/store/chart';
import {storeToRefs} from "pinia/dist/pinia";
import Vue3WaveAudioPlayer from 'vue3-wave-audio-player';

const chart = useChart();
const {addMessage} = chart;
const {messages} = storeToRefs(chart);

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

onMounted(() => {

})

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

function sendMessage() {
  if (!messageToBot.value.trim().length && !isActiveRecord.value) return;

  if (isActiveRecord.value) {
    toggleActiveRecord();
  } else {
    addMessage({
      isBot: false,
      isText: true,
      message: messageToBot.value,
      errorMessage: ''
    });
  }

  messageToBot.value = '';
  scrollDown();
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
  width: 60%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  background-color: var(--light_pink);
  color: var(--dark);

  h3 {
    margin: 10px 20px;
  }

  .chart {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 686px;
    border-top: 1px solid var(--dark);
    border-bottom: 1px solid var(--dark);
    padding: 10px;
    overflow: hidden;

    .wrapper-messages {
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-gutter: stable;
      padding-right: 10px;

      .wrapper-message {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
        margin-bottom: 10px;

        .message {
          align-self: flex-start;
          background-color: var(--yellow);
          border-radius: 20px;
          padding: 5px 10px;
          border: 1px solid var(--dark);
          box-shadow: 1px 4px 1px var(--dark);
          max-width: 60%;
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

.allow_microphone_message {
  display: flex;
  position: absolute;
  top: 50%;
  left: calc(50% - 225px);
  background-color: rgba(35, 35, 35, 0.6);
  padding: 10px;
  border-radius: 10px;
  opacity: 0;
  z-index: -1;
  transition: all 0.6s;

  p {
    display: flex;
  }
}

.show-message {
  opacity: 1;
  z-index: 1;
}
</style>
