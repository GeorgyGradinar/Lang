<template>
  <div class="words-3__list">
    <div
        v-for="them in thems" :key="them.id"
        @click="$emit('selected', them)"
    >
      {{ them.title }}

    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemsView',
  props: {
    'thems': Array
  },
  emits: ['selected'],
}
</script>

<style scoped lang="scss">
.words-3__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  padding-top: 32px;

  div {
    cursor: pointer;
    width: 154px;
    height: 72px;
    color: #fff;
    background-color: #7a66ff;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.2s;

    &:hover {
      background-color: #9747ff;
    }

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }
}

</style>
