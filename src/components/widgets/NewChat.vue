<template>
  <div class="wrapper-chart" :class="{'animate__animated animate__bounceInRight': !(isMiniChat || isMainPageChat)}">

    <div class="mobile-nav-block">
      <button @click="cancelTask">
        <img src="img/chart/redo.svg" alt="arrow">
        вернуться
      </button>

      <button @click="openMoreInformationBlock(true)">
        Информация
      </button>
    </div>

    <div class="title-chat">

      <TimerLesson></TimerLesson>

      <img v-if="isMiniChat" src="img/chart/close.svg" alt="close" @click="emit('closeMini')">

      <div class="wrapper-messages-counter" v-if="!isMiniChat">
        <p>Использованно сообщений</p>
        <p> {{ getCountUserMessages(messages) }} / {{ getCountLimitMessage() }}</p>
      </div>
    </div>

    <div class="chat" :class="{'size-mini': isMiniChat}">
      <div class="wrapper-messages" ref="messagesBlock">

        <CharacterBlock></CharacterBlock>

        <div class="wrapper-message"
             v-for="message in messages" :key="message?.id">
          <!--          <template v-if="message.isText">-->

          <div v-if="message.is_bot" class="bot-message animate__animated animate__fast animate__fadeInLeft">
            <div class="icon-bot">
              <img src="img/chart/Белый мужчина.webp">
              <v-tooltip activator="parent" location="bottom">{{ currentTask?.character_info }}</v-tooltip>
            </div>
            <div class="message">
              <span class="message-in-main-page"
                    v-if="router.currentRoute.value.path !== '/lesson'"
                    v-html="message.message">
              </span>

              <span v-else v-for="word in message.message" :key="word?.id"
                    @click="openOptionBlock($event, word)" v-html="word">
              </span>
            </div>
          </div>

          <div v-else class="person_message animate__animated animate__fast animate__fadeInRight">
            <div class="message"
                 :class="{
              'bg-done': message?.grading !== 'error',
              'bg-reject': message?.grading === 'error'
            }">
              <span>{{ message.message }}</span>
            </div>
            <CommentElement v-if="message?.spelling_comment" :comment="message"></CommentElement>
          </div>


          <!--          <template v-if="!message.is_bot">-->
          <!--            <p class="error-message animate__animated animate__bounceInRight" v-if="message.errorMessage">-->
          <!--              {{ message.errorMessage }}-->
          <!--            </p>-->
          <!--            <p class="done-message animate__animated animate__bounceInRight" v-else>Верно составлено</p>-->
          <!--          </template>-->
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
        <div class="wrapper-message" v-if="isActiveGeneration">
          <div class="typing-message">
            <div class="message animate__animated animate__fast animate__fadeInLeftBig">
              <TypingLoader></TypingLoader>
            </div>
          </div>
        </div>
      </div>
    </div>
    <InputBlock @scrollDown="scrollDown()"></InputBlock>

    <div class="wrapper-loader-for-message" v-if="isActiveLoaderMessageGeneration">
      <LoaderSpiner :is-yellow-color="true"></LoaderSpiner>
      <p class="text">Составляю вам задание<span class="dots"></span></p>
    </div>
  </div>

  <OptionWordBlock ref="optionBlock"
                   :topPosition="top"
                   :leftPosition="left"
                   :word="currentWord?.innerHTML">
  </OptionWordBlock>

  <Transition name="slide-fade">
    <div v-if="isOpenMoreInformationBlock" class="wrapper-mobile-detail-block">
      <TaskAndAnswer
          :isMobileBlock="true"
          @hiddenBlock="openMoreInformationBlock(false)">
      </TaskAndAnswer>
    </div>
  </Transition>
</template>

<script setup>
import {onBeforeUnmount, onMounted, onUnmounted, ref, watch} from "vue";
import {chatStore} from "@/store/chatStore";
import {storeToRefs} from "pinia/dist/pinia";
// eslint-disable-next-line no-unused-vars
import Vue3WaveAudioPlayer from 'vue3-wave-audio-player';
import dialogsRequests from "@/mixins/requests/dialogsRequests";
import OptionWordBlock from "@/components/chat/OptionWordBlock";
import {onClickOutside} from '@vueuse/core';
import TypingLoader from "@/components/chat/TypingLoader";
import InputBlock from "@/components/chat/InputBlock";
// import taskRequests from "@/mixins/requests/taskRequests";
import {useRouter} from "vue-router/dist/vue-router";
import {tasksStore} from "@/store/tasksStore";
import {TASKS, LESSON} from "@/configuration/Routers";
import TaskAndAnswer from "@/components/widgets/TaskAndAnswer";
import CommentElement from "@/components/chat/CommentElement";
import LoaderSpiner from "@/components/widgets/LoaderSpiner";
import CharacterBlock from "@/components/chat/CharacterBlock";
import TimerLesson from "@/components/chat/TimerLesson";

