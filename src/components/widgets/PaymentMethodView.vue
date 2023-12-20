<template>
<div class="card bg-base-light-violet second">
  <div class="tariffs__card-wrap">
    <div class="tariffs__card-title">
      Способ оплаты
    </div>
    <div class="tariffs__card-descr">
      Ваш метод оплаты для совершения операций по подписке
    </div>
    <div class="tariffs__card-paymethod">
      Дебетовая карта <span> {{ state.cardNumber }}</span>
    </div>
    <div>
      <a href="#">Изменить способ оплаты</a>
    </div>

  </div>
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

<style>

</style>