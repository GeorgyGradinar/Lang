<template>
  <div class="remainders">
    <div class="tasks">
      <img src="img/task.svg" alt="task">
      <p>- {{ person?.tasks }}</p>
      <v-tooltip activator="parent" location="bottom" class="info-remainders">Остаток заданий</v-tooltip>
    </div>
    <div class="messages">
      <img src="img/email.svg" alt="email">
      <p>- {{ person?.messages }}</p>
      <v-tooltip activator="parent" location="bottom" class="info-remainders">Остаток сообщений</v-tooltip>
    </div>
  </div>
</template>

<script setup>
import {mainStore} from "@/store/mainStore";
import {storeToRefs} from "pinia/dist/pinia";

const main = mainStore();
const {person} = storeToRefs(main)
</script>

<style scoped lang="scss">
.remainders {
  display: flex;
  flex-direction: column;
  gap: 7px;

  .tasks,
  .messages {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--yellow);

    img {
      width: 25px;
      height: 25px;
    }
  }
}

@media screen and (min-width: 2200px) {
  .remainders {
    .tasks,
    .messages {

      img {
        width: 35px;
        height: 35px;
      }

      p {
        font-size: 25px;
      }
    }
  }
}
</style>