const router = useRouter();
// eslint-disable-next-line no-undef
const emit = defineEmits(['closeMini']);
// eslint-disable-next-line no-undef,no-unused-vars
const prop = defineProps({
  isMiniChat: Boolean,
  isMainPageChat: Boolean
});
const chat = chatStore();
const {changeCurrentPage, clearChatStore} = chat;
const {
  messages,
  messageLimit,
  isTriggerScrollDown,
  isActiveGeneration,
  isActiveLoaderMessageGeneration,
  currentPage,
  lastPage,
  triggerSaveScrollForPagination
} = storeToRefs(chat);
const taskStore = tasksStore();
const {changeCurrentTask} = taskStore;
const {currentTask} = storeToRefs(taskStore);
const {getMessages, getAllMessagesInTask} = dialogsRequests();
// const {taskShow} = taskRequests();

let messagesBlock = ref(null);
let top = ref(null);
let left = ref(null);

let currentWord = ref(null);
let optionBlock = ref(null);
let scrollPosition = ref(null);
let isOpenMoreInformationBlock = ref(false);

onMounted(() => {
  if (router.currentRoute.value.query.id && router.currentRoute.value.path === LESSON) {
    getAllMessagesInTask(router.currentRoute.value.query.id)
  } else {
    getMessages();
  }
  messagesBlock.value.addEventListener('scroll', handelScrollForPagination);
})

onClickOutside(optionBlock, () => {
  closeOptionBlock();
})

watch(isTriggerScrollDown, () => {
  scrollDown();
})

watch(triggerSaveScrollForPagination, () => {
  messagesBlock.value.scrollTop = scrollPosition.value;
  scrollPosition.value = null;
})

function cancelTask() {
  router.push({path: TASKS});
}

function handelScrollForPagination() {
  if (!messagesBlock.value.scrollTop) {
    if (currentPage.value < lastPage.value) {
      changeCurrentPage(currentPage.value + 1);
      getMessages(true);
      scrollPosition.value = event.target.scrollHeight - event.target.offsetHeight;
    }
  }
}

function openOptionBlock(event) {
  if (!event?.target?.className?.includes('english-word')) {
    return;
  }

  top.value = event.y - 160 + event.view.scrollY;
  left.value = event.x - 175;
  currentWord.value = event.target;
}

function closeOptionBlock() {
  top.value = null;
  left.value = null;
  currentWord.value = null;
}

function openMoreInformationBlock(isOpen) {
  isOpenMoreInformationBlock.value = isOpen;
}

function scrollDown() {
  setTimeout(() => {
    messagesBlock.value.scrollTo({
      top: messagesBlock.value.scrollHeight,
      behavior: "smooth"
    });
  }, 0)
}

function getCountUserMessages(messages) {
  return messages.filter(item => !item.is_bot).length;
}

function getCountLimitMessage() {
  if (router.currentRoute.value.path === '/lesson') {
    return currentTask.value?.task?.message_limit;
  } else {
    return messageLimit.value;
  }
}

onBeforeUnmount(() => {
  messagesBlock.value.removeEventListener('scroll', handelScrollForPagination);
})

onUnmounted(() => {
  closeOptionBlock();
  clearChatStore();
  changeCurrentTask(null);
})
</script>

<style lang="scss">


.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-150vw);
}

