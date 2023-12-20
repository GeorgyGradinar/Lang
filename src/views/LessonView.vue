<template>
  <div class="lesson--page">
    <TaskAndAnswer></TaskAndAnswer>
    <ChartBlock></ChartBlock>
  </div>
  <!--<div class="fullscreen">-->
  <!--  <div class="v-full">-->
  <!--    <main class="v-full flex-v-rub">-->
  <!--      <div class="top-link bg-base-blue v-center">-->
  <!--        <router-link to="/tasks" class=" v-center">-->
  <!--          <img src="img/icon/bxs-chevron-left1.svg">&nbsp;Вернуться к списку заданий-->
  <!--        </router-link>-->
  <!--      </div>-->

  <!--      <div class="flex-div-rub">-->
  <!--        <div class="row v-full">-->
  <!--          <div class="lesson-column bg-base-dark-purple">-->
  <!--            <div class="lesson__title div-center">Задание</div>-->
  <!--            <div class="lesson__line1">Общайтесь с ИИ-ботом и выполняйте упражнения по диалогу</div>-->
  <!--            <div class="lesson__subject">{{ task.title }}</div>-->
  <!--            <div class="lesson__icon div-center">-->
  <!--              <img src="img/promo/Sphere_Matrix_x3__L.png">-->
  <!--              <div class="lesson__icon-tooltip-text" v-if="leanPhase==1">-->
  <!--                Слева будут показываться упражнения-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="lesson__number">Упражнение № 1</div>-->
  <!--            <div class="lesson__qustion">What season does Bot mention in the dialogue?</div>-->
  <!--          </div>-->
  <!--  -->

  <!--          <div class="lesson-middle">-->
  <!--            <div class="chat flex-v-rub">-->
  <!--              <chat-view-->
  <!--              :smallMode="false"-->
  <!--              :leanPhase="leanPhase"-->
  <!--              />-->
  <!--            </div>-->
  <!--          </div>-->


  <!--          <div class="lesson-column bg-base-dark-purple">-->
  <!--            <div class="lesson__title div-center">ваши ответы</div>-->
  <!--            <div class="lesson__line1">Впишите Ваше решение на упражнение в поле ответа ниже</div>-->
  <!--            <div class="lesson__number right">-->
  <!--              Упражнение № 1-->
  <!--              <div class="lesson__number-tooltip-text" v-if="leanPhase==2">-->
  <!--                В эту форму вы будете вписывать ответы-->
  <!--              </div>-->

  <!--              <div class="lesson__number-tooltip2-text" v-if="leanPhase==3">-->
  <!--                Запишите голосовой ответ на упражнение-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="lesson__answer">-->
  <!--                <textarea placeholder="Написать ответ..." v-if="leanPhase!=3"></textarea>-->
  <!--                &lt;!&ndash;<div class="lesson__answer-message div-center bg-base-green">Отличный ответ!</div> &ndash;&gt;-->
  <!--                &lt;!&ndash;<div class="lesson__answer-message div-center bg-base-red">Получится в следующий раз!</div>&ndash;&gt;-->
  <!--                <button class="bg-base-light-violet" v-if="leanPhase!=3"><img src="img/icon/bxs-send1.svg"></button>-->
  <!--                <div  v-if="leanPhase==3">-->
  <!--                  <img src="img/icon/BT-voice-default.png">-->
  <!--                </div>-->
  <!--                <div class="none">-->
  <!--                  <img src="img/icon/BT-voice.png">-->
  <!--                </div>-->
  <!--  -->
  <!--                &lt;!&ndash;<div class="lesson__answer-rmes  bg-base-green div-center">Верно Далее</div>&ndash;&gt;-->
  <!--                &lt;!&ndash;<div class="lesson__answer-rmes  bg-base-red div-center">Ошибка Далее</div> &ndash;&gt;-->


  <!--            </div> -->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </main>-->
  <!--  </div>-->
  <!--</div>-->
</template>

<script setup>
import TaskAndAnswer from "@/components/widgets/TaskAndAnswer";
import ChartBlock from "@/components/widgets/ChartBlock";

// import store from '@/store'
// import ChatView from '@/components/widgets/ChatView.vue'
//
// export default {
//   name: 'LessonView',
//   components : {
//     ChatView
//   },
//   data : () => ({
//     mode: 'text',
//     total: 15,
//     done: 2,
//     task: {
//         id: 1,
//         title: 'Modal equivalents',
//         text: 'Эквиваленты модальных глаголов с Have, правильное употребление',
//         img: 'img/promo/Spring_Fat_Tall_R.png',
//         route: '/lesson',
//         bgclass: 'bg-base-purple'
//       },
//     leanPhase : 0
//   }),
//
//   computed : {
//     isNew () {
//       return store.getters['account/isNew']
//     },
//   },
//
//   mounted () {
//     if (this.isNew) {
//       setTimeout(this.showLean, 1000)
//     }
//   },
//
//   methods: {
//     showLean() {
//       this.leanPhase++
//       if (this.leanPhase < 6) {
//         setTimeout(this.showLean, 2000)
//       }
//     }
//   }
//
// }

</script>

<style scoped lang="scss">
.lesson--page {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  width: 100vw;
  height: calc(100vh - 82px);
  padding: 30px;
}
</style>
