<template>
  <div class="wrapper-payment-page">
    <message-view :messageText="endTariff"/>
    <div class="payment-page">
      <div class="wrapper-details">
        <payment-state-view v-if="!checkExpired()" :messageText="endTariff" :plan="currentPlan"/>
        <payment-state-finish v-else :plan="currentPlan"></payment-state-finish>
        <!--        <payment-method-view :state="paymentMethod"/>-->
      </div>

      <payment-list-view :payments="payments"/>
    </div>
  </div>
</template>

<script setup>
// import PaymentMethodView from '@/components/widgets/PaymentMethodView.vue';
import MessageView from '@/components/widgets/MessageView.vue';
import PaymentStateView from '@/components/widgets/PaymentStateView.vue';
import PaymentListView from '@/components/widgets/PaymentListView.vue';
import PaymentStateFinish from "@/components/widgets/PaymentStateFinish";
import {onMounted, ref, watch} from "vue";
import {mainStore} from "@/store/mainStore";
import {storeToRefs} from "pinia/dist/pinia";
import userRequests from "@/mixins/requests/userRequesrs";
import shared from "@/mixins/shared";

const main = mainStore();
const {person, plans} = storeToRefs(main);
const {getUser, getPlans} = userRequests();
const {getDate} = shared();

let payments = ref([]);

let endTariff = ref(null);
let currentPlan = ref(null);

onMounted(() => {
  checkPerson();
  checkPlans();
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

watch(person, () => {
  checkPerson();
})

watch(plans, () => {
  checkPlans();
})

function checkPerson() {
  if (!Object.keys(person.value).length) {
    getUser();
  } else {
    endTariff.value = getDate(person.value.plan_ended_at);
  }
}

function checkPlans() {
  if (!plans.value) {
    getPlans();
  } else {
    findTariff();
  }
}

function findTariff() {
  currentPlan.value = plans.value.find(plan => plan.id === person.value?.last_plan_id);
}

function checkExpired() {
  return (person.value.plan_ended_at * 1000) < new Date().getTime();
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
