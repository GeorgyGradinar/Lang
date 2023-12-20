<template>
  <div class="progress bg-orange ">
    <div class="wrap">
      <month-select-view 
        @changeMonth="changedMonth"
      />

      <progress-data-view
        :progressData="progressData"
       />
    </div>
  </div>
</template>

<script>
import MonthSelectView from '@/components/widgets/MonthSelectView.vue'
import ProgressDataView from '@/components/widgets/ProgressDataView.vue'
export default {
  name: 'ProgressView',
  components: {
    MonthSelectView, ProgressDataView
  },

  data: () => ({
    progressData: []
  }),

  methods: {
    changedMonth(date) {
      console.log(date);
      this.CreateRandomData()
    },

    CreateRandomData() {
      this.progressData = []
      const week=[
        {id:0, title: 'понедельник', bgclass: 'bg-base-blue'},
        {id:1, title: 'вторник', bgclass: 'bg-base-light-violet'},
        {id:2, title: 'среда', bgclass: 'bg-base-purple'},
        {id:3, title: 'четверг', bgclass: 'bg-base-dark-purple'},
        {id:4, title: 'пятница', bgclass: 'bg-base-blue'},
        {id:5, title: 'суббота', bgclass: 'bg-base-light-violet'},
        {id:6, title: 'воскресенье', bgclass: 'bg-base-purple'}
      ]

      for (let i = 0; i < week.length; i++) {
        // создаем день
        let days = []
        for (let j = 0; j < 4; j++) {
          let randompoint = Math.random()*1000;
          let day = {}

          day.id = i*4+j
          if (randompoint <= 350) {
            day.type = 1
            day.day = '25'
            day.task = {total:10, done:10, success:10, words: 3}
            day.img='img/icon/bxs-party.png'
            day.bgclass = 'bg-base-purple'
          }
          if ((randompoint > 350)&&(randompoint <= 700)) {
            day.type = 2
            day.day = '1'
            day.img='img/icon/bxs-star.png'
            day.bgclass = 'bg-base-light-violet'
            day.task = {total:12, done:7, success:10, error:2, words: 3}
          }
          if ((randompoint > 700)&&(randompoint <= 850)) {
            day.type = 3
            day.day = '14'
            day.bgclass = 'bg-base-blue'
          }
          if ((randompoint > 850)&&(randompoint <= 1000)) {
            day.type = 4
            day.day = 45
            day.bgclass = 'bg-base-blue'
          }

          days.push(day)
        }

        // заполняем массив с данными
        this.progressData.push({
          title: week[i],
          days: days
        })
      }
    }
  }
}
</script>

<style>

</style>