<template>
  <div class="bot-message animate__animated animate__fast animate__fadeInLeft">
    <div class="icon-bot">
      <img src="img/chart/Белый мужчина.webp">
      <v-tooltip v-if="currentTask?.character_info" activator="parent" location="bottom">
        {{ currentTask?.character_info }}
      </v-tooltip>
    </div>

    <div class="message">
      <span class="message-in-main-page"
            v-if="router.currentRoute.value.path !== LESSON"
            v-html="message.message">
      </span>

      <span v-else v-for="word in message.message" :key="word?.id"
            @click="emit('openOption', $event, word)" v-html="word">
      </span>

      <div class="wrapper-translate"
           ref="wrapperTranslate"
           :class="{'show-translate': isShowTranslate}">
        <p class="translate" ref="translateBlock" v-if="!isActiveTranslateLoader && message.translate">
          {{ message.translate }}
        </p>

        <div class="wrapper-loader-translate-message" v-if="isActiveTranslateLoader">
          <LoaderSpiner :less-margin="true"></LoaderSpiner>
        </div>
      </div>

      <button class="translate-all-message"
              @click="translateMessage(message.message_id)"
              v-if="router.currentRoute.value.path === LESSON">
        <img src="img/chart/translate.svg" alt="translate">
        <v-tooltip activator="parent" location="bottom">Перевести весь текст</v-tooltip>
      </button>
    </div>
  </div>
</template>

<script setup>
import LoaderSpiner from "@/components/widgets/LoaderSpiner";
import {tasksStore} from "@/store/tasksStore";
import {storeToRefs} from "pinia/dist/pinia";
import {useRouter} from "vue-router/dist/vue-router";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {ref, toRefs, watch} from "vue";
import {LESSON} from "@/configuration/Routers";

const router = useRouter();
const taskStore = tasksStore();
const {currentTask} = storeToRefs(taskStore);
// eslint-disable-next-line no-unused-vars
const {translateFullMessage} = dictionaryRequests();

// eslint-disable-next-line no-undef
const emit = defineEmits(['openOption']);
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  message: Object
})
const {message} = toRefs(props);

let isShowTranslate = ref(false);
let isActiveTranslateLoader = ref(false);
let wrapperTranslate = ref(null);
let translateBlock = ref(null);

watch(message, () => {
  isActiveTranslateLoader.value = false;
  setTimeout(() => {
    updateHeightMessage();
  })
}, {deep: true})

function translateMessage(id) {
  isShowTranslate.value = !isShowTranslate.value;

  if (message.value.translate) {
    updateHeightMessage();
  } else {
    isActiveTranslateLoader.value = true;
    wrapperTranslate.value.style.height = `${100}px`
    translateFullMessage(id);
  }
}

function updateHeightMessage() {
  wrapperTranslate.value.style.height = isShowTranslate.value ? `${translateBlock.value.clientHeight + 10}px` : 0;
}
</script>

<style scoped lang="scss">
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

  .message {
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

      span.line {
        width: 500px;
        white-space: pre-line;
      }
    }

    .message-in-main-page {
      white-space: pre-wrap;
    }

    .wrapper-translate {
      margin-top: 0;
      padding-top: 0;
      height: 0;
      width: 100%;
      overflow: hidden;
      transition: all 0.4s;

      &.show-translate {
        border-top: 1px solid var(--dark);
        margin-top: 10px;
        padding-top: 10px;
      }

      .translate {
        color: var(--dark-pink);
      }

      .wrapper-loader-translate-message {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .translate-all-message {
      position: absolute;
      opacity: 0;
      bottom: -7px;
      right: -15px;
      display: flex;
      border-radius: 10px;
      padding: 4px 6px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      background-color: var(--yellow);
      transition: all 0.2s;

      img {
        width: 20px;
      }

      &:hover {
        background-color: var(--light-yellow);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }

    }

    &:hover {
      .translate-all-message {
        opacity: 1;
      }
    }
  }
}
</style>
