<template>
  <div class="message-date-subscribe">
    <div class="message">
      <img src="img/icon/notification.svg">&nbsp;{{ messageText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageView',
  props: ['messageText']
}
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

    img {
      width: 35px;
      height: 35px;
    }
  }
}
</style>
