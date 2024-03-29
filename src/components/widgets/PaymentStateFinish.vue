<template>
  <div class="wrapper-payment-finish">
    <h2>Ваш <span>PRO</span> тариф истек</h2>

    <button>Продлить <span>PRO</span> тариф</button>

    <p>Так же вы можете выбрать другой тариф <a href="">здесь</a></p>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.wrapper-payment-finish {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  padding: 20px;
  background-color: var(--red);
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  h2 {
    color: var(--light-green);
    font-weight: 700;

    span {
      color: var(--dark-pink);
    }
  }

  button {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: var(--yellow);
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.2s;

    span {
      color: var(--dark-pink);
    }

    &:hover {
      background-color: var(--light-green);
    }
  }

  p {
    color: var(--light-green);
    font-weight: 700;

    a {
      transition: all 0.2s;

      &:hover {
        color: var(--yellow);
      }
    }
  }
}
</style>
