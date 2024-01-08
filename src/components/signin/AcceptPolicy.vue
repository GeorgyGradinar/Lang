<template>
  <label class="container">Согласие с
    <a href="#">условиями соглашения и политикой конфиденциальности</a>
    <input type="checkbox" checked="checked">
    <span class="checkmark"></span>
  </label>
</template>

<script setup>

</script>

<style scoped lang="scss">
.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 12px;
  padding: 0 0 0 40px;
  margin-bottom: 20px;
  height: 35px;
  min-height: 0;
  color: var(--blue);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    & ~ .checkmark {
      background-color: var(--yellow);
    }

    &:active ~ .checkmark {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }

    &:checked ~ .checkmark {
      background-color: #2196F3;
    }

    &:checked ~ .checkmark:after {
      display: block;
    }
  }

  .checkmark {
    position: absolute;
    top: 5px;
    left: 0;
    height: 25px;
    width: 25px;
    border-radius: 5px;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.2s;

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 9px;
      top: 5px;
      width: 6px;
      height: 11px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}

</style>
