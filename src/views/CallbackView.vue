<template>
  <div class="callback-page">

    <h2>Обратная связь</h2>
    <div class="callback">
      <div class="socials">
        <p>text@mail.com</p>
        <div class="vk-and-telegram">
          <a><img src="img/vk.svg" alt="vk"></a>
          <a><img src="img/telegram.svg" alt="telegram"></a>
        </div>
      </div>
      <div class="call-center-block">
        <p>Если у вас остались дополнительные вопросы, можете связаться с оператором службы поддержки</p>
        <button class="secondary-button">Связаться</button>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
@import "src/assets/buttons";

.callback-page {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-top: 50px;
    color: var(--dark-pink);
    font-weight: 800;
    font-size: 30px;
  }

  .callback {
    display: flex;
    justify-content: space-between;
    width: 70vw;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    margin-top: 30px;
    padding: 40px 20px;
    border-radius: 10px;
    background-color: var(--light_pink);

    .socials {

      .vk-and-telegram {
        display: flex;
        gap: 10px;
        margin-top: 10px;

        a {
          display: flex;
          transition: all 0.2s;
          cursor: pointer;

          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }

    .call-center-block {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      width: 50%;

      button {
        display: flex;
        background-color: var(--yellow);
      }
    }
  }
}
</style>
