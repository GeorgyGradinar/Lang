<template>
  <div class="wrapper-task-and-answer">
    <div class="task">
      <h3>Задание</h3>
      <div class="wrapper-theme">
        <span>Тема</span>
        <span>Бронируем номер в отеле</span>
      </div>
      <p>Упражнение №1</p>
      <p>What season Bot mention in the dialog</p>
    </div>
    <div class="answer">
      <p>Введите ответ</p>
      <input>
      <button>Отправить</button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.wrapper-task-and-answer {
  width: 40%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  background-color: var(--light_pink);
  color: var(--dark);
  padding: 20px;
}
</style>
