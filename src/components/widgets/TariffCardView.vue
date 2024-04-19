<template>
  <div class="price__tariff" :data-aos="!isMiniBlock ? 'fade-up' : ''"
       :class="{'mini-block': isMiniBlock}"
       :data-aos-delay="getTimeDelay()"
       data-aos-duration="500"
       data-aos-once="true">
    <img class="robot" data-aos="fade-down"
         :data-aos-delay="(index+1) * 150"
         data-aos-duration="500"
         data-aos-once="true"
         src="img/robots/робот-05.png" alt="robot">
    <p class="price__tariff-title">{{ tariff.name }}</p>
    <p class="price__tariff-text">{{ tariff.description }}</p>
    <div class="wrapper-price">
      <span class="price__tariff-price">{{ tariff.price }} </span>
      <span class="price__tariff-price2">₽</span>
      /месяц
    </div>
    <div class="price__tariff-buy">
      <button @click="buyTariff">Купить</button>
    </div>
    <div class="price__tariff-descr">
      <p>Сообщений в месяц - {{ tariff.message_quota }}</p>
      <p>Заданий в месяц - {{ tariff.task_quota }}</p>
    </div>
  </div>
</template>

<script setup>
import userRequests from "@/mixins/requests/userRequesrs";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  tariff: Object,
  index: Number,
  isMiniBlock: Boolean
});
const {getPaymentLink} = userRequests();

function buyTariff() {
  getPaymentLink(props.tariff.id);
}

function getTimeDelay() {
  if ((props.index + 1) % 2 === 0) {
    return 200
  } else if ((props.index + 1) % 3 === 0) {
    return 300
  } else {
    return 100
  }
}
</script>

<style scoped lang="scss">
.price__tariff {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
  padding: 10px 30px;
  margin-top: 25px;
  border-radius: 10px;
  color: var(--light-yellow);
  border: 2px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  .robot {
    position: absolute;
    top: -60px;
    right: -30px;
    display: none;
    width: 150px;
  }

  .price__tariff-title {
    font-size: 40px;
    font-weight: 800;
  }

  .price__tariff-text {
    font-size: 15px;
    font-weight: 700
  }

  .wrapper-price {
    color: var(--yellow);
    font-weight: 700;

    .price__tariff-price {
      font-size: 32px;
      font-weight: 700;
      color: var(--light-yellow);
    }

    .price__tariff-price2 {
      font-size: 20px;
      font-weight: 700;
      color: var(--light-yellow);
    }
  }

  .price__tariff-buy {

    button {
      border-radius: 10px;
      color: #fff;
      padding: 5px 10px;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      transition: all 0.2s;

      &:hover {
        cursor: pointer;
        background-color: var(--yellow);
        color: var(--dark);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }
    }
  }

  .price__tariff-descr {
    text-align: center;
    font-size: 15px;
    font-weight: 700;
  }

  &:first-child {
    color: var(--dark);
    background-color: var(--light-green);

    .wrapper-price {
      color: var(--purple);

      .price__tariff-price {
        color: var(--blue);
      }

      .price__tariff-price2 {
        color: var(--blue);
      }
    }

    .price__tariff-buy {

      button {
        background-color: var(--blue);

        &:hover {
          background-color: var(--light-green);
          color: var(--dark);
        }

        &:active {

        }
      }
    }

    .price__tariff-descr {
      color: var(--dark);


      button {
        background-color: var(--blue);

        &:hover {
          background-color: var(--light-green);
          color: var(--dark);
        }

        &:active {

        }
      }
    }
  }

  &:nth-child(odd) {
    color: var(--dark);
    background-color: var(--yellow);

    .wrapper-price {
      color: var(--purple);

      .price__tariff-price {
        color: var(--blue);
      }

      .price__tariff-price2 {
        color: var(--blue);
      }
    }

    .price__tariff-buy {

      button {
        background-color: var(--blue);

        &:hover {
          background-color: var(--yellow);
          color: var(--dark);
        }

        &:active {

        }
      }
    }
  }

  &:nth-child(even) {
    color: var(--dark);
    background-color: var(--light-green);

    .wrapper-price {
      color: var(--purple);

      .price__tariff-price {
        color: var(--blue);
      }

      .price__tariff-price2 {
        color: var(--blue);
      }
    }

    .price__tariff-buy {

      button {
        background-color: var(--blue);

        &:hover {
          background-color: var(--light-green);
          color: var(--dark);
        }

        &:active {

        }
      }
    }
  }

  &:last-child {
    color: var(--dark);
    background-color: var(--yellow);

    .robot {
      display: block;
    }

    .wrapper-price {
      color: var(--purple);

      .price__tariff-price {
        color: var(--blue);
      }

      .price__tariff-price2 {
        color: var(--blue);
      }
    }

    .price__tariff-buy {

      button {
        background-color: var(--blue);

        &:hover {
          background-color: var(--yellow);
          color: var(--dark);
        }

        &:active {

        }
      }
    }

    .price__tariff-descr {
      color: var(--dark);
    }
  }
}

.mini-block {
  width: 49%;
  padding: 10px 15px;
  margin-top: unset;
  margin-bottom: 15px;

  .robot {
    display: none !important;
  }

  .price__tariff-title {
    font-size: 30px;
  }
}

@media screen and (max-width: 1400px) {
  .price__tariff {
    width: 30%;
  }

  .mini-block {
    width: 49%;
  }
}

@media screen and (max-width: 1300px) {
  .price__tariff {
    width: 40%;
  }

  .mini-block {
    width: 100%;
  }
}

@media screen and (max-width: 1000px) {
  .price__tariff {
    width: 80%;
  }

  .mini-block {
    width: 49%;
  }
}

@media screen and (max-width: 500px) {
  .price__tariff {
    width: 100%;

    .robot {
      width: 120px;
    }

    .price__tariff-title {
      font-size: 35px;
    }
  }
}
</style>
