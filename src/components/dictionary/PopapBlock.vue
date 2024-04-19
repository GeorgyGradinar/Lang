<template>
  <v-tooltip activator="parent" location="bottom" class="info-button">
    <div class="popap-modal">
      <div class="wrapper-learned">
        <div class="learned">
          <p><img src="img/icon/lean.png">0</p>
        </div>
        <p>-</p>
        <p>Применяйте слова из словаря во время заданий и отрабатывайте слово</p>
      </div>

      <div class="wrapper-completed">
        <div class="completed">
          <p>Изучено: 1</p>
        </div>
        <p>-</p>
        <p>При использовании слова 10 раз оно считается изученым</p>
      </div>

      <div class="wrapper-tasks">
        <div class="tasks">
          <img src="img/icon/bxs-extension.svg">
        </div>

        <p>-</p>
        <p>Кнопка создания задания на тренировку слова</p>
      </div>
    </div>
  </v-tooltip>
</template>

<script setup>

</script>

<style lang="scss">
.info-button.v-tooltip > .v-overlay__content {
  display: flex;
  background-color: var(--pink) !important;
  opacity: 0.95;
  color: var(--light-yellow) !important;
  border-radius: 10px;
  border: 1px solid var(--dark);
  padding: 15px;
}

.popap-modal {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .translate,
  .volume,
  .tasks,
  .help,
  .add-word,
  .delete-word,
  .learned {
    display: flex;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    border-radius: 10px;
    padding: 7px;
    transition: all 0.2s;
    background-color: var(--dark-pink);

    img,
    svg {
      width: 20px;
      height: 20px;
      fill: var(--white);
    }

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(4px);
    }
  }

  .wrapper-learned {
    display: flex;
    gap: 10px;
    align-items: center;

    .learned {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-width: 40px;
      max-width: 55px;
      height: 37px;
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(2px);

      P {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 2px;
        color: var(--yellow);

        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }

  .wrapper-completed {
    display: flex;
    align-items: center;
    gap: 10px;
    border-top: 1px solid var(--light-yellow);
    padding-top: 10px;

    .completed {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--hard-green);
      border: 2px solid var(--hard-green);
      border-radius: 7px;
      padding: 5px;
      font-size: 12px;
      font-weight: 700;
      z-index: 0;
    }
  }

  .wrapper-tasks {
    display: flex;
    gap: 10px;
    align-items: center;
    border-top: 1px solid var(--light-yellow);
    padding-top: 10px;

    .tasks {
      width: 35px;
      height: 35px;
    }
  }
}


</style>
