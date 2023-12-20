<template>
  <div class="price__tariff" :class="tariff.bgclass">
    <div class="price__tariff-title">{{ tariff.title }}</div>
    <div class="price__tariff-text">{{ tariff.descrTop }}</div>
    <div class="wrapper-price">
      <span class="price__tariff-price">{{ tariff.price }}</span>
      <span class="price__tariff-price2">{{ tariff.priceCur }}</span>
      {{ tariff.priceTitle }}
    </div>
    <div class="price__tariff-buy">
      <button class="bg-base-1">{{ tariff.buttonTitle }}</button>
    </div>
    <div class="price__tariff-descr" v-html="tariff.descrBottom"></div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  tariff: Object
})
</script>

<style scoped lang="scss">
.price__tariff {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 360px;
  padding: 24px 32px;
  border-radius: 10px;
  color: var(--dark);
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  .price__tariff-title {
    font-size: 32px;
    font-weight: 700;
  }

  .price__tariff-text {
    font-size: 15px;
    font-weight: 600
  }

  .wrapper-price {
    color: var(--yellow);

    .price__tariff-price {
      font-size: 32px;
      font-weight: 700;
      color: var(--dark);
    }

    .price__tariff-price2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--dark);
    }
  }

  .price__tariff-buy {

    button {
      border-radius: 10px;
      color: #fff;
      padding: 5px;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      transition: all 0.2s;

      &:hover {
        cursor: pointer;
        background-color: var(--yellow);
        color: var(--dark);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }
    }
  }

  .price__tariff-descr {
    text-align: center;
    font-size: 15px;
    font-weight: 600
  }
}
</style>
