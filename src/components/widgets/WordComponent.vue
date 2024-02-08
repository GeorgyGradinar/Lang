<template>
  <SoundComponent :word="word"></SoundComponent>
  <div class="question" :title="word.hint">
    <img src="img/icon/question.svg" alt="question">
  </div>
  <p>{{ word.title }}</p>
  <div class="puzzle " @click="$router.push(word.path)">
    <div class="tasks">
      <img class="task" src="img/icon/book.svg">
      <v-tooltip activator="parent" location="bottom">Задачи</v-tooltip>
    </div>
  </div>

</template>

<script setup>
import SoundComponent from "@/components/widgets/SoundComponent";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  word: Object
})


</script>

<style scoped lang="scss">

p {
  font-size: 16px;
  font-weight: 800;
  color: var(--dark-pink);
}

.sound,
.question,
.puzzle {
  display: flex;
  fill: var(--white);
  cursor: pointer;
  transition: all 0.2s;

  img {
    width: 35px;
    height: 35px;

    transition: all 0.2s;

    &:hover {
      transform: scale(0.9);
    }
  }

  .task {
    width: 30px;
    height: 30px;
  }

  &:hover {
    fill: var(--yellow);
  }
}
</style>
