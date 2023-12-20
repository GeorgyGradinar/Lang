<template>
  <week-results/>

  <cards-slider-view
      :bgclass="'bg-white'"
      :title="'Ролевые игры'"
      :cards="roleGames"
  />
  <cards-slider-view
      :bgclass="'bg-white'"
      :title="'Лексика'"
      :cards="vocabulary"
  />
  <cards-slider-view
      :bgclass="'bg-white'"
      :title="'Граматика'"
      :cards="grammar"
  />

  <cards-slider-view
      :bgclass="'bg-white'"
      :title="'Выполненно'"
      :cards="doneTasks"
  />
</template>

<script setup>
import WeekResults from '@/components/widgets/WeekResults.vue';
import CardsSliderView from '@/components/widgets/CardsSliderView.vue';
import {onMounted, ref} from "vue";

let roleGames = ref([]);
let vocabulary = ref([]);
let grammar = ref([]);
let doneTasks = ref([]);

onMounted(() => {
  roleGames.value = [
    {
      id: 0,
      title: 'Бронируем номер в отеле',
      img: 'img/tasks/hotel.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-red'
    },
    {
      id: 1,
      title: 'Заказываю еду в ресторане',
      img: 'img/tasks/restaurant.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-blue'
    },
    {
      id: 2,
      title: 'Открываю счет в банке',
      img: 'img/tasks/bank.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 35,
      bgclass: 'bg-base-dark-purple'
    },
    {
      id: 3,
      title: 'В агентстве недвижимости',
      img: 'img/tasks/village.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 20,
      bgclass: 'bg-base-blue'
    },
    {
      id: 4,
      title: 'Собеседование',
      img: 'img/tasks/mic-svgrepo.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 100,
      bgclass: 'bg-base-dark-purple'
    },
    {
      id: 5,
      title: 'Знакомство с девушкой',
      img: 'img/tasks/heart.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 85,
      bgclass: 'bg-orange'
    },
    {
      id: 6,
      title: 'Знакомство с парнем',
      img: 'img/tasks/heart.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-purple'
    }
  ]
  vocabulary.value = [
    {
      id: 0,
      title: 'Начало встречи',
      img: 'img/tasks/meet.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-orange'
    },
    {
      id: 1,
      title: 'Окончание встречи',
      img: 'img/tasks/handshake.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-blue'
    },
    {
      id: 2,
      title: 'Деловое знакомство',
      img: 'img/tasks/meeting-2-man.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 35,
      bgclass: 'bg-base-dark-purple'
    },
    {
      id: 3,
      title: 'Телефонный разговор',
      img: 'img/tasks/headset.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 20,
      bgclass: 'bg-base-blue'
    },
    {
      id: 4,
      title: 'Здоровье',
      img: 'img/tasks/heart.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 100,
      bgclass: 'bg-base-dark-purple'
    },
    {
      id: 5,
      title: 'В аэропорту',
      img: 'img/tasks/airplane.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 85,
      bgclass: 'bg-orange'
    },
    {
      id: 6,
      title: 'В пути',
      img: 'img/tasks/village.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-purple'
    },
    {
      id: 6,
      title: 'Ресторан',
      img: 'img/tasks/restaurant.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-purple'
    },
    {
      id: 6,
      title: 'Разговоры в быту',
      img: 'img/tasks/broom.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-purple'
    },
    {
      id: 6,
      title: 'Банк',
      img: 'img/tasks/bank.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-purple'
    },
    {
      id: 6,
      title: 'Аренда',
      img: 'img/tasks/report.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-purple'
    }
  ]
  grammar.value = [
    {
      id: 0,
      title: 'Some, any, no',
      img: 'img/tasks/invoice.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-orange'
    },
    {
      id: 1,
      title: 'To be in Present Simple',
      img: 'img/tasks/invoice.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-blue'
    },
    {
      id: 2,
      title: 'Much, many, little, few',
      img: 'img/tasks/invoice.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 35,
      bgclass: 'bg-base-dark-purple'
    },
    {
      id: 3,
      title: 'Сравнительные степени прилагательных',
      img: 'img/tasks/invoice.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 20,
      bgclass: 'bg-base-blue'
    },
    {
      id: 4,
      title: 'To be in Past Simple',
      img: 'img/tasks/invoice.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 100,
      bgclass: 'bg-base-dark-purple'
    },
    {
      id: 5,
      title: 'Present Continuous',
      img: 'img/tasks/invoice.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 85,
      bgclass: 'bg-orange'
    },
    {
      id: 6,
      title: 'Future Simple',
      img: 'img/tasks/invoice.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 0,
      bgclass: 'bg-base-purple'
    }
  ]
  doneTasks.value = [
    {
      id: 0,
      title: 'Some, any, no',
      img: 'img/tasks/invoice.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 100,
      bgclass: 'bg-orange'
    },
    {
      id: 1,
      title: 'Окончание встречи',
      img: 'img/tasks/handshake.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 100,
      bgclass: 'bg-base-blue'
    },
    {
      id: 6,
      title: 'Банк',
      img: 'img/tasks/bank.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 100,
      bgclass: 'bg-base-purple'
    },
    {
      id: 0,
      title: 'Бронируем номер в отеле',
      img: 'img/tasks/hotel.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 100,
      bgclass: 'bg-orange'
    },
    {
      id: 2,
      title: 'Открываю счет в банке',
      img: 'img/tasks/bank.svg',
      route: '/lesson',
      countLesson: 15,
      hours: 15,
      progress: 100,
      bgclass: 'bg-base-dark-purple'
    },
  ]
})
</script>

<style scoped lang="scss">
</style>
