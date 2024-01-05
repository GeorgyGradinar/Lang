<template>
  <div class="signin__form-socials">
    <a><img src="img/icon/yandex-ic.svg"></a>
    <a><img src="img/icon/google-ic1.svg"></a>
    <a><img src="img/icon/vk-ic.svg"></a>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.signin__form-socials {
  display: flex;
  gap: 20px;

  a {
    width: 44px;
    height: 44px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    cursor: pointer;
    transition: all 0.2s;

    img {
      width: 45px;
      height: 45px;
    }

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }
}
</style>
