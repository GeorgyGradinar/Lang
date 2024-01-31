<template>
  <popup-modal ref="popup" @onEsc="_cancel()">
    <div class="wrapper-dialog">
      <p>Добавьте новое слово</p>

      <div class="wrapper-new-word">
        <NewWord v-for="(wordData, index) in newWords" :key="wordData.id"
                 :wordData="wordData"
                 :index="index"
                 @validator="addNewValidator"
                 @delete="deleteWord">
        </NewWord>
        <ButtonForAddWordAndGroup @addWord="moreWord"
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
import dictionaryRequests from "@/mixins/requests/dictionaryRequests";

// eslint-disable-next-line no-undef,no-unused-vars
const emit = defineEmits(['close']);
const templateNewWord = {
  id: 255,
  english: 'test',
  russian: 'тест'
}
const {addWords} = dictionaryRequests();

let popup = ref(null);
let newWords = ref([{...templateNewWord}]);
let allValidators = ref([]);

onMounted(() => {
  popup.value.open();
})

function moreWord() {
  newWords.value.push({...templateNewWord});
}

function addNewValidator(arg) {
  allValidators.value.push(arg);
}

function deleteWord(index) {
  newWords.value.splice(index, 1);
}

function submit() {
  let hasErrors = false;
  allValidators.value.forEach(validator => {
    validator.value.$validate();
    hasErrors = validator.value.$error;
  })

  if (!hasErrors) {
    // _cancel();
    addWords(templateNewWord);
  }
}

function _cancel() {
  popup.value.close();
  emit('close');
}
</script>

<style scoped lang="scss">
.wrapper-dialog {
  width: 100%;
  max-width: 950px;
  min-width: 560px;
  height: 100%;
  max-height: 80vh;
  padding: 25px 25px 10px 25px;
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

  .wrapper-new-word {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0;
  }
}
</style>
