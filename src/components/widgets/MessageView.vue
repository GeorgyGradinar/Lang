<template>
  <div class="message-date-subscribe">
    <div class="message">
      <img src="img/icon/notification.svg">Ваш тариф действует до {{ messageText }}
    </div>
  </div>
</template>

<script setup>
import {toRefs} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  messageText: String
})
const {messageText} = toRefs(props);

// export default {
//   name: 'MessageView',
//   props: ['messageText']
// }
</script>

<style scoped lang="scss">
.message-date-subscribe {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: var(--blue);

  .message {
    display: flex;
    align-items: center;
    color: var(--light-yellow);

    img {
      width: 35px;
      height: 35px;
    }
  }
}
</style>
