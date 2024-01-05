<template>
  <div class="signin__form-wrap">
    <div class="signin__form">
      <p class="signin__form-title">Создайте аккаунт</p>
      <form v-if="vRegistration$.email">
        <InputElement :title="'name'"
                      :data="registration"
                      :validationInput="vRegistration$"
                      :type="'text'">
        </InputElement>

        <InputElement :title="'email'"
                      :data="registration"
                      :validationInput="vRegistration$"
                      :type="'email'">
        </InputElement>

        <InputElement :title="'password'"
                      :data="registration"
                      :validationInput="vRegistration$"
                      :type="'text'">
        </InputElement>

        <InputElement :title="'confirmPass'"
                      :data="registration"
                      :validationInput="vRegistration$"
                      :type="'text'">
        </InputElement>

        <div class="wrapper-buttons">
          <button @click.prevent="submitRegistration">Создать аккаунт</button>
          <div class="login_question">
            <p>Уже есть?</p>
            <button class="switcher" @click.prevent="emit('openLogin', true)">
              <a href="#">Войти</a>
            </button>
          </div>
        </div>
      </form>
      <AcceptPolicy></AcceptPolicy>
      <SocialsBlock></SocialsBlock>
    </div>
    <div class="sign-promo">
      <img src="img/Saly.png">
    </div>
  </div>
</template>

<script setup>
import SocialsBlock from "@/components/signin/SocialsBlock";
import AcceptPolicy from "@/components/signin/AcceptPolicy";
import {computed, ref} from "vue";
import {email, minLength, required, sameAs} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import InputElement from "@/components/signin/InputElement"

// eslint-disable-next-line no-undef
const emit = defineEmits(['openLogin']);

let registration = ref({
  name: '',
  email: '',
  password: '',
  confirmPass: ''
})

const passwordRef = computed(() => registration.value.password);
const rulesRegistration = {
  name: {required},
  email: {required, email},
  password: {required, minLength: minLength(8)},
  confirmPass: {required, sameAs: sameAs(passwordRef)}
}

const vRegistration$ = useVuelidate(rulesRegistration, registration.value);

function submitRegistration() {
  vRegistration$.value.$validate();

  if (!vRegistration$.value.$error) {
    console.log('registration')
  }
}
</script>

<style scoped lang="scss">
.signin__form-wrap {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 7px;
  backface-visibility: hidden;
  background-color: var(--light-yellow);

  .signin__form-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    color: var(--dark);
  }

  .signin__form {

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;

      .wrapper-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 10px;

        .login_question {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--dark);

          button {
            background-color: var(--yellow);

            a {
              color: var(--dark);
              text-decoration: none;
            }
          }
        }

        button {
          padding: 5px 10px;
          border-radius: 10px;
          border: 1px solid var(--dark);
          box-shadow: 1px 4px 1px var(--dark);
          background-color: var(--green);
          transition: all 0.2s;

          &:hover {
            background-color: var(--yellow);
            color: var(--dark);
          }

          &:active {
            box-shadow: 0 0 1px var(--dark);
            transform: translateY(5px);
          }
        }
      }
    }
  }
}
</style>
