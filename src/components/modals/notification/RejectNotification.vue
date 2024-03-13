<template>
  <v-snackbar
      :timeout="timeout"
      v-model="isOpenSnackBarReject"
      :absolute="true"
  >
    <div class="done">
      <p>{{ textForSnackBarReject }}</p>
    </div>
  </v-snackbar>
</template>

<script setup>
import {notificationStore} from "@/store/notificationStore";
import {storeToRefs} from "pinia/dist/pinia";
import {watch} from "vue";

const notifications = notificationStore();
const {changeTextForSnackBarReject} = notifications;
const {timeout, isOpenSnackBarReject, textForSnackBarReject} = storeToRefs(notifications);

watch(isOpenSnackBarReject, () => {
  if (!isOpenSnackBarReject.value){
    changeTextForSnackBarReject(null);
  }
})
</script>

<style scoped lang="scss">

</style>
