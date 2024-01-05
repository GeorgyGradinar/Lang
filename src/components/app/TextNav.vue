<template>
  <div class="words-2__nav2" :class="{'left' : tabs[0]?.id === tabID}">
    <div
        v-for="tab in tabs" :key="tab.id"
        @click="() => {tabID = tab.id; emit('selected', tab)}"
        :class="{'active': tab.id === tabID}">
      {{ tab.title }}
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

let tabID = ref(0);

onMounted(() => {
  if (props.tabs.length > 0) {
    tabID.value = props.tabs[0].id;
  }
})
</script>

<style scoped lang="scss">
.words-2__nav2 {
  position: relative;
  display: flex;
  background-color: var(--purple);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--dark);
  margin-bottom: 20px;

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: calc(100% - 140px);
    width: 140px;
    height: 100%;
    border-radius: 10px;
    background-color: var(--blue);
    transition: all 0.2s;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    z-index: 1;
  }

  div {
    cursor: pointer;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
    padding: 5px 10px;
    z-index: 2;
    transition: all 0.2s;
    margin-bottom: 2px;

    &:hover {
      text-decoration: none;
      color: var(--yellow);
    }

    &.active {
      text-decoration: none;
      color: var(--yellow);
    }
  }

  &.left {
    &:after {
      left: -2px;
      width: 110px;
    }
  }
}
</style>
