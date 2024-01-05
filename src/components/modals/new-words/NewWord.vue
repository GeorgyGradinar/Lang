<template>
  <div class="new-word" :class="{'hidden': isActiveHiddenAnimation}">
    <div class="english-word">
      <input v-model="word.english"
             @input="vWord$.english.$touch"
             @blur="vWord$.english.$touch"
             :class="{'error' : vWord$.english.$errors.length}"
             placeholder="Напишите слово">
      <p v-if="vWord$.english.$errors.length" class="error-message">Обязательное поле</p>
    </div>

    <div class="line"></div>
    <div class="russian-word">
      <input v-model="word.russian"
             @input="vWord$.russian.$touch"
             @blur="vWord$.russian.$touch"
             :class="{'error' : vWord$.russian.$errors.length}"
             placeholder="Напишите перевод">
      <p v-if="vWord$.russian.$errors.length" class="error-message">Обязательное поле</p>
    </div>

    <button class="delete-word" @click="deleteWord(index)"><img src="img/chart/trash.svg" alt="">
    </button>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  wordData: Object,
  index: Number
})

// eslint-disable-next-line no-undef,no-unused-vars
const emit = defineEmits(['validator', 'delete']);

let word = ref({
  english: '',
  russian: ''
})

let rulesWord = {
  english: {required},
  russian: {required}
}

const vWord$ = useVuelidate(rulesWord, word);

let isActiveHiddenAnimation = ref(false);

onMounted(() => {
  word.value = props.wordData;
  emit('validator', vWord$);
})

function deleteWord(index) {
  isActiveHiddenAnimation.value = true;
  setTimeout(() => {
    emit('delete', index);
    isActiveHiddenAnimation.value = false;
  }, 200);
}
</script>

<style scoped lang="scss">
.new-word {
  position: relative;
  display: flex;
  align-items: center;
  gap: 15px;
  height: 0;
  min-height: 0;
  padding: 0 15px;
  border-radius: 10px;
  color: var(--dark);
  background-color: var(--yellow);
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  overflow: hidden;
  animation-name: resize;
  animation-timing-function: linear;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;

  .english-word,
  .russian-word {
    position: relative;

    input {
      padding: 5px;
      border-radius: 10px;
      border: 1px solid var(--dark);
      background-color: var(--light-yellow);

      &:focus {
        outline: none;
      }
    }

    .error {
      border: 1px solid var(--red);
    }

    .error-message {
      position: absolute;
      bottom: -13px;
      font-size: 10px;
      color: var(--red);
    }
  }


  .line {
    height: 30px;
    border: 1px solid var(--dark);
    opacity: 0.5;
  }

  .delete-word {
    width: 30px;
    height: 30px;
    transition: all 0.2s;

    img {
      width: 30px;
      height: 30px;
    }

    &:hover {
      transform: scale(1.2);
    }
  }

  @keyframes resize {
    0% {
      min-height: 0;
      opacity: 0;
    }
    50% {
      min-height: 30px;
      opacity: 0.5;
    }
    100% {
      padding: 10px 15px;
      min-height: 60px;
      opacity: 1;
    }
  }
}

.hidden {
  animation-name: hiddenBlock;
  animation-timing-function: linear;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;


  @keyframes hiddenBlock {
    0% {
      padding: 10px 15px;
      min-height: 60px;
      height: 60px;
      opacity: 1;
    }
    50% {
      height: 30px;
      min-height: 30px;
      opacity: 0;
    }
    100% {
      padding: 0 15px;
      height: 0;
      min-height: 0;
      opacity: 0;
      display: none;
    }
  }
}

</style>
