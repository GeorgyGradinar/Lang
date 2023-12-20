<template>
  <div class="price__tariffs-row">
    <tariff-card-view
        v-for="tariff in tariffs" :key="tariff.id"
        :tariff="tariff"
    />
  </div>
</template>

<script setup>
import TariffCardView from '@/components/widgets/TariffCardView.vue';

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  tariffs : Array
})
</script>

<style scoped lang="scss">
.price__tariffs-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 50px;
  gap: 20px;
}

@media screen and (max-width: 1000px){
  .price__tariffs-row {
    padding: 50px 20px;
  }
}
</style>
