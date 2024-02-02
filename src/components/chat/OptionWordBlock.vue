<template>
  <div v-if="topPosition" id="option-block" class="option-block"
       :style="{'top': `${topPosition}px`, 'left': `${leftPosition}px`}">
    <div class="wrapper-option-word">
      <SoundComponent :word="sound"></SoundComponent>
      <p>{{ word }}</p>
    </div>

    <div class="wrapper-option-word">
      <template v-if="!isActiveSearching">
        <SoundComponent :word="sound"></SoundComponent>
        <p>{{ foundWord }}</p>
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
const {searchWord} = dictionaryRequests();
const chat = chatStore();
const {changeActiveSearching} = chat;
const {foundWord, isActiveSearching} = storeToRefs(chat);

const sound = {id: 0, title: 'Cloud', hint: 'подсказка1', sound: 'sound/black.mp3', path: '/lesson'};

watch(topPosition, () => {
  changeActiveSearching(true);
  searchWord('приглашение', true);
})
</script>

<style scoped lang="scss">
.option-block {
  position: absolute;
  width: 200px;
  background-color: var(--light-yellow);
  padding: 10px;
  border-radius: 10px;
  border: 2px solid var(--dark);

  .wrapper-option-word {
    display: flex;
    align-items: center;
    gap: 5px;
    border-bottom: 2px solid var(--dark);

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
  }
}
</style>
