<template>
  <div class="button-container">
  </div>
</template>

<script setup>
import {onMounted, toRefs, watch} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  activeConfetti: Boolean
});
const {activeConfetti} = toRefs(props);

watch(activeConfetti, () => {
  startConfetti();
})

let origin;
let myCanvas;
let defaults;
let colors = ['#1947e5', '#d4fdf7', '#00c6ad', '#f45b49', '#671ba1'];
// eslint-disable-next-line no-unused-vars
let myConfetti;

onMounted(() => {
  origin = {
    x: 400 / window.innerWidth,
    y: 400 / window.innerHeight
  };

  defaults = {
    disableForReducedMotion: true
  };
})

function fire(particleRatio, opts) {
  // eslint-disable-next-line no-undef
  confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(300 * particleRatio)
      })
  );
}

function startConfetti() {
  myCanvas = document.createElement('canvas');
  document.body.appendChild(myCanvas);

  // eslint-disable-next-line no-undef
  myConfetti = confetti.create(myCanvas, {});

  setTimeout(() => {
    fire(0.25, {
      spread: 26,
      startVelocity: 20,
      origin,
      colors,
    });
    fire(0.2, {
      spread: 200,
      startVelocity: 30,
      origin,
      colors,
    });
    fire(0.35, {
      spread: 200,
      startVelocity: 15,
      decay: 0.91,
      origin,
      colors,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 10,
      decay: 0.92,
      origin,
      colors,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 20,
      origin,
      colors,
    })

    myCanvas.remove();
  })
}
</script>

<style scoped>
.button-container {
  position: absolute;
  display: none;
  width: 0;
  height: 0;
}
</style>
