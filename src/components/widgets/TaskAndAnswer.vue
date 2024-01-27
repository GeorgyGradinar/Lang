<template>
  <div class="wrapper-task-and-answer animate__animated animate__bounceInLeft">
    <h3>Упражнение №1</h3>
    <div class="task">
      <div class="wrapper-theme">
        <p>Тема:</p>
        <p>Бронируем номер в отеле</p>
      </div>

      <div class="wrapper-task-description">
        <p>Задание:</p>
        <p>What season Bot mention in the dialog</p>
      </div>

    </div>
    <div class="answer">
      <p>Введите ваш ответ:</p>
      <textarea v-model="answer"
                @input="autoGrow"
                ref="textarea"
                placeholder="Ваш ответ">
      </textarea>
      <button @click="submitResult">Отправить</button>
    </div>
  </div>

  <ConfettiAnimation :activeConfetti="submit"></ConfettiAnimation>
</template>

<script setup>
import ConfettiAnimation from './ConfettiAnimation';
import {ref} from "vue";

let textarea = ref(null);
let answer = ref('');
let isSubmit = ref(false);

function autoGrow() {
  textarea.value.style.height = "45px";
  textarea.value.style.height = (textarea.value.scrollHeight) + "px";
}

function submitResult() {
  setTimeout(() => {
    isSubmit.value = !isSubmit.value;
  }, 1000)
}
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

  h3 {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 20px;
  }

  .task {
    border-bottom: 1px solid var(--dark);
    margin-bottom: 30px;

    .wrapper-theme,
    .wrapper-task-description {
      display: flex;
      gap: 10px;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 20px;

      p:first-child {
        color: var(--blue);
      }
    }
  }

  .answer {
    display: flex;
    flex-direction: column;
    gap: 20px;

    p {
      color: var(--blue);
    }

    textarea {
      width: 100%;
      resize: none;
      overflow: hidden;
      height: 45px;
      min-height: 100px;
      max-height: 300px;
      border: 1px solid var(--dark);
      background-color: var(--yellow);
      color: var(--dark);
      padding: 0.6em;
      transition: border 0.2s;
      border-radius: 10px;

      &:focus {
        outline: none;
        border: 1px solid var(--dark);
      }
    }

    button {
      padding: 10px;
      border-radius: 10px;
      background-color: var(--yellow);
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      transition: all 0.2s;
      cursor: pointer;

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }

      &:hover {
        color: var(--blue);
      }
    }
  }
}
</style>
