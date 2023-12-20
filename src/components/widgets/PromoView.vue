<template>
  <div class="footer-wrap" :class="data.bgclass" @click="onClick">
    <div class="footer__card">
      <div class="footer__title">{{ data.title }}</div>
      <div class="footer__text">{{ data.text }}</div>
    </div>
    <div class="wrapper-image">
      <img :src="data.img">
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router/dist/vue-router";

const router = useRouter();
// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  data: Object
});

function onClick() {
  if (props.data.route !== '') {
    router.push(props.data.route);
    return
  }

  if (props.data.extpath !== '') {
    window.open(props.data.extpath);
  }
}
</script>

<style scoped lang="scss">
.footer-wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 250px;
  border-radius: 10px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  cursor: pointer;
  transition: all 0.2s;

  .footer__card {
    width: 100%;
    max-width: 250px;
    padding-left: 25px;

    .footer__title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 24px;
      margin-right: 10px;
    }
  }

  .wrapper-image {
    img {
      width: 100%;
      max-width: 200px
    }
  }

  &:hover {
    transform: scale(1.02);
  }
}

@media screen and (max-width: 500px) {
  .footer-wrap {

    .footer__card {

      .footer__title {
        font-size: 18px;
      }
    }

    .wrapper-image {
      img {

      }
    }
  }
}
</style>
