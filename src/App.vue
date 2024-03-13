<template>
  <header-nav/>
  <div class="container">
    <main>
      <router-view/>
    </main>
  </div>
  <NotificationModals></NotificationModals>
</template>

<script setup>
import HeaderNav from '@/components/app/HeaderNav.vue';
import {onMounted} from "vue";
import authRequests from "@/mixins/requests/authRequests";
import NotificationModals from "@/components/modals/NotificationModals";

const {checkLocalStorage} = authRequests();

onMounted(() => {
  checkLocalStorage();
})
</script>
<style scoped lang="scss">
@import "@/assets/main.css";

.container {
  padding-top: 82px;
  height: 100%;
  min-height: 100vh;
}
</style>
