<template>
  <div class="rapper-mini-chat" :class="{'full-size': isShowChat}">
    <img src="img/chart/chat-message.svg" alt="" @click="toggleShowChat" v-if="!isShowChat">
    <div v-if="isShowChat">
      <ChartBlock :isMiniChat="true" @closeMini="toggleShowChat"></ChartBlock>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import ChartBlock from "@/components/widgets/NewChat";

let isShowChat = ref(false);

function toggleShowChat() {
  isShowChat.value = !isShowChat.value;
}
</script>

<style scoped lang="scss">
.rapper-mini-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: var(--pink);
  border-radius: 10px;
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;

  img {
    width: 45px;
    height: 45px;
  }
}

.full-size {
  width: 400px;
  height: 600px;
  border-radius: 13px;
}
</style>
