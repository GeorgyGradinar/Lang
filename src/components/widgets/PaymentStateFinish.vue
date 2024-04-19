<template>
  <div class="wrapper-payment-finish">
    <h2>Ваш <span>{{ plan?.name }}</span> тариф истек</h2>

    <button @click="getPaymentLink(plan?.id)">Продлить <span>{{ plan?.name }}</span> тариф</button>
    <p>Так же вы можете выбрать другой тариф ниже</p>

    <div class="price__tariffs-row">
      <tariff-card-view v-for="(tariff, index) in plans" :key="tariff.id"
                        :tariff="tariff"
                        :index="index"
                        :isMiniBlock="true"/>
    </div>
  </div>
</template>

<script setup>
import {mainStore} from "@/store/mainStore";
import {storeToRefs} from "pinia/dist/pinia";
import TariffCardView from '@/components/widgets/TariffCardView.vue';
import {toRefs} from "vue";
import userRequests from "@/mixins/requests/userRequesrs";

// eslint-disable-next-line no-undef
const props = defineProps({
  plan: Object
})
const {plan} = toRefs(props);
const main = mainStore();
const {plans} = storeToRefs(main);
const {getPaymentLink} = userRequests();

</script>

<style scoped lang="scss">
.wrapper-payment-finish {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  padding: 20px;
  background-color: var(--red);
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  h2 {
    color: var(--light-green);
    font-weight: 700;

    span {
      color: var(--dark-pink);
    }
  }

  button {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: var(--yellow);
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.2s;

    span {
      color: var(--dark-pink);
    }

    &:hover {
      background-color: var(--light-green);
    }
  }

  p {
    color: var(--light-green);
    font-weight: 700;

    a {
      transition: all 0.2s;

      &:hover {
        color: var(--yellow);
      }
    }
  }

  .price__tariffs-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
