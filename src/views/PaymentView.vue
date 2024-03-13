<template>
  <div class="wrapper-payment-page">
    <message-view :messageText="messageText"/>
    <div class="payment-page">
      <div class="wrapper-details">
        <payment-state-view :state="paymentState" @cancelSubscr="toggleDialogSubscription(true)"/>
        <payment-method-view :state="paymentMethod"/>
      </div>

      <payment-list-view :payments="payments"/>
    </div>
  </div>
  <cancel-subscription-dlg :isShow="isOpenCancelDialog" @close="toggleDialogSubscription"/>
</template>

<script setup>
import MessageView from '@/components/widgets/MessageView.vue';
import PaymentStateView from '@/components/widgets/PaymentStateView.vue';
import PaymentMethodView from '@/components/widgets/PaymentMethodView.vue';
import PaymentListView from '@/components/widgets/PaymentListView.vue';
import CancelSubscriptionDlg from '@/components/modals/CancelSubscriptionDlg.vue';
import {onMounted, ref} from "vue";

let messageText = ref('111');
let paymentState = ref({});
let paymentMethod = ref({});
let payments = ref([]);
let isOpenCancelDialog = ref(false);

onMounted(() => {
  messageText.value = 'Ваша подписка действует до 29 октября 2024, 23:00';
  paymentState.value = {
    price: '21 480',
    stopDate: '29 окт. 2024, 23:01'
  };
  paymentMethod.value = {
    cardNumber: '***0102'
  };
  payments.value = [
    {
      id: 0,
      method: 'card',
      cardNumber: 'Дебетовая карта ***0102',
      date: '28 октября 2023',
      state: 'В обработке',
      amount: '21 480'
    },
    {
      id: 1,
      method: 'card',
      cardNumber: 'Дебетовая карта ***0102',
      date: '28 июля 2023',
      state: 'Исполнен',
      amount: '2 990'
    },
    {
      id: 2,
      method: 'sbp',
      cardNumber: 'СБП по карте ***0102',
      date: '28 июля 2023',
      state: 'Отказан',
      amount: '2 990'
    },
    {
      id: 3,
      method: 'sbp',
      cardNumber: 'СБП по карте ***0102',
      date: '5 мая 2023',
      state: 'Исполнен',
      amount: '2 990'
    },
    {
      id: 4,
      method: 'card',
      cardNumber: 'Дебетовая карта ***0102',
      date: '18 ноября 2021',
      state: 'Исполнен',
      amount: '1 480'
    },
    {
      id: 5,
      method: 'card',
      cardNumber: 'Дебетовая карта ***0102',
      date: '15 июля 2021',
      state: 'Исполнен',
      amount: '1 480'
    },
    {id: 6, method: 'sbp', cardNumber: 'СБП по карте ***0102', date: '5 мая 2021', state: 'Исполнен', amount: '2 990'}
  ]

})

function toggleDialogSubscription(isOpen) {
  isOpenCancelDialog.value = isOpen;
}

</script>

<style scoped lang="scss">
.wrapper-payment-page {
  width: 100vw;
  height: calc(100vh - 82px);

  .payment-page {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 30px;

    .wrapper-details {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 40%;
    }
  }
}

@media screen and (max-width: 1000px) {
  .wrapper-payment-page {
    .payment-page {
      flex-direction: column;

      .wrapper-details {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .wrapper-payment-page {
    .payment-page {
      padding: 30px 10px;
    }
  }
}
</style>
