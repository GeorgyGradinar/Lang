<template>
  <div class="price__tariff" data-aos="fade-up"
       :data-aos-delay="(index+1) * 200"
       data-aos-duration="500"
       data-aos-once="true">
    <img class="robot" data-aos="fade-down"
         :data-aos-delay="(index+1) * 300"
         data-aos-duration="500"
         data-aos-once="true"
         src="img/robots/робот-05.png" alt="">
    <p class="price__tariff-title">{{ tariff.title }}</p>
    <p class="price__tariff-text">{{ tariff.descrTop }}</p>
    <div class="wrapper-price">
      <span class="price__tariff-price">{{ tariff.price }}</span>
      <span class="price__tariff-price2">{{ tariff.priceCur }}</span>
      {{ tariff.priceTitle }}
    </div>
    <div class="price__tariff-buy">
      <button>{{ tariff.buttonTitle }}</button>
    </div>
    <div class="price__tariff-descr" v-html="tariff.descrBottom"></div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  tariff: Object,
  index: Number
})
</script>

<style scoped lang="scss">
.price__tariff {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
  padding: 25px 30px;
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
      padding: 5px;
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
    color: var(--light-yellow);
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
    }
  }

  &:nth-child(2) {
    color: var(--light-green);
    background-color: var(--red);

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
          background-color: var(--red);
          color: var(--light-green);
        }

        &:active {

        }
      }
    }

    .price__tariff-descr {
      color: var(--light-green);
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
</style>
