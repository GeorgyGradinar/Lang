<template>
  <SoundComponent :word="word"></SoundComponent>
  <button class="question" @click="toggleOpenDialog(true)">
    <img src="img/icon/question.svg" alt="question">
  </button>
  <p>{{ word.word }}</p>
  <!--  <div class="puzzle " @click="$router.push(word.path)">-->
  <!--    <div class="tasks">-->
  <!--      <img class="task" src="img/icon/book.svg">-->
  <!--      <v-tooltip activator="parent" location="bottom">Задачи</v-tooltip>-->
  <!--    </div>-->
  <!--  </div>-->
  <WordsDetails v-if="isOpenDialog" :word="word" @hiddenBlock="toggleOpenDialog"></WordsDetails>
</template>

<script setup>
import SoundComponent from "@/components/widgets/SoundComponent";
import WordsDetails from "@/components/modals/WordsDetails";
import {onMounted, ref, toRefs} from "vue";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  word: Object
})
const {word} = toRefs(props);

let isOpenDialog = ref(false);

onMounted(() => {
  console.log('word component')
})

function toggleOpenDialog(isOpen) {
  isOpenDialog.value = isOpen;
}
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
