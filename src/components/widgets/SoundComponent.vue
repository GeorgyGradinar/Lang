<template>
  <div class="sound" @click="play(word)">
    <img v-if="currentSoundType === soundTypes.mute" src="img/icon/volume-mute.svg" alt="sound">
    <img v-if="currentSoundType === soundTypes.low" src="img/icon/volume-low.svg" alt="sound">
    <img v-if="currentSoundType === soundTypes.high" src="img/icon/volume-high.svg" alt="sound">
  </div>
</template>

<script setup>
import {ref} from "vue";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  word: Object
});

const soundTypes = {
  mute: 'mute',
  low: 'low',
  high: 'high'
};

let currentSoundType = ref(soundTypes.mute);

function play(word) {
  const myAudio = new Audio(word.sound);
  myAudio.play();

  currentSoundType.value = soundTypes.low;

  setTimeout(() => {
    currentSoundType.value = soundTypes.high;
  }, 200)

  setTimeout(() => {
    currentSoundType.value = soundTypes.low;
  }, 400)

  setTimeout(() => {
    currentSoundType.value = soundTypes.mute;
  }, 600)
}
</script>

<style scoped lang="scss">
.sound {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 40px;
    height: 40px;
  }
}
</style>