.wrapper-mobile-detail-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wrapper-chart {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border-radius: 10px;
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  background-color: var(--dark-pink);
  color: var(--dark);

  .mobile-nav-block {
    display: none;
    justify-content: space-between;
    padding: 10px;

    button {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px 10px;
      border-radius: 10px;
      background-color: var(--pink);
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      transition: all 0.2s;
      cursor: pointer;
      color: var(--white);

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }

      &:hover {
        background-color: var(--dark-pink);
      }

      img {
        width: 20px;
        height: 20px;
        transform: rotateY(180deg);
      }
    }
  }

  .title-chat {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    color: var(--light-gray);

    h3 {
      font-weight: 900;
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
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1;
    width: 100%;
    border-top: 1px solid var(--dark-pink);
    border-bottom: 1px solid var(--dark-pink);
    background-color: var(--pink);
    overflow: hidden;

    .wrapper-messages {
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-gutter: stable;
      padding: 5px 10px 0 10px;

      .wrapper-message {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-bottom: 10px;

        .bot-message {
          display: flex;
          align-items: flex-end;
          gap: 5px;

          .icon-bot {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            border: 3px solid var(--dark-pink);
            overflow: hidden;

            img {
              width: 100%;
              object-fit: cover;
            }
          }
        }

        .person_message {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          width: 100%;
        }

        .typing-message {
          display: flex;
        }

        .message {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          border-radius: 20px;
          padding: 5px 10px;
          border: 2px solid var(--dark);
          box-shadow: 1px 4px 1px var(--dark);
          max-width: 60%;
          background-color: var(--light-gray);

          span {
            position: relative;
            cursor: pointer;
            transition: all 0.2s;

            span.english-word:hover {
              color: var(--red);
            }
          }

          img {
            position: absolute;
            right: -5px;
            top: -8px;
            width: 20px;
          }

          .message-in-main-page {
            white-space: pre-wrap;
          }
        }

        .bg-done {
          background-color: var(--green);
        }

        .bg-reject {
          background-color: var(--light-red);
        }


        :deep(.animate__fast) {
          --animate-duration: 0.3s;
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
      padding: 5px 2px 0 2px;

      .wrapper-message {

        .message {
          max-width: 75%;
        }

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

  .wrapper-loader-for-message {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    background-color: rgba(163, 54, 214, 0.6);

    .text {
      display: flex;
      align-items: flex-end;
      color: var(--yellow);
      font-size: 18px;

      .dots {
        display: flex;
        width: 5px;
        margin-left: 14px;
        margin-bottom: 7px;
        aspect-ratio: 1;
        border-radius: 50%;
        animation: l5 2s infinite linear alternate;
      }

      @keyframes l5 {
        0% {
          box-shadow: 8px 0 #ffd073, -8px 0 #0002;
          background: #ffd073
        }
        33% {
          box-shadow: 8px 0 #0002, -8px 0 #ffd073;
          background: #0002
        }
        66% {
          box-shadow: 8px 0 #ffd073, -8px 0 #0002;
          background: #0002
        }
        100% {
          box-shadow: 8px 0 #0002, -8px 0 #ffd073;
          background: #ffd073
        }
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .wrapper-chart {

    .title-chat {

      h3 {
        font-size: 15px;
      }

      img {

        &:hover {

        }
      }

      .wrapper-messages-counter {

        p {
          font-size: 15px;
        }
      }
    }

    .chat {

      .wrapper-messages {

        .wrapper-message {

          .message {

            span {

              span.kuku:hover {

              }
            }
          }

          :deep(.animate__fast) {

          }

          .sound-message {

          }

          .error-message,
          .done-message {

          }

          .done-message {

          }

          .person_message {

          }

          :deep(.player) {
            #duration,
            #current-time {

            }

            #play {

              svg {

              }
            }

            #slider {
              svg {
                #path1 {

                }

                #path2 {

                }
              }
            }

            #seek-slider::-webkit-slider-thumb {

            }
          }
        }
      }
    }

    .size-mini {

      .wrapper-messages {
        .wrapper-message {
          :deep(.player) {
            #slider {
              svg {

              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .wrapper-chart {
    border-radius: unset;
    border: unset;

    .mobile-nav-block {
      display: flex;
    }

    .title-chat {

      h3 {

      }

      img {

        &:hover {

        }
      }

      .wrapper-messages-counter {

        p {

        }
      }
    }

    .chat {

      .wrapper-messages {

        .wrapper-message {

          .message {

            span {

              span.kuku:hover {

              }
            }
          }

          :deep(.animate__fast) {

          }

          .sound-message {

          }

          .error-message,
          .done-message {

          }

          .done-message {

          }

          .person_message {

          }

          :deep(.player) {
            #duration,
            #current-time {

            }

            #play {

              svg {

              }
            }

            #slider {
              svg {
                #path1 {

                }

                #path2 {

                }
              }
            }

            #seek-slider::-webkit-slider-thumb {

            }
          }
        }
      }
    }

    .size-mini {

      .wrapper-messages {
        .wrapper-message {
          :deep(.player) {
            #slider {
              svg {

              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 450px) {
  .wrapper-chart {

    .mobile-nav-block {
      button {
        font-size: 12px;
      }
    }

    .title-chat {

      h3 {
        font-size: 13px;
      }

      img {

        &:hover {

        }
      }

      .wrapper-messages-counter {

        p {
          display: flex;
          align-items: center;
          font-size: 11px;
        }
      }
    }

    .chat {

      .wrapper-messages {

        .wrapper-message {

          .message {

            span {

              span.kuku:hover {

              }
            }
          }

          :deep(.animate__fast) {

          }

          .sound-message {

          }

          .error-message,
          .done-message {

          }

          .done-message {

          }

          .person_message {

          }

          :deep(.player) {
            #duration,
            #current-time {

            }

            #play {

              svg {

              }
            }

            #slider {
              svg {
                #path1 {

                }

                #path2 {

                }
              }
            }

            #seek-slider::-webkit-slider-thumb {

            }
          }
        }
      }
    }

    .size-mini {

      .wrapper-messages {
        .wrapper-message {
          :deep(.player) {
            #slider {
              svg {

              }
            }
          }
        }
      }
    }
  }
}
</style>
