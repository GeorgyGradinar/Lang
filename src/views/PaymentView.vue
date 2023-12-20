<template>
  <div>
    <message-view
      :messageText="messageText1"
    />
    <div class="tariffs bg-orange">
      <div class="wrap">
        <div class="tariffs__cards">
          <div>
            <payment-state-view 
              :state="paymentState"
              @cancelSubscr="cancelSubscr"
            />
            <payment-method-view
              :state="paymentMethod"
            />
          </div>

          <payment-list-view
            :payments="payments"
           />
        </div>
      </div>
    </div>
  </div>
  <cancel-subscription-dlg ref="cancelsubscriptiondlg"/>
</template>

<script>
import MessageView from '@/components/widgets/MessageView.vue'
import PaymentStateView from '@/components/widgets/PaymentStateView.vue'
import PaymentMethodView from '@/components/widgets/PaymentMethodView.vue'
import PaymentListView from '@/components/widgets/PaymentListView.vue'
import CancelSubscriptionDlg from '@/components/modals/CancelSubscriptionDlg.vue'


export default {
  name: 'PaymentView',
  components : {
    MessageView, PaymentStateView, PaymentMethodView, PaymentListView, CancelSubscriptionDlg,
  },
  data: () => ({
    messageText1 : '111',
    paymentState : {},
    paymentMethod : {},
    payments: []
  }),

  mounted () {
    this.messageText1 = 'Ваша подписка действует до 29 октября 2024, 23:00'

    this.paymentState = {
      price: '21 480',
      stopDate: '29 окт. 2024, 23:01'
    }

    this.paymentMethod = {
      cardNumber : '***0102'
    }

    this.payments = [
      {id:0, method: 'card', cardNumber: 'Дебетовая карта ***0102', date: '28 октября 2023', state: 'В обработке', amount: '21 480'},
      {id:1, method: 'card', cardNumber: 'Дебетовая карта ***0102', date: '28 июля 2023', state: 'Исполнен', amount: '2 990'},
      {id:2, method: 'sbp', cardNumber: 'СБП по карте ***0102', date: '28 июля 2023', state: 'Отказан', amount: '2 990'},
      {id:3, method: 'sbp', cardNumber: 'СБП по карте ***0102', date: '5 мая 2023', state: 'Исполнен', amount: '2 990'},
      {id:4, method: 'card', cardNumber: 'Дебетовая карта ***0102', date: '18 ноября 2021', state: 'Исполнен', amount: '1 480'},
      {id:5, method: 'card', cardNumber: 'Дебетовая карта ***0102', date: '15 июля 2021', state: 'Исполнен', amount: '1 480'},
      {id:6, method: 'sbp', cardNumber: 'СБП по карте ***0102', date: '5 мая 2021', state: 'Исполнен', amount: '2 990'}
    ]
  },

  methods: {
    cancelSubscr() {
      this.$refs.cancelsubscriptiondlg.show()
    }
  }
}
</script>

<style>

</style>