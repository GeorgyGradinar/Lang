<template>
  <div class="callback-page">


    <div class="feedback-block">
      <h2>Обратная связь</h2>
      <p>Опишите свою проблему максимально подробно, и мы обязательно все решим!</p>
    </div>
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

  .feedback-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 40px 40px;
    border-radius: 10px;
    width: 70vw;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    margin-top: 10vh;
    background-color: var(--yellow);

    h2 {
      color: var(--dark-pink);
      font-weight: 800;
      font-size: 40px;
    }

    p {
      width: 50%;
      font-size: 23px;
      color: var(--dark-pink);
    }
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
      align-items: center;
      gap: 20px;
      width: 50%;

      button {
        display: flex;
        background-color: var(--yellow);

        &:hover {
          background-color: var(--pink);
          color: var(--light-yellow);
        }
      }
    }
  }
}

@media screen and (min-width: 2200px) {
  .callback-page {
    width: 100vw;

    .feedback-block {

      h2 {
        font-size: 50px;
      }

      p {
        font-size: 30px;
      }
    }

    .callback {

      .socials {

        p {
          font-size: 25px;
        }

        .vk-and-telegram {

          a {
            img {
              width: 70px;
            }
          }
        }
      }

      .call-center-block {


        p {
          font-size: 20px;
        }

        button {
          font-size: 20px;
        }
      }
    }
  }
}


@media screen and (max-width: 1000px) {
  .callback-page {

    .feedback-block {
      width: 95vw;

      h2 {
        text-align: center;
      }

      p {
        width: 100%;
        text-align: center;
      }
    }

    .callback {
      width: 95vw;

      .socials {

        p {
        }

        .vk-and-telegram {

          a {
            img {
            }
          }
        }
      }

      .call-center-block {


        p {
        }

        button {
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .callback-page {

    .feedback-block {

      h2 {
        font-size: 30px;
      }

      p {
        font-size: 18px;
      }
    }

    .callback {
      flex-direction: column;
      gap: 25px;

      .socials {

        p {
        }

        .vk-and-telegram {

          a {
            img {
            }
          }
        }
      }

      .call-center-block {
        width: 100%;

        p {
        }

        button {
        }
      }
    }
  }
}
</style>
