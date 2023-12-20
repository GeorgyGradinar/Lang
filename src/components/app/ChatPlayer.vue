<template>
  <div class="pleer">
    <div class="pleer__icon" @click="onPlay">
      <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="19" fill="white"/>
        <mask id="mask0_545_1760" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="1" width="42" height="42">
        <path d="M22.0001 40.3332C32.1256 40.3332 40.3334 32.1253 40.3334 21.9998C40.3334 11.8743 32.1256 3.6665 22.0001 3.6665C11.8746 3.6665 3.66675 11.8743 3.66675 21.9998C3.66675 32.1253 11.8746 40.3332 22.0001 40.3332Z" fill="white" stroke="white" stroke-width="4" stroke-linejoin="round"/>
        <path d="M18.3335 22.0001V15.6494L23.8335 18.8247L29.3335 22.0001L23.8335 25.1754L18.3335 28.3507V22.0001Z" fill="black" stroke="black" stroke-width="4" stroke-linejoin="round"/>
        </mask>
        <g mask="url(#mask0_545_1760)">
        <path d="M0 0H44V44H0V0Z" />
        </g>
      </svg>
    </div>
    <div class="pleer__bar">
      <div class="pleer__point" :style="{ left : leftValue + '%'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatPlayer',

  props : {
    'source' : {
      type: String,
      default: ''
    }
  },

  data : () => ({
    player : null,
    playTimer : null,
    leftValue: 0
  }),

  mounted () {
    this.left = 0
    if (this.source != '') {
      this.player = new Audio(this.source);
    }
  },
  methods : {
    onPlay () {
      this.leftValue = 0
      if (this.player) {
        this.playTimer = setInterval(this.updateBar, 50);
        this.player.play()
      }
    },

    updateBar () {
      this.leftValue = Math.round(100*(this.player.currentTime/this.player.duration))
      if (this.player.currentTime >= this.player.duration) {
        clearInterval(this.playTimer)
        this.leftValue = 0
      }
    }
  }
}
</script>

<style>

</style>