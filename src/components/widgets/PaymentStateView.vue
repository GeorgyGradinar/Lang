<template>
  <div class="wrapper-state">
    <h2><img src="img/icon/bxs-crown1.svg">{{ plan?.name }}</h2>
    <p>Цена: <span>{{ plan?.price }} ₽ / месяц</span></p>

    <p>Остаток заданий: <span>{{ person?.tasks }}</span></p>
    <p>Остаток сообщений: <span>{{ person?.messages }}</span></p>

    <p>Оплата действует до: <span>{{ messageText }}</span></p>

    <div class="wrapper-buttons">
      <button @click="getPaymentLink(plan?.id)">Продлить и пополнить</button>
      <button @click="$router.push('/tariff')"> Выбрать другой тариф</button>
    </div>
  </div>
</template>

<script setup>
import {toRefs} from "vue";
import userRequests from "@/mixins/requests/userRequesrs";
import {mainStore} from "@/store/mainStore";
import {storeToRefs} from "pinia/dist/pinia";

// eslint-disable-next-line no-undef
const props = defineProps({
  messageText: String,
  plan: Object
})
const {messageText, plan} = toRefs(props);
const {getPaymentLink} = userRequests();
const main = mainStore();
const {person} = storeToRefs(main);
</script>

<style scoped lang="scss">
.wrapper-state {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  color: var(--light-green);
  background-color: var(--dark-pink);

  h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 35px;
    color: var(--yellow);

    img {
      width: 30px;
    }
  }

  p {
    span {
      color: var(--yellow);
      font-size: 17px;
    }
  }

  .wrapper-buttons {
    display: flex;
    gap: 20px;

    button {
      padding: 5px 10px;
      color: var(--dark);
      background-color: var(--yellow);
      border-radius: 10px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      transition: all 0.2s;

      &:last-of-type {
        background-color: var(--light_pink);
      }

      &:hover {
        background-color: var(--light-green);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .wrapper-state {
    .wrapper-buttons {
      button {
        font-size: 0.8em;
      }
    }
  }
}
</style>
