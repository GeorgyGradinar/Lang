<template>
  <div class="price__faq" data-aos="fade-up"
       :data-aos-delay="20"
       data-aos-duration="500"
       data-aos-once="true">
    <v-expansion-panels variant="accordion" multiple>
      <ExpansionPanel v-for="question in faq" :key="question.id" :question="question"></ExpansionPanel>
    </v-expansion-panels>
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
  display: flex;
  justify-content: center;
  padding: 80px 0;

  .v-expansion-panels {
    width: 100%;
    max-width: 800px;
    border-radius: 10px;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);

    .v-expansion-panel-title {
      font-size: 18px;
      font-weight: 700;
      padding: 20px 25px;
    }

    .v-expansion-panel-text .v-expansion-panel-text__wrapper {

      p {
        font-size: 14px;
        font-weight: 600;
      }
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
