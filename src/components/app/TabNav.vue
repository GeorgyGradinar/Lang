<template>
  <div class="mistakes__nav">
    <div class="navigation-errors"
         :class="{'left' : selectedID === 0, 'middle': selectedID === 1, 'right': selectedID === 2}">
      <p v-for="tab in tabs" :key="tab.id"
         :class="{'active' : tab.id === selectedID}"
         @click="()=>{selectedID=tab.id; emit('selected', tab)}">
        {{ tab.title }}
      </p>
    </div>
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
  display: flex;
  justify-content: flex-start;
  height: 50px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;

  .navigation-errors {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--light-yellow);
    border-radius: 10px;
    border: 1px solid var(--dark);

    &:after {
      content: '';
      position: absolute;
      top: -2px;
      left: calc(100% - 200px);
      width: 200px;
      height: 100%;
      border-radius: 10px;
      background-color: var(--red);
      transition: all 0.2s;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      z-index: 1;
    }

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 200px;
      height: 100%;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
      transition: all 0.2s;
      z-index: 2;
      color: var(--dark);

      &:hover {
        color: var(--blue);
      }

      &.active {
        color: var(--white);
      }
    }
  }

  .left {
    &:after {
      left: 0;
    }
  }

  .middle {
    &:after {
      left: 200px;
    }
  }

  .right {
    &:after {
      right: 0;
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
