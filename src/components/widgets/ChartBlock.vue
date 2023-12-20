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
            <!--            <audio controls>-->
            <!--              <source :src="message.message" type="audio/ogg">-->
            <!--              <source :src="message.message" type="audio/mpeg">-->
            <!--              Your browser does not support the audio element.-->
            <!--            </audio>-->
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
      <div class="record" v-if="isActiveRecord">
        <div class="marker"></div>
        <p class="timer">{{ second }},{{ ms }}</p>
      </div>
      <div class="wrapper-input" v-if="!isActiveRecord">
        <input v-model="messageToBot" @keydown.enter="sendMessage">
        <button class="sendMessage" @click="sendMessage"><img src="/img/chart/send.svg" alt=""></button>
      </div>
      <button class="micro" @mousedown="toggleActiveRecord" @mouseup="toggleActiveRecord">
        <img src="/img/chart/mic.svg" alt="">
      </button>
    </div>
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

let audioRecorder = ref();
let audioChunks = ref([]);

let messagesBlock = ref(null);

// src="/sound/brown.mp3"

onMounted(() => {
  navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        audioRecorder.value = new MediaRecorder(stream);
        audioRecorder.value.addEventListener('dataavailable', handleRecord);
        audioRecorder.value.addEventListener('stop', handleStopRecord);
      })
})

function sendMessage() {
  if (!messageToBot.value) return;

  addMessage({
    isBot: false,
    isText: true,
    message: messageToBot.value,
    errorMessage: ''
  });

  messageToBot.value = '';

  setTimeout(() => {
    messagesBlock.value.scrollTo({
      top: messagesBlock.value.scrollHeight,
      behavior: "smooth"
    });
  }, 0)
}

function handleRecord(event) {
  audioChunks.value.push(event.data)

  const blobObj = new Blob(audioChunks.value, {type: 'audio/mp3'});
  console.log(blobObj)
  let audioUrl = URL.createObjectURL(blobObj);
  console.log(audioUrl)
  addMessage({
    isBot: false,
    isText: false,
    message: audioUrl,
    errorMessage: ''
  });
  audioChunks.value = [];
  // const audio = new Audio(audioUrl);
  // audio.play();
}

function handleStopRecord() {
  // let binary = convertDataURIToBinary(audioChunks.value[0]);
  // const blob = new Blob(audioChunks.value, {
  //   'type': 'audio/mp3'
  // });
  // let audioUrl = URL.createObjectURL(blob);

  // sendAudioFile(blob).then(response => {
  //   console.log(response)
  // })
  //     .catch(erro => {
  //       console.dir(erro)
  //     })
}

// function convertDataURIToBinary(dataURI) {
//   let BASE64_MARKER = ';base64,';
//   let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
//   let base64 = dataURI.substring(base64Index);
//   let raw = window.atob(base64);
//   let rawLength = raw.length;
//   let array = new Uint8Array(new ArrayBuffer(rawLength));
//
//   for (let i = 0; i < rawLength; i++) {
//     array[i] = raw.charCodeAt(i);
//   }
//   return array;
// }

// const sendAudioFile = file => {
//   const formData = new FormData();
//   formData.append('audio-file', file);
//   return fetch('http://localhost:3000/audioUpload', {
//     method: 'POST',
//     body: formData
//   });
// };

function toggleActiveRecord() {
  if (event.buttons === 1) {
    isActiveRecord.value = true;
    startTimer();
    audioRecorder.value.start();
  } else {
    isActiveRecord.value = false;
    stopTimer();
    audioRecorder.value.stop();
  }
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
      width: 100%;
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
      width: 100%;
      height: 50px;
      border-radius: 10px;
      border: 1px solid var(--dark);
      padding: 5px;
      margin: 0 10px 0 0;

      input {
        width: 100%;

        &:focus {
          outline: none;
        }
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        margin-right: 5px;

        img {
          width: 35px;
          height: 35px;
        }

        &:active {
          transform: scale(0.85);
        }
      }
    }

    .micro {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      width: 50px;
      height: 50px;
      border: 1px solid var(--dark);
      box-shadow: 0 0 0 rgba(204, 169, 44, 0.4);
      overflow: hidden;
      transition: all 0.2s;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background-color: var(--red);
        border-radius: 50%;
        transition: all 0.6s;
        z-index: 1;
      }

      img {
        width: 35px;
        height: 35px;
        transition: all 0.2s;
        z-index: 2;
      }

      &:active {
        animation: pulseShadow 1s infinite linear;
        border: 1px solid var(--red);
        border-radius: 50%;

        img {
          transform: scale(0.85);
        }

        &:after {
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
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
      }
      70% {
        transform: scale(0.9);
        opacity: 0.4;
      }
      100% {
        transform: scale(1);
      }
    }

  }
}
</style>
