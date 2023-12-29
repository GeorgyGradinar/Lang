<template>
  <div class="sound" @click="play(word)">
    <img v-if="currentSoundType === soundTypes.mute" src="img/icon/volume-mute.svg" alt="sound">
    <img v-if="currentSoundType === soundTypes.low" src="img/icon/volume-low.svg" alt="sound">
    <img v-if="currentSoundType === soundTypes.high" src="img/icon/volume-high.svg" alt="sound">
  </div>
  <div class="question" :title="word.hint">
    <img src="img/icon/question.svg" alt="question">
  </div>
  <p>{{ word.title }}</p>
  <div class="puzzle " @click="$router.push(word.path)">
    <!--    <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">-->
    <!--      <path-->
    <!--          d="M22.1667 11.6668V8.16683C22.1667 6.88 21.1202 5.8335 19.8333 5.8335H16.3333C16.3333 3.90383 14.763 2.3335 12.8333 2.3335C10.9037 2.3335 9.33333 3.90383 9.33333 5.8335H5.83333C4.5465 5.8335 3.5 6.88 3.5 8.16683V12.8335H4.66667C5.28551 12.8335 5.879 13.0793 6.31658 13.5169C6.75417 13.9545 7 14.548 7 15.1668C7 15.7857 6.75417 16.3792 6.31658 16.8167C5.879 17.2543 5.28551 17.5002 4.66667 17.5002H3.5V22.1668C3.5 23.4537 4.5465 24.5002 5.83333 24.5002H10.5V23.3335C10.5 22.7147 10.7458 22.1212 11.1834 21.6836C11.621 21.246 12.2145 21.0002 12.8333 21.0002C13.4522 21.0002 14.0457 21.246 14.4832 21.6836C14.9208 22.1212 15.1667 22.7147 15.1667 23.3335V24.5002H19.8333C21.1202 24.5002 22.1667 23.4537 22.1667 22.1668V18.6668C24.0963 18.6668 25.6667 17.0965 25.6667 15.1668C25.6667 13.2372 24.0963 11.6668 22.1667 11.6668Z"/>-->
    <!--    </svg>-->
    <img src="img/icon/task.svg" alt="task">
  </div>

</template>

<script setup>
import {ref} from "vue";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  word: Object
})

const soundTypes = {
  mute: 'mute',
  low: 'low',
  high: 'high'
}

let currentSoundType = ref(soundTypes.mute)

function play(word) {
  const myAudio = new Audio(word.sound);
  myAudio.play();

  setTimeout(() => {
    currentSoundType.value = soundTypes.low
  })

  setTimeout(() => {
    currentSoundType.value = soundTypes.high
  }, 200)

  setTimeout(() => {
    currentSoundType.value = soundTypes.low
  }, 400)

  setTimeout(() => {
    currentSoundType.value = soundTypes.mute
  }, 600)
}
</script>

<style scoped lang="scss">

p {
  font-size: 16px;
  font-weight: 600;
}

.sound,
.question,
.puzzle {
  display: flex;
  fill: var(--white);
  cursor: pointer;
  transition: all 0.2s;

  img {
    width: 35px;
    height: 35px;

    transition: all 0.2s;

    &:hover {
      transform: scale(0.9);
    }
  }

  &:hover {
    fill: var(--yellow);
  }
}

.sound {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40px;
  height: 40px;
  overflow: hidden;

  img {
    width: 40px;
    height: 40px;
  }
}

</style>
