<template>
  <div class="price">
    <tariff-pro-view/>
    <tariffs-list-view :tariffs="tariffs"/>
    <f-a-q-view :faq="faq"/>
  </div>
</template>

<script setup>
import TariffProView from '@/components/widgets/TariffProView.vue';
import TariffsListView from '@/components/widgets/TariffsListView.vue';
import FAQView from '@/components/widgets/FAQView.vue';
import {onMounted, ref} from "vue";

let tariffs = ref([]);
let faq = ref([]);

onMounted(() => {
  tariffs.value = [
    {
      id: 1,
      title: 'Еженедельно',
      bgclass: 'bg-base-purple',
      descrTop: 'Регулярные занятия английским дадут отличные результаты.',
      price: '890',
      priceTitle: '/неделя',
      priceCur: '₽',
      buttonTitle: 'Начать обучение',
      descrBottom: 'Оплата еженедельно.<br> Отмена в любое время.'
    },
    {
      id: 2,
      title: 'Ежегодно',
      bgclass: 'bg-base-dark-purple',
      descrTop: '15 минут ежедневно в течение 3 месяцев = подъем на 1 уровень.',
      price: '1 790',
      priceTitle: '/месяц',
      priceCur: '₽',
      buttonTitle: 'Начать обучение',
      descrBottom: 'Оплата сразу одним <br> платежом 21 480 ₽ в год.'
    },
    {
      id: 3,
      title: 'Ежемесячно',
      bgclass: 'bg-base-blue',
      descrTop: '1 месяц занятий с нами стоит как 1 час занятий с репетитором.',
      price: '2 990',
      priceTitle: '/месяц',
      priceCur: '₽',
      buttonTitle: 'Начать обучение',
      descrBottom: 'Оплата ежемесячно.<br>Отмена в любое время.'
    },
  ];

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
