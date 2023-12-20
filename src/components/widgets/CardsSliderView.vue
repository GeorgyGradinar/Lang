<template>
  <div class="tasks" :class="bgclass">
    <h2 class="tasks-title">{{ title }}</h2>
    <div class="wrapper-tasks">
      <card-view v-for="card in cards" :key="card.id" :card="card"/>
    </div>
  </div>
</template>

<script setup>
import CardView from '@/components/widgets/CardView.vue';
// eslint-disable-next-line no-unused-vars
import {Swiper, SwiperSlide} from 'swiper/vue';

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  bgclass: String,
  title: String,
  cards: Array
})
</script>

<style scoped lang="scss">
.tasks {
  padding: 30px;
  border: 1px solid var(--dark);

  .tasks-title {
    font-size: 35px;
  }

  .wrapper-tasks {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 50px;
    padding: 50px 0;
  }
}
</style>
