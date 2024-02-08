<template>
  <div class="button-container">
  </div>
</template>

<script setup>
import {onMounted} from "vue";

let origin;
let myCanvas;
let defaults;
let colors = ['#1947e5', '#ffd073', '#671ba1', '#f45b49', '#671ba1'];

onMounted(() => {
  origin = {
    x: (window.innerWidth / 2) / window.innerWidth,
    y: ( window.innerHeight / 2) / window.innerHeight
  };

  defaults = {
    disableForReducedMotion: true
  };

  startConfetti();
})

function fire(particleRatio, opts) {
  // eslint-disable-next-line no-undef
  confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(1000 * particleRatio)
      })
  );
}

function startConfetti() {
  myCanvas = document.createElement('canvas');
  document.body.appendChild(myCanvas);

  // eslint-disable-next-line no-undef
  confetti.create(myCanvas, {});

  setTimeout(() => {
    fire(0.35, {
      spread: 500,
      startVelocity: 50,
      origin,
      colors,
    });
    fire(0.2, {
      spread: 500,
      startVelocity: 50,
      origin,
      colors,
    });
    fire(0.35, {
      spread: 500,
      startVelocity: 50,
      decay: 0.91,
      origin,
      colors,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 20,
      decay: 0.92,
      origin,
      colors,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 10,
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
