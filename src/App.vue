<template>
  <header-nav/>
  <div class="container">
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script setup>
import HeaderNav from '@/components/app/HeaderNav.vue';
import {onMounted} from "vue";
import authRequests from "@/mixins/requests/authRequests";

const {checkLocalStorage} = authRequests();

onMounted(() => {
  checkLocalStorage();
})

// export default {
//   name: 'main-layout',
//   components: {
//     HeaderNav
//   },
//
//   mounted() {
//     // Значения по умолчанию
//     this.$store.dispatch('weekresults/set', [
//       {day: 'Пн', total: 10, success: 1, errors: 5, state: ''},
//       {day: 'Вт', total: 10, success: 5, errors: 5, state: ''},
//       {day: 'Ср', total: 10, success: 9, errors: 0, state: ''},
//       {day: 'Чт', total: 0, success: 0, errors: 0, state: 'lock'},
//       {day: 'Пт', total: 0, success: 0, errors: 0, state: 'lock'},
//       {day: 'Сб', total: 0, success: 0, errors: 0, state: 'lock'},
//       {day: 'Вс', total: 0, success: 0, errors: 0, state: 'lock'}
//     ])
//   }
// }
</script>
<style>
@import "@/assets/main.css";
</style>
