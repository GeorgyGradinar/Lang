<template>
  <div class="wrapper-task-and-answer animate__animated animate__bounceInLeft"
       :class="{'mobile-block': isMobileBlock}">
    <div>
      <div class="wrapper-title">
        <h3>{{ currentTask?.task?.type?.title }} №{{ currentTask?.id }}</h3>

        <button v-if="isMobileBlock" @click="emit('hiddenBlock')">
          закрыть
        </button>
      </div>
      <div class="task">
        <div class="wrapper-theme">
          <p>Тема:</p>
          <p>{{ currentTask?.task?.title }}</p>
        </div>

        <div class="wrapper-task-description">
          <p>Задание:</p>
          <p>{{ currentTask?.task?.description }}</p>
        </div>

        <div class="wrapper-task-description" v-if="currentTask?.character_info ">
          <p>Персонаж:</p>
          <p>{{ currentTask?.character_info }}</p>
        </div>

        <div class="wrapper-task-word" v-if="currentTask?.user_word">
          <p>Изучаемое слово:</p>
          <p>{{ currentTask?.user_word.word.word }}</p>
        </div>

        <div class="wrapper-condition-reject" v-if="currentTask?.task?.defeat_condition">
          <p>Условия поражения:</p>
          <p>{{ currentTask?.task?.defeat_condition }}</p>
        </div>
      </div>

      <!--      <div class="answer">-->
      <!--        <p>Введите ваш ответ:</p>-->
      <!--        <textarea v-model="answer"-->
      <!--                  @input="autoGrow"-->
      <!--                  ref="textarea"-->
      <!--                  placeholder="Ваш ответ">-->
      <!--        </textarea>-->
      <!--        <button @click="submitResult">Отправить</button>-->
      <!--      </div>-->
      <div class="wrapper-counter-message">
        <div class="counter">
          <img src="img/chart/done.svg">
          <span>Без ошибок:</span>
          <span>{{ countDoneMessages }}</span>
        </div>
        <div class="counter">
          <img src="img/chart/reject.svg">
          <span>С ошибками:</span>
          <span>{{ countRejectMessages }}</span>
        </div>
      </div>
    </div>

    <div class="wrapper-button-back">
      <button @click="goBack">
        <img src="img/chart/redo.svg" alt="">
        вернуться в меню
      </button>
    </div>
  </div>

  <div class="wrapper-congraduation" v-if="isOpenFinalModal">
    <CongraduationModal :isOpenDialog="isOpenFinalModal" @closeDialog="closeFinalModal"></CongraduationModal>
  </div>

  <RejectModal></RejectModal>
</template>

<script setup>
import RejectModal from "@/components/modals/chat/RejectModal";
import {ref, watch} from "vue";
import {useRouter} from "vue-router/dist/vue-router";
import CongraduationModal from "@/components/modals/chat/CongraduationModal";
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";
import {chatStore} from "@/store/chatStore";

const router = useRouter();
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  isMobileBlock: Boolean
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['hiddenBlock']);
const taskStore = tasksStore();
const {changeIsOpenDialog} = taskStore;
const {currentTask, isOpenFinalModal} = storeToRefs(taskStore);
const chat = chatStore();
const {messages} = storeToRefs(chat);

let textarea = ref(null);
// eslint-disable-next-line no-unused-vars
let answer = ref('');

let countDoneMessages = ref(0);
let countRejectMessages = ref(0);

watch(messages, () => {
  if (messages.value.length) {
    const countersData = getCountDoneMessages();
    countDoneMessages.value = countersData.done ? countersData.done : 0;
    countRejectMessages.value = countersData.reject ? countersData.reject : 0;
  }
}, {deep: true, immediate: true})

// eslint-disable-next-line no-unused-vars
function autoGrow() {
  textarea.value.style.height = "45px";
  textarea.value.style.height = (textarea.value.scrollHeight) + "px";
}

// eslint-disable-next-line no-unused-vars
function submitResult() {
  setTimeout(() => {
    changeIsOpenDialog(true)
  }, 1000)
}

