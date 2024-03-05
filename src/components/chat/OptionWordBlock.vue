<template>
  <div v-if="topPosition" id="option-block" class="option-block"
       :style="{'top': `${topPosition}px`, 'left': `${leftPosition}px`}">
    <div class="wrapper-option-word">
      <SoundComponent :word="sound"></SoundComponent>
      <p class="find-word">{{ word }}</p>
    </div>

    <p>Перевод</p>
    <div class="wrapper-option-word">
      <template v-if="!isActiveSearching">
        <SoundComponent :word="sound"></SoundComponent>
        <p>{{ foundWord }}</p>
        <div class="add-word">
          <img src="img/dictionary/add.svg">
          <v-tooltip activator="parent" location="bottom">Добавить в аккаунт</v-tooltip>
        </div>
      </template>
      <LoaderCircle v-else></LoaderCircle>
    </div>


  </div>
</template>

<script setup>
import {toRefs, watch} from "vue";
import SoundComponent from "@/components/widgets/SoundComponent";
import LoaderCircle from "@/components/app/LoaderCircle";
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";
import {chatStore} from "@/store/chatStore";
import {storeToRefs} from "pinia/dist/pinia";

// eslint-disable-next-line no-undef
const props = defineProps({
  topPosition: Number,
  leftPosition: Number,
  word: String
})
const {topPosition, leftPosition, word} = toRefs(props);
// eslint-disable-next-line no-unused-vars
const {searchWord} = dictionaryRequests();
const chat = chatStore();
const {changeActiveSearching} = chat;
const {foundWord, isActiveSearching} = storeToRefs(chat);

const sound = {id: 0, title: 'Cloud', hint: 'подсказка1', sound: 'sound/black.mp3', path: '/lesson'};

watch(topPosition, () => {
  if (topPosition.value) {
    changeActiveSearching(true);
    // searchWord('приглашение', true);
  } else {
    changeActiveSearching(false);
  }
})
</script>

<style scoped lang="scss">
.option-block {
  position: absolute;
  width: 300px;
  background-color: var(--light-yellow);
  padding: 10px;
  border-radius: 10px;
  border: 2px solid var(--dark-pink);

  p {
    font-size: 13px;
    font-weight: 700;
    color: var(--dark-pink);
  }

  .wrapper-option-word {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    border-bottom: 2px solid var(--dark-pink);

    &:first-child {
      padding-bottom: 5px;
      margin-bottom: 5px;
    }

    &:last-child {
      border-bottom: unset;
    }

    p {
      color: var(--dark);
      font-weight: 700;
      font-size: 16px;
    }

    .find-word {
      flex: 1;
      margin-right: 20px;
      text-align: center;
    }

    .add-word {
      display: flex;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      border-radius: 10px;
      padding: 5px;
      transition: all 0.2s;
      background-color: var(--dark-pink);
      cursor: pointer;

      img {
        width: 20px;
        height: 20px;
        fill: var(--white);
      }
    }
  }
}
</style>
