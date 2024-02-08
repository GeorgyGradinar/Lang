<template>
  <div>
    <div class="words__group-row">
      <div class="words__group"
           v-for="group in groups" :key="group.id"
           @click="emit('selected', group)"
      >
        {{ group.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  groups: Array
});

// eslint-disable-next-line no-undef
const emit = defineEmits(['selected']);
</script>

<style scoped lang="scss">
.words__group-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  .words__group {
    background-color: var(--blue);
    padding: 10px;
    border-radius: 10px;
    color: var(--white);
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      color: var(--dark);
      background-color: var(--yellow);
    }

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }
}
</style>
