<template>
  <div class="mistakes__nav">
    <p class="div-center"
         v-for="tab in tabs" :key="tab.id"
         :class="{'active' : tab.id === selectedID}"
         @click="()=>{selectedID=tab.id; emit('selected', tab)}"
    >
      {{ tab.title }}
    </p>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  tabs: Array
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['selected']);

let selectedID = ref(0);

onMounted(() => {
  if (props.tabs.length > 0) {
    selectedID.value = props.tabs[0].id;
  }
})
</script>

<style scoped lang="scss">
.mistakes__nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 60px;

  p {
    cursor: pointer;
    width: 200px;
    font-weight: 700;
    text-align: center;
    background-color: #4f3dca;
    transition: all 0.2s;
    border-top: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);

    &:hover {
      background-color: #9747ff;
    }

    &:first-child {
      border-top-left-radius: 10px;
      border: 1px solid var(--dark);
      border-bottom: unset;
    }

    &:last-child {
      border-top-right-radius: 10px;
      border: 1px solid var(--dark);
      border-bottom: unset;
    }

    &.active {
      background-color: #bc32fc;
    }
  }
}

@media screen and (max-width: 700px) {
  .mistakes__nav {

    p {
      width: 120px;
      font-size: 10px;

      &:hover {

      }

      &:first-child {

      }

      &:last-child {
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .mistakes__nav {

    p {
      width: 100px;
      font-size: 10px;

      &:hover {

      }

      &:first-child {

      }

      &:last-child {
      }
    }
  }
}
</style>
