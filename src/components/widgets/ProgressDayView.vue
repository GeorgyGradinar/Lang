<template>
  <div class="progress-slide__day" :class="[{'div-center' : (dayData.type==3)||(dayData.type==4)}, dayData.bgclass]" >
    <div v-if="dayData.type==1">
      <div class="day">{{ dayData.day }}</div>
      <div class="w-center"><img :src=dayData.img></div>
      <div class="row1 row-center">
        <div>Задания</div>
        <div class="value">{{ dayData.task.done }}/{{ dayData.task.total }}</div>
      </div>
      <div class="row1 row-center">
        <div class="value l">{{ dayData.task.success }}</div>
        <div>Успешно</div>
      </div>
      <div class="row1 row-center">
        <div class="value-t">Слов Закреплено</div>
        <div class="value">{{ dayData.task.words }}</div>
      </div>
    </div>

    <div v-if="dayData.type==2">
      <div class="day">{{ dayData.day }}</div>
      <div class="w-center"><img :src=dayData.img></div>
      <div class="row1 row-center">
        <div>Задания</div>
        <div class="value">{{ dayData.task.done }}/{{ dayData.task.total }}</div>
      </div>
      <div class="row2 row-center">
        <div class="value l">{{ dayData.task.success }}</div>
        <div>Успешно</div>
      </div>       
      <div class="row2 row-center">
        <div class="value l bg-orange">{{ dayData.task.error }}</div>
        <div>с ошибками</div>
      </div>
      <div class="row1 row-center">
        <div class="value-t">Слов Закреплено</div>
        <div class="value">{{ dayData.task.words }}</div>
      </div>
    </div>

    <div v-if="dayData.type==3">
      <div class="day">{{ dayData.day }}</div>
      <div><img src="img/icon/bxs-bone.png"></div>
    </div>

    <div v-if="dayData.type==4" >
      <div class="div-center big-day">21</div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'ProgressDayView',
  props: {
    'dayData' : Object
    //:class="dayData.bgclass"
  }
}
</script>

<style>

</style>