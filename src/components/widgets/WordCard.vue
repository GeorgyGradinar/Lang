<template>
  <div class="wrapper-word">
    <div class="word">
      <div class="scene">
        <div class="cube" :class="{'show_translate': isShowTranslate}">
          <p class="side top">translate</p>
          <p class="side front">
            {{ word?.title }}
          </p>
        </div>
      </div>
    </div>

    <div class="actions">
      <div class="translate" @click="toggleIsShowTranslate" :class="{'is_active-translate': isShowTranslate}">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path
              d="m480-80-40-120H160q-33 0-56.5-23.5T80-280v-520q0-33 23.5-56.5T160-880h240l35 120h365q35 0 57.5 22.5T880-680v520q0 33-22.5 56.5T800-80H480ZM286-376q69 0 113.5-44.5T444-536q0-8-.5-14.5T441-564H283v62h89q-8 28-30.5 43.5T287-443q-39 0-67-28t-28-69q0-41 28-69t67-28q18 0 34 6.5t29 19.5l49-47q-21-22-50.5-34T286-704q-67 0-114.5 47.5T124-540q0 69 47.5 116.5T286-376Zm268 20 22-21q-14-17-25.5-33T528-444l26 88Zm50-51q28-33 42.5-63t19.5-47H507l12 42h40q8 15 19 32.5t26 35.5Zm-84 287h280q18 0 29-11.5t11-28.5v-520q0-18-11-29t-29-11H447l47 162h79v-42h41v42h146v41h-51q-10 38-30 74t-47 67l109 107-29 29-108-108-36 37 32 111-80 80Z"/>
        </svg>
        <v-tooltip activator="parent" location="bottom">Перевести</v-tooltip>
      </div>

      <div class="volume">
        <img src="img/icon/bxs-volume-low.svg">
        <v-tooltip activator="parent" location="bottom">Озвучить</v-tooltip>
      </div>

      <div class="tasks">
        <img src="img/icon/bxs-extension.svg">
        <v-tooltip activator="parent" location="bottom">Задачи</v-tooltip>
      </div>

      <div class="help">
        <img src="img/icon/bxs-help-circle.svg">
        <v-tooltip activator="parent" location="bottom">an exciting or unexpected event or course of events</v-tooltip>
      </div>

      <div class="learned" v-if="word.count > 0 || word.done">
        <p v-if="word.count > 0"><img src="img/icon/fluent_hat-graduation-24-regular.svg">2</p>
        <p v-if="word.done"><img src="img/icon/lean.png"></p>
        <v-tooltip activator="parent" location="bottom">Отработанно</v-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

// eslint-disable-next-line no-unused-vars,no-undef
const props = defineProps({
  word: Object
})

let isShowTranslate = ref(false);

function toggleIsShowTranslate() {
  isShowTranslate.value = !isShowTranslate.value;
}
</script>

<style lang="scss">
.wrapper-word {
  display: flex;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
  width: 18%;
  color: #f5f5f5;
  background-color: #4f3dca;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 800;
  padding: 20px 10px;
  margin-bottom: 20px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);
  transition: all 0.2s;

  .actions {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;

    .translate,
    .volume,
    .tasks,
    .help,
    .learned {
      display: flex;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      border-radius: 10px;
      padding: 7px;
      transition: all 0.2s;

      img,
      svg {
        width: 20px;
        height: 20px;
        fill: var(--white);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }
    }

    .is_active-translate {
      background-color: var(--yellow);

      svg {
        fill: var(--blue);
      }
    }

    .learned {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      box-shadow: 0 0 1px var(--yellow);
      border: 1px solid var(--yellow);
      color: var(--yellow);

      P {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;

        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }

  .word {
    font-size: 20px;
    color: var(--yellow);
    position: relative;

    .scene {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;

      .cube {
        width: 100%;
        color: var(--white);
        cursor: pointer;
        transition: all 0.85s cubic-bezier(.17, .67, .14, .93);
        transform-style: preserve-3d;
        transform-origin: 100% 50%;
        height: 30px;
        border-radius: 10px;

        .side {
          width: 100%;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          border-radius: 5px;

          &.top {
            background: var(--yellow);
            color: var(--blue);
            transform: rotateX(90deg) translate3d(0, 0, 15px);
            border: 1px solid var(--dark);
            box-shadow: 1px 4px 1px var(--dark);
          }

          &.front {
            color: var(--yellow);
            box-shadow: 1px 4px 1px var(--dark);
            border: 1px solid var(--dark);
            transform: translate3d(0, 0, 15px);
          }

          span {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            margin-left: 5px;
          }
        }
      }

      .show_translate {
        transform: rotateX(-90deg);
      }
    }
  }
}

.v-tooltip > .v-overlay__content {
  background-color: var(--yellow) !important;
  opacity: 0.8;
  color: var(--blue) !important;
  border-radius: 10px;
  border: 1px solid var(--dark);
}


@media screen and (max-width: 1350px) {
  .wrapper-word {
    width: 23%;
  }
}

@media screen and (max-width: 1000px) {
  .wrapper-word {
    width: 32%;
  }
}

@media screen and (max-width: 750px) {
  .wrapper-word {
    width: 49%;
  }
}

@media screen and (max-width: 500px) {
  .wrapper-word {
    width: 90%;
  }
}
</style>
