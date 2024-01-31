<template>
  <div v-if="topPosition" id="option-block" class="option-block"
       :style="{'top': `${topPosition}px`, 'left': `${leftPosition}px`}">
    <div class="wrapper-option-word">
      <SoundComponent :word="sound"></SoundComponent>
      <p>{{ word }}</p>
    </div>

    <div class="wrapper-option-word">
      <SoundComponent :word="sound"></SoundComponent>
      <p>Translate</p>
    </div>
  </div>
</template>

<script setup>
import {toRefs} from "vue";
import SoundComponent from "@/components/widgets/SoundComponent";

// eslint-disable-next-line no-undef
const props = defineProps({
  topPosition: Number,
  leftPosition: Number,
  word: String
})
const {topPosition, leftPosition, word} = toRefs(props);
const sound = {id: 0, title: 'Cloud', hint: 'подсказка1', sound: 'sound/black.mp3', path: '/lesson'}

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
