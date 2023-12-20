<template>
  <div class="price__faq bg-base-light-violet">
    <div class="price__faq-wrap bg-base-1">
      <v-expansion-panels variant="accordion" multiple>
        <ExpansionPanel v-for="question in faq" :key="question.id" :question="question"></ExpansionPanel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script setup>
import ExpansionPanel from '@/components/widgets/ExpansionPanel';

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  faq: Array
});
</script>

<style lang="scss">
.price__faq {
  padding-top: 50px;
  padding-bottom: 72px;
  font-size: 20px;

  .price__faq-wrap {
    display: flex;
    justify-content: center;
    padding: 48px 0;

    .v-expansion-panels {
      width: 100%;
      max-width: 600px;
      border-radius: 10px;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
    }
  }
}

@media screen and (max-width: 750px) {
  .price__faq {
    padding-top: 50px;

    .price__faq-wrap {
      padding: 30px 10px;
    }
  }
}
</style>
