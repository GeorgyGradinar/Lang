<template>
  <div class="card big bg-white">
    <div class="tariffs__table">
      <div class="tariffs__table-header row-center">
        <div class="tariffs__table-col1">Способ оплаты</div>
        <div class="tariffs__table-col2">Дата платежа</div>
        <div class="tariffs__table-col3">Статус</div>
        <div class="tariffs__table-col4">Сумма</div>
      </div>
      <div  class="tariffs__table-body">
        <div class="tariffs__table-data">
          <div class="tariffs__table-row"
            v-for="payment in payments" :key="payment.id"
          >
            <div class="tariffs__table-col1-1">
              <img v-if="payment.method=='card'" src="img/icon/7367561.png">
              <img v-if="payment.method=='sbp'" src="img/icon/sbp_2.png">
            </div>
            <div class="tariffs__table-col1-2">{{ payment.cardNumber }} </div>
            <div class="tariffs__table-col2">{{ payment.date }}</div>
            <div class="tariffs__table-col3 pending">{{ payment.state }}</div>
            <div class="tariffs__table-col4">{{ payment.amount }} ₽</div>
            <div class="row-top"><img src="img/icon/bxs-download.svg">&nbsp;Чек</div>
          </div>
          <hr>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'PaymentListView',

  props: {
    'payments': Array
  }
}
</script>

<style>

</style>