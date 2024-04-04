<template>
  <div class="loader" :class="{'mini-loader': isMiniLoader, 'chat-loader': isYellowColor}"></div>
</template>

<script setup>
import {toRefs} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  isMiniLoader: Boolean,
  isYellowColor: Boolean
})
const {isMiniLoader, isYellowColor} = toRefs(props);
</script>

<style scoped lang="scss">
.loader {
  width: 48px;
  height: 48px;
  position: relative;
  margin: 50px 0;

  &:before {
    content: '';
    width: 48px;
    height: 5px;
    background: var(--dark-pink);
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.6s linear infinite;
  }

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    background: var(--pink);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    animation: jump7456 0.6s linear infinite;

  }
}

.mini-loader {
  width: 20px;
  height: 20px;
  margin: 0 0 19px 0;

  &:before {
    content: '';
    width: 20px;
    height: 5px;
    background: var(--dark-pink);
    position: absolute;
    top: 30px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.6s linear infinite;
  }
}

.chat-loader {
  &:before {
    background: var(--dark-pink);

  }

  &:after {
    background: var(--yellow);
  }
}

@keyframes jump7456 {
  15% {
    border-bottom-right-radius: 50%;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow324 {

  0%,
  100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}
</style>
