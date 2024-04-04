<template>
  <v-snackbar
      :timeout="1500"
      v-model="isOpenSnackBarDone"
      :absolute="true"
  >
    <div class="done">
      <p>{{ textForSnackBarDone }}</p>
    </div>
  </v-snackbar>
</template>

<script setup>
import {notificationStore} from "@/store/notificationStore";
import {storeToRefs} from "pinia/dist/pinia";
import {watch} from "vue";

const notifications = notificationStore();
const {changeTextForSnackBarDone} = notifications;
const { isOpenSnackBarDone, textForSnackBarDone} = storeToRefs(notifications);

watch(isOpenSnackBarDone, () => {
  if (!isOpenSnackBarDone.value){
    changeTextForSnackBarDone(null);
  }
})
</script>

<style scoped lang="scss">

:deep(.v-snackbar__wrapper) {
  position: fixed;
  left: unset !important;
  transform: unset !important;
  bottom: 20px !important;
  right: 10px;
  border-radius: 10px;
  background-color: var(--green);
  border: 1px solid var(--dark);

  .v-snackbar__content {
    padding: unset;

    .done {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px;
      font-size: 16px;
      background-color: var(--green);
    }
  }
}
</style>
