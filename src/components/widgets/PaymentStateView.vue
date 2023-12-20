<template>
  <div class="card bg-base-light-violet">
    <div class="tariffs__card-wrap">
      <div class="tariffs__card-title row-center">
        <img src="img/icon/bxs-crown1.svg">&nbsp;PRO-подписка
      </div>
      <div class="tariffs__card-descr">
        Изучайте анлийский со всеми преимуществами подписки на эксклюзивные материалы и специальные функции
      </div>
      <div class="tariffs__card-price">
        {{ state.price }} <span class="lower">₽ </span>
      </div>
      <div class="tariffs__card-button">
        <button class="bg-base-1" @click="$router.push('/tariff')">Открыть тарифы</button>
      </div>
      <div class="tariffs__card-deadline">
        Следующая оплата {{ state.stopDate }}
      </div>
      <div @click="$emit('cancelSubscr')">
        <a href="#">Отменить подписку</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentStateView',

  props:{
    'state' : Object
  },

  emits: ['cancelSubscr']

}
</script>

<style>

</style>