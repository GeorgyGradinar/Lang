<template>
  <div class="words-2__nav1" :class="{'left' : tabs[0]?.id === tabID}">
    <div v-for="tab in tabs" :key="tab.id"
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
.words-2__nav1 {
  position: relative;
  display: flex;
  line-height: 40px;
  background-color: var(--purple);
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid var(--dark);
  margin-bottom: 20px;

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: calc(100% - 260px);
    width: 260px;
    height: 100%;
    border-radius: 10px;
    background-color: var(--blue);
    transition: all 0.2s;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
  }

  div {
    cursor: pointer;
    padding-left: 28px;
    padding-right: 28px;
    margin-bottom: 3px;
    z-index: 2;
    transition: all 0.2s;

    &:hover {
      color: var(--yellow);
    }

    &.active {
      color: var(--yellow);
    }
  }
}

.words-2__nav1.left {
  &:after {
    left: -2px;
    width: 176px;
  }
}

@media screen and (max-width: 500px) {
  .words-2__nav1 {
    line-height: 40px;
    font-size: 12px;
    margin-bottom: 20px;

    &:after {
      left: calc(100% - 190px);
      width: 190px;
    }
  }

  .words-2__nav1.left {
    &:after {
      left: -2px;
      width: 136px;
    }
  }
}
</style>