function getCountDoneMessages() {
  let countDone = null;
  let countReject = null;

  messages.value.forEach(message => {
    if (!message?.is_bot) {
      if (message?.grading === 'success') {
        countDone++
      } else if (message?.grading === 'error') {
        countReject++
      }
    }
  })

  return {done: countDone, reject: countReject};
}

function closeFinalModal() {
  changeIsOpenDialog(false);
  goBack();
}

function goBack() {
  router.back();
}
</script>

<style scoped lang="scss">
.wrapper-task-and-answer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: 100%;
  border-radius: 10px;
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  background-color: var(--dark-pink);
  color: var(--dark);
  padding: 20px;

  .wrapper-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 23px;
      font-weight: 900;
      margin-bottom: 20px;
      color: var(--yellow);
    }

    button {
      background-color: var(--pink);
      color: var(--white);
      padding: 5px;

      &:hover {
        background-color: var(--dark-pink);
        color: var(--white);
      }
    }
  }

  .task {
    border-bottom: 1px solid var(--light-gray);
    margin-bottom: 30px;

    .wrapper-theme,
    .wrapper-task-description,
    .wrapper-task-word,
    .wrapper-condition-reject {
      display: flex;
      gap: 10px;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 20px;
      color: var(--yellow);

      p:first-child {
        color: var(--light-gray);
      }
    }

    .wrapper-condition-reject {
      color: var(--light-red);

      p:first-of-type {
        white-space: nowrap;
      }
    }
  }

  .wrapper-counter-message {
    .counter {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 25px;
      }

      span {
        color: var(--yellow);

        &:first-of-type {
          color: var(--light-gray);
        }
      }

      &:first-of-type {
        margin-bottom: 10px;
      }
    }
  }

  .answer {
    display: flex;
    flex-direction: column;
    gap: 20px;

    p {
      color: var(--light-gray);
    }

    textarea {
      width: 100%;
      resize: none;
      overflow: hidden;
      height: 45px;
      min-height: 100px;
      max-height: 300px;
      border: 2px solid var(--dark);
      background-color: var(--light-gray);
      color: var(--dark);
      padding: 0.6em;
      transition: border 0.2s;
      border-radius: 10px;

      &:focus {
        outline: none;
        border: 1px solid var(--dark);
      }
    }
  }

  .wrapper-button-back {
    button {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px 10px;
      background-color: var(--pink);
      color: var(--white);

      &:hover {
        background-color: var(--dark-pink);
      }

      img {
        width: 30px;
        height: 30px;
        transform: rotateY(180deg);
      }
    }
  }

  button {
    padding: 10px;
    border-radius: 10px;
    background-color: var(--green);
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.2s;
    cursor: pointer;

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }

    &:hover {
      color: var(--blue);
    }
  }
}

.wrapper-congraduation {
  position: absolute;
  width: 100vw;
  height: 100vh;
}

@media screen and (max-width: 1100px) {
  .wrapper-task-and-answer {
    padding: 15px;

    h3 {

    }

    .task {
      margin-bottom: 10px;

      .wrapper-theme,
      .wrapper-task-description {
        margin-bottom: 15px;

        p:first-child {

        }
      }
    }

    .answer {
      gap: 10px;

      p {

      }

      textarea {

      }

      button {
        padding: 7px;
        font-size: 13px;
      }
    }

    .wrapper-button-back {
      button {

        img {

        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .wrapper-task-and-answer {
    display: none;

    h3 {

    }

    .task {

      .wrapper-theme,
      .wrapper-task-description {

        p:first-child {

        }
      }
    }

    .answer {

      p {

      }

      textarea {

      }

      button {

      }
    }

    .wrapper-button-back {
      button {

        img {

        }
      }
    }
  }

  .mobile-block {
    display: flex;
    position: absolute;
    top: 82px;
    left: 0;
    width: 100vw;
    height: calc(100% - 82px);
    border-radius: unset;
    border: unset;
  }
}
</style>
