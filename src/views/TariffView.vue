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
      q: 'Что входит в тариф?',
      a: 'В тариф входит определённое количество заданий и сообщений с НейроРепититором и доступ к вашему кабинету на 1 месяц.'
    },
    {
      id: 1,
      show: false,
      q: 'Что делать если не успею потратить купленные задания и сообщения?',
      a: 'Они перенесутся на следующий месяц, но для продления доступа нужно будет активировать тариф (любой). Остаток просуммируется с новым.'
    },
    {
      id: 2,
      show: false,
      q: 'Как отменить подписку?',
      a: 'У нас нет автоматических списаний с вашей карты. Вы покупаете тариф, а затем если захотите его продлить нужно произвести повторную оплату вручную.'
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
