<template>
  <div class="wrapper-payment-method">
    <h2>
      Способ оплаты
    </h2>
    <p>
      Ваш метод оплаты для совершения операций по подписке
    </p>
    <p>
      Дебетовая карта <span> {{ state.cardNumber }}</span>
    </p>
    <button>Изменить способ оплаты</button>
  </div>
</template>

<script>
export default {
  name: 'PaymentMethodView',
  props: {
    'state': Object
  }
}
</script>

<style scoped lang="scss">
.wrapper-payment-method {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  color: var(--light-green);
  background-color: var(--blue);

  button {
    padding: 5px 10px;
    color: var(--dark);
    background-color: var(--yellow);
    border-radius: 10px;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.2s;

    &:hover {
      background-color: var(--light-green);
    }

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }
}

@media screen and (max-width: 600px) {
  .wrapper-payment-method {

    button {
      font-size: 0.8em;
    }
  }
}
</style>
