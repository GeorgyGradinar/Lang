<template>
  <button class="more-word" @click="emit('addWord')">
    <img src="img/dictionary/plus.svg" alt="">
    Добавить карточку
  </button>
  <button class="add-button" @click="emit('submit')">Добавить</button>
</template>

<script setup>
// eslint-disable-next-line no-undef
const emit = defineEmits(['addWord', 'submit']);
</script>

<style scoped lang="scss">
.add-button,
.more-word {
  padding: 5px 10px;
  border-radius: 10px;
  color: var(--dark);
  background-color: var(--yellow);
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  transition: all 0.2s;

  &:hover {
    color: var(--blue);
    background-color: var(--red);
  }
}

.more-word {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  img {
    width: 40px;
    height: 40px;
  }
}

.add-button {
  width: 50%;
}
</style>
