<template>
  <div class="wrapper-input" v-if="validationInput">
    <input v-model="currentData[title]"
           @input="validationInput[title].$touch"
           @blur="validationInput[title].$touch"
           :class="{'active-error': validationInput[title]?.$errors.length}"
           :type="currentType"
           :placeholder="title">
    <p class="error-message"
       :class="{'error-message-show': validationInput[title]?.$errors.length}"
       v-if="validationInput[title]?.$errors.length">
      {{ mapErrors(validationInput[title]?.$errors)[0] }}
    </p>
    <div class="wrapper-eyes" v-if="title === 'password' || title === 'confirmPass'">
      <img v-if="isShowPassword" @click.prevent="toggleShowPassword" src="img/signin/eye-on.svg" alt="">
      <img v-else @click.prevent="toggleShowPassword" src="img/signin/eye-off.svg" alt="">
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, ref, toRefs} from "vue";
import validation from "@/mixins/validation";

// eslint-disable-next-line no-undef
const props = defineProps({
  title: String,
  data: Object,
  validationInput: Object,
  type: String
})

const {title, validationInput, type} = toRefs(props);

// eslint-disable-next-line no-unused-vars
const {mapErrors} = validation();

let currentData = ref();
let currentType = ref();
let isShowPassword = ref(false);

onBeforeMount(() => {
  currentData.value = props.data;
  if (title.value === 'password') {
    currentType.value = 'password';
  } else {
    currentType.value = type.value;
  }

})


function toggleShowPassword() {
  isShowPassword.value = !isShowPassword.value;
  currentType.value = isShowPassword.value ? type.value : 'password';
}
</script>

<style scoped lang="scss">
.wrapper-input {
  position: relative;

  input {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    background-color: var(--yellow);
    transition: all 0.2s;

    &::placeholder {
      color: var(--dark);
    }

    &:focus {
      outline: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .active-error {
    background-color: var(--red);
  }

  .error-message {
    position: absolute;
    top: 0;
    left: 5px;
    font-size: 13px;
    color: var(--red);
    transition: all 0.3s;
  }

  .error-message-show {
    top: 38px;
  }

  .wrapper-eyes {
    position: absolute;
    display: flex;
    top: 6px;
    right: 7px;

    img {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
  }
}
</style>
