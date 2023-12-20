<template>
  <div class="card" :class="bg_class">
    <div class="promo__chevron left" :class="{ 'hide' : slideIndex === 0}">
      <img src="img/icon/bxs-chevron-left.svg" class="cursor" @click.prevent.stop="onLeft()">
    </div>
    <div class="promo__slides">
      <div class="row">
        <div class="promo__slide" :style="index == 0 ? slider_style : {}"
             v-for="(slide, index) in feed" :key="slide.id"
             @click="onPage(index)"
        >
          <h2 class="promo__title-top">{{ slide.title }}</h2>
          <div class="promo__title-img div-center">
            <img :src="slide.img">
          </div>
          <p class="promo__title-bottom">{{ slide.group }}</p>
          <p>{{ slide.description }}</p>
        </div>
      </div>
    </div>
    <div class="promo__chevron right" :class="{ 'hide' : slideIndex+1 === feed.length}">
      <img src="img/icon/bxs-chevron-right.png" class="cursor" @click.prevent.stop="onRight()">
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router/dist/vue-router";

// eslint-disable-next-line no-undef
const props = defineProps({
  feed: Object
});
const router = useRouter();

let bg_class = ref('bg-base-purple');
let slider_style = ref('margin-left:0;');
let slideIndex = ref(0);

onMounted(() => {
  showSLide();
})

function onRight() {
  slideIndex.value++;
  showSLide();
}

function onLeft() {
  slideIndex.value--;
  showSLide();
}

function onPage(index) {
  router.push({path: props.feed[index].path});
}

function showSLide() {
  if (props.feed.length > 0) {
    bg_class.value = props.feed[slideIndex.value].bgclass;
    slider_style.value = `margin-left:-${100 * slideIndex.value}%;`;
  }
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  align-items: center;
  width: 285px;
  border-radius: 15px;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  overflow: hidden;
  position: relative;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  .promo__chevron {
    position: absolute;
    top: calc(50% - 18px);
    display: flex;
    justify-self: center;
    align-items: center;
    border-radius: 8px;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.1s;

    img {
      width: 36px;
      height: 36px;
    }

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }

  .left {
    left: 4px;
  }

  .right {
    right: 4px;
  }

  .promo__slides {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    overflow: hidden;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    cursor: pointer;

    .row {
      .promo__slide {
        -ms-flex-negative: 0;
        flex-shrink: 0;
        width: 100%;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        padding: 15px;

        .promo__title-top {
          height: 45px;
          font-size: 20px;
          padding-top: 28px;
          font-weight: 800;
          text-align: center;
        }

        .promo__title-img {
          display: flex;
          justify-content: center;
          height: 203px;

          img {
            max-width: 150px
          }


        }
      }
    }
  }
}
</style>
