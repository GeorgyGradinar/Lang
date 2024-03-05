<template>
  <div class="allow_microphone_message" :class="{'show-message': isShowMessage}">
    <p>Пожалуйста, разрешите доступ к своему микрофону</p>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  isShowMessage: Boolean
})
</script>

<style scoped lang="scss">
.allow_microphone_message {
  display: flex;
  position: absolute;
  top: 50%;
  left: calc(50% - 225px);
  color: var(--light-yellow);
  background-color: rgba(35, 35, 35, 0.8);
  padding: 20px;
  border-radius: 10px;
  opacity: 0;
  z-index: -1;
  transition: all 0.6s;

  p {
    display: flex;
  }
}

.show-message {
  opacity: 1;
  z-index: 1;
}
</style>
