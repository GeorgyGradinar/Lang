<template>
  <div class="wrapper-state">
    <h2><img src="img/icon/bxs-crown1.svg">&nbsp;PRO-подписка</h2>
    <p>
      - Изучайте анлийский со всеми преимуществами подписки на эксклюзивные материалы и специальные функции
    </p>
    <p>
      - {{ state.price }} <span class="lower">₽ </span>
    </p>

    <p>- Следующая оплата {{ state.stopDate }}</p>
    <div class="wrapper-buttons">
      <button class="button-cancel-subscribe" @click="$emit('cancelSubscr')">Отменить подписку</button>
      <button @click="$router.push('/tariff')">Открыть тарифы</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentStateView',

  props: {
    'state': Object
  },

  emits: ['cancelSubscr']
}
</script>

<style scoped lang="scss">
.wrapper-state {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  color: var(--light-green);
  background-color: var(--red);

  h2 {
    display: flex;
    align-items: center;
  }

  .wrapper-buttons {
    display: flex;
    gap: 20px;

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
