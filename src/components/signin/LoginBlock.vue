<template>
  <div class="login-block">
    <div class="login__form">
      <p class="login__form-title">Создайте аккаунт</p>
      <form>
        <InputElement :title="'email'"
                      :data="login"
                      :validationInput="vLogin$"
                      :type="'email'">
        </InputElement>
        <InputElement :title="'password'"
                      :data="login"
                      :validationInput="vLogin$"
                      :type="'text'">
        </InputElement>
        <div class="wrapper-buttons">
          <button @click.prevent="submitLogin">Войти</button>
          <div class="login_question">
            <p>У вас нет аккаунта?</p>
            <button class="switcher" @click.prevent="emit('openRegistration', false)">
              <a href="#">Зарегистрироваться</a>
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
import InputElement from "@/components/signin/InputElement";
import {email, minLength, required} from "@vuelidate/validators";
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";


// eslint-disable-next-line no-undef
const emit = defineEmits(['openRegistration']);

let login = ref({
  email: '',
  password: ''
})

let rulesLogin = {
  email: {required, email},
  password: {required, minLength: minLength(8)}
}

const vLogin$ = useVuelidate(rulesLogin, login.value);

function submitLogin() {
  vLogin$.value.$validate();

  if (!vLogin$.value.$error) {
    console.log('login')
  }
}

</script>

<style scoped lang="scss">
.login-block {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 7px;
  backface-visibility: hidden;
  transform: rotateX(180deg);
  background-color: var(--light-yellow);

  .login__form {
    .login__form-title {
      font-size: 18px;
      font-weight: 700;
      margin: 10px 0;
      color: var(--dark);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;

      .wrapper-buttons {
        margin-bottom: 10px;

        .login_question {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
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
