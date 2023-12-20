<template>
    <div class="progress__month">
      <div class="cursor" @click="prevMonth"><img src="img/icon/1bxs-chevron-left.svg"></div>
      <div class="progress__month-title">{{ mounth }} {{ year }}</div>
      <div class="cursor" @click="nextMonth"><img src="img/icon/1bxs-chevron-right.svg"></div>
    </div>
</template>

<script>
export default {
  name: 'MonthSelectView',

  data: () => ({
    date: null,
    year : '',
    mounth : ''
  }),

  emits: ['changeMonth'],

  mounted () {
    this.date = new Date()
    this.calc()
  },

  methods : {
    calc () {
      this.year = this.date.getFullYear()
      this.mounth = this.date.toLocaleString('default', { month: 'long' })
      this.$emit('changeMonth', this.date)
    },

    nextMonth () {
      this.date.setMonth(this.date.getMonth() + 1)
      this.calc()
    },

    prevMonth() {
      this.date.setMonth(this.date.getMonth() - 1)
      this.calc()
    }
  }
}
</script>

<style>

</style>