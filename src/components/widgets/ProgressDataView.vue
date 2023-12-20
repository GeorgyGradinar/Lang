<template>
  <div class="slider">
    <div class="slider-list">
      <div class="slider-track">
          <div class="slide progress-slide"
            v-for="weekDay in progressData" :key="weekDay.title.id"
          >
            <div class="progress-slide__title" :class="weekDay.title.bgclass">{{ weekDay.title.title }}</div>

            <progress-day-view
              v-for="day in weekDay.days" :key="day.id"
              :dayData="day"
             />
            <!--




            <div class="progress-slide__day bg-base-blue div-center">
              <div class="day">27</div>
              <div><img src="img/icon/bxs-bone.png"></div>
            </div>

            <div class="progress-slide__day bg-base-blue div-center">
              <div class="div-center big-day">21</div>
            </div>
            -->
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProgressDayView from '@/components/widgets/ProgressDayView.vue'
export default {
  name: 'ProgressDataView',

  components : {
    ProgressDayView
  },

  props: {
    'progressData' : Array
  }
}
</script>

<style>

</style>