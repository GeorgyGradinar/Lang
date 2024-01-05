<template>
  <popup-modal ref="popup" @onEsc="_cancel()">
    <div class="wrapper-add-new-group">
      <p>Добавте новую группу</p>
      <div class="data-group">
        <div class="wrapper-name">
          <p class="title-name">Введите название группы</p>
          <input v-model="titleData.title"
                 @input="vTitle$.title.$touch"
                 @blur="vTitle$.title.$touch"
                 :class="{'error' : vTitle$.title.$errors.length}"
                 placeholder="Название группы">
          <p v-if="vTitle$.title.$errors.length" class="error-message">Обязательное поле</p>
        </div>
        <div class="wrapper-new-word">
          <NewWord v-for="(wordData, index) in newWords" :key="wordData.id"
                   :wordData="wordData"
                   :index="index"
                   @validator="addNewValidator"
                   @delete="deleteWord">
          </NewWord>
        </div>
        <ButtonForAddWordAndGroup @addWord="addWord"
                                  @submit="submit">
        </ButtonForAddWordAndGroup>
      </div>
    </div>
  </popup-modal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import PopupModal from "@/components/app/PopupModal";
import NewWord from "@/components/modals/new-words/NewWord";
import ButtonForAddWordAndGroup from "@/components/modals/shared/ButtonForAddWordAndGroup";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

// eslint-disable-next-line no-undef
const emit = defineEmits(['close']);
const templateNewWord = {
  english: '',
  russian: ''
}

let popup = ref(null);
let newWords = ref([{...templateNewWord}]);
let allValidators = ref([]);

let titleData = ref({
  title: ''
})

let rulesTitle = {
  title: {required}
}

const vTitle$ = useVuelidate(rulesTitle, titleData);

onMounted(() => {
  popup.value.open();
})

function addWord() {
  newWords.value.push({...templateNewWord});
}

function addNewValidator(arg) {
  allValidators.value.push(arg);
}

function deleteWord(index) {
  newWords.value.splice(index, 1);
  allValidators.value.splice(index, 1);
}

function submit() {
  let hasErrors = false;

  vTitle$.value.$validate();
  hasErrors = vTitle$.value.$error;

  allValidators.value.forEach(validator => {
    validator.value.$validate();
    hasErrors = validator.value.$error;
  })

  if (!hasErrors) {
    _cancel();
  }
}

function _cancel() {
  popup.value.close();
  emit('close');
}
</script>

<style scoped lang="scss">
.wrapper-add-new-group {
  width: 100%;
  max-width: 950px;
  min-width: 560px;
  height: 100%;
  max-height: 80vh;
  padding: 25px;
  border-radius: 10px;
  background-color: var(--green);
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  overflow: auto;
  transition: all 0.2s;

  p {
    font-size: 22px;
    font-weight: 700;
  }

  .data-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;

    .wrapper-name {
      position: relative;
      padding: 5px 10px 13px 10px;
      border-radius: 10px;
      background-color: var(--yellow);
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);

      input {
        width: 100%;
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
        bottom: -2px;
        left: 15px;
        font-size: 11px;
        color: var(--red);
      }
    }

    .wrapper-new-word {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>
