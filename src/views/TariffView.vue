<template>
  <div class="price">
    <tariff-pro-view/>
    <tariffs-list-view/>
    <f-a-q-view :faq="faq"/>
  </div>
</template>

<script setup>
import TariffProView from '@/components/widgets/TariffProView.vue';
import TariffsListView from '@/components/widgets/TariffsListView.vue';
import FAQView from '@/components/widgets/FAQView.vue';
import {onMounted, ref} from "vue";
import userRequests from "@/mixins/requests/userRequesrs";

const {getPlans} = userRequests();

let faq = ref([]);

onMounted(() => {
  getPlans();

  faq.value = [
    {
      id: 0,
      show: true,
      q: 'Какие способы оплаты принимаются?',
      a: 'Оплатить Подписку Pro можно с помощью SberPay, YandexPay, кредитной или дебетовой карты.'
    },
    {
      id: 1,
      show: false,
      q: 'Как отменить подписку?',
      a: '2Оплатить Подписку Pro можно с помощью SberPay, YandexPay, кредитной или дебетовой карты.'
    },
    {
      id: 2,
      show: false,
      q: 'Существуют ли какие-либо скидки или сезонные акции?',
      a: '3Оплатить Подписку Pro можно с помощью SberPay, YandexPay, кредитной или дебетовой карты.'
    },
  ];
})
</script>

<style scoped lang="scss">
.price {
  border-bottom: 1px solid #fff;
  padding-top: 36px;
  background-color: var(--light-yellow);
}
</style>
