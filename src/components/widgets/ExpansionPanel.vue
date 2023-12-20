<template>
  <v-expansion-panel @click="toggleExpansionPanel">
    <v-expansion-panel-title>
      {{ question.q }}

      <img class="chevron-down" v-if="!isShowImg" src="img/chevron-down.svg" alt="chevron-down.svg"/>
      <img class="chevron-up" v-if="isShowImg" src="img/chevron-up.svg" alt="chevron-up.svg"/>

    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <p>{{ question.a }}</p>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup>
import {ref} from "vue";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  question: Object
})

let isShowImg = ref(false);

function toggleExpansionPanel() {
  isShowImg.value = !isShowImg.value;
}
</script>

<style lang="scss">
.v-expansion-panel {
  background-color: var(--yellow) !important;
  border-radius: 10px!important;
}

.v-expansion-panel-title {
  .v-expansion-panel-title__icon {
    display: none;
  }

  .chevron-down,
  .chevron-up {
    width: 20px;
    height: 20px;
  }
}

.v-expansion-panel-text {
  .v-expansion-panel-text__wrapper {
    p {
      font-size: 12px;
    }
  }
}
</style>
