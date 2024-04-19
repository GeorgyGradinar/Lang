<template>
  <div class="signin__form-wrap">
    <div class="signin__form">
      <div class="wrapper-title">
        <p class="signin__form-title">Создайте аккаунт</p>
        <p class="error-message">{{ errorMessage }}</p>
      </div>
      <form v-if="vRegistration$.email">
        <InputElement :title="'name'"
                      :data="registrationData"
                      :validationInput="vRegistration$"
                      :type="'text'">
        </InputElement>

        <InputElement :title="'email'"
                      :data="registrationData"
                      :validationInput="vRegistration$"
                      :type="'email'">
        </InputElement>

        <InputElement :title="'password'"
                      :data="registrationData"
                      :validationInput="vRegistration$"
                      :type="'text'">
        </InputElement>

        <InputElement :title="'confirmPass'"
                      :data="registrationData"
                      :validationInput="vRegistration$"
                      :type="'text'">
        </InputElement>

        <div class="wrapper-buttons">
          <button @click.prevent="submitRegistration">Создать аккаунт</button>
          <div class="login_question">
            <p>Уже есть?</p>
            <button @click.prevent="emit('openLogin', true)">
              <a href="#">Войти</a>
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
import {computed, ref} from "vue";
import {email, minLength, required, sameAs} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import authRequests from "@/mixins/requests/authRequests";
import {useRouter} from "vue-router/dist/vue-router";

// eslint-disable-next-line no-undef
const emit = defineEmits(['openLogin']);
const {registration} = authRequests();
const router = useRouter();

let errorMessage = ref('');
let registrationData = ref({
  name: '',
  email: '',
  password: '',
  confirmPass: ''
})

const passwordRef = computed(() => registrationData.value.password);
const rulesRegistration = {
  name: {required},
  email: {required, email},
  password: {required, minLength: minLength(8)},
  confirmPass: {required, sameAs: sameAs(passwordRef)}
}

const vRegistration$ = useVuelidate(rulesRegistration, registrationData.value);

function submitRegistration() {
  errorMessage.value = '';
  vRegistration$.value.$validate();

  if (!vRegistration$.value.$error) {
    registration(registrationData.value)
        .then(response => {
          if (response?.data?.status === "success") {
            router.push({path: '/'})
          } else {
            errorMessage.value = response.response.data?.errors_validation?.email[0];
          }
        })
  }
}
</script>

<style scoped lang="scss">
.signin__form-wrap {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 25px;
  border-radius: 7px;
  backface-visibility: hidden;
  background-color: var(--light-yellow);

  .signin__form {

    .wrapper-title {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 10px;

      .signin__form-title {
        font-size: 18px;
        font-weight: 700;
        color: var(--dark);
      }

      .error-message {
        color: var(--red);
        font-size: 14px;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 10px;

      .wrapper-buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;

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
    width: 55%;
    height: 100%;

    img {
      width: 430px;
    }
  }
}

@media screen and (max-width: 900px) {
  .signin__form-wrap {

    .signin__form {

      .wrapper-title {

        .signin__form-title {

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

              &:hover {

              }
            }
          }

          button {


            &:hover {

            }

            &:active {

            }
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
  .signin__form-wrap {

    .signin__form {

      .wrapper-title {

        .signin__form-title {

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

              &:hover {

              }
            }
          }

          button {


            &:hover {

            }

            &:active {

            }
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
