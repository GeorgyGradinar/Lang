<template>
  <div class="login-block">
    <div class="login__form">
      <div class="wrapper-title">
        <p class="login__form-title">Войдите в аккаунт</p>
        <p class="error-message">{{ errorMessage }}</p>
      </div>

      <form>
        <InputElement :title="'email'"
                      :data="loginData"
                      :validationInput="vLogin$"
                      :type="'email'">
        </InputElement>
        <InputElement :title="'password'"
                      :data="loginData"
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
      <img src="img/Фоны-01.png">
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
import authRequests from "@/mixins/requests/authRequests";
import {useRouter} from "vue-router/dist/vue-router";

// eslint-disable-next-line no-undef
const emit = defineEmits(['openRegistration']);
const {login} = authRequests();
const router = useRouter();

let errorMessage = ref('');
let loginData = ref({
  email: '',
  password: ''
})

let rulesLogin = {
  email: {required, email},
  password: {required, minLength: minLength(8)}
}

const vLogin$ = useVuelidate(rulesLogin, loginData.value);

function submitLogin() {
  vLogin$.value.$validate();

  if (!vLogin$.value.$error) {
    login(loginData.value)
        .then(response => {
          if (response.data) {
            router.push('/');
          } else {
            errorMessage.value = response.response.data.error;
          }
        })
  }
}

</script>

<style scoped lang="scss">
.login-block {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 25px;
  border-radius: 7px;
  backface-visibility: hidden;
  transform: rotateX(180deg);
  background-color: var(--light-yellow);

  .login__form {

    .wrapper-title {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 10px;

      .login__form-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--dark);
      }

      .error-message {
        color: var(--red);
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 25px;

      .wrapper-buttons {
        margin-bottom: 20px;

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

            &:hover {
              background-color: var(--light-yellow);
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

  .sign-promo {
    display: flex;
    align-items: flex-end;
    width: 52%;
    height: 100%;

    img {
      width: 430px;
    }
  }
}

@media screen and (max-width: 900px) {
  .login-block {


    .login__form {

      .wrapper-title {

        .login__form-title {

        }

        .error-message {

        }
      }

      form {

        .wrapper-buttons {

          .login_question {

            button {

              a {

              }
            }
          }

          button {

          }
        }
      }
    }

    .sign-promo {

      img {
        width: 300px;
      }
    }
  }
}

@media screen and (max-width: 720px) {
  .login-block {
    padding: 15px;

    .login__form {
      width: 100%;

      .wrapper-title {

        .login__form-title {

        }

        .error-message {

        }
      }

      form {

        .wrapper-buttons {

          .login_question {

            button {

              a {

              }
            }
          }

          button {

          }
        }
      }
    }

    .sign-promo {
      display: none;

      img {

      }
    }
  }
}
</style>
