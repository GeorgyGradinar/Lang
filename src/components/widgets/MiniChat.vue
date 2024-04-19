<template>
  <div class="wrapper-mini-chat" :class="{'full-size': isShowChat}">

    <img src="img/chart/chat-message.svg" alt="" @click="toggleShowChat" v-if="!isShowChat">

    <div v-if="isShowChat" class="mini-chat">
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
.wrapper-mini-chat {
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
  z-index: 100;

  img {
    width: 45px;
    height: 45px;
  }
}

.full-size {
  width: 450px;
  height: 600px;
  border-radius: 13px;


  .mini-chat {
    height: 100%;
  }
}

@media screen and (min-width: 2200px) {
  .wrapper-mini-chat {
    width: 70px;
    height: 70px;
    border: 4px solid var(--dark);

    img {
      width: 60px;
      height: 60px;
    }
  }

  .full-size {
    width: 600px;
    height: 800px;
    border-radius: 13px;
  }
}

@media screen and (max-width: 500px) {
  .wrapper-mini-chat {
    right: 5px;

    img {
      width: 45px;
      height: 45px;
    }
  }

  .full-size {
    width: 95%;
    height: 600px;
  }
}
</style>
