<template>
  <v-dialog
      v-model="isOpenDialog"
      width="auto"
  >
    <v-card>
      <v-card-text>
        <div class="dialog">
          <div class="wrapper-title">
            <img src="img/chart/fireworks.png" alt="fireworks">
            <h2>Заданее выполнено успешно</h2>
          </div>
          <div class="wrapper-buttons">
            <button @click="exit">Выйти</button>
            <button @click="nextLesson">Следующее задание</button>
          </div>
          <ConfettiAnimation :activeConfetti="isSubmit"></ConfettiAnimation>
        </div>
      </v-card-text>
    </v-card>

    <img class="font-well animate__animated  animate__tada"
         :class="{'show-flag-well': isShowFlagWell}"
         src="img/Фоны-04.png" alt="">
    <img class="font-great animate__animated  animate__tada"
         :class="{'show-flag-great': isShowFlagGreat}"
         src="img/Фоны-05.png" alt="">
  </v-dialog>
</template>

<script setup>
import {onMounted, ref, toRefs, watch} from "vue";
import ConfettiAnimation from '@/components/widgets/ConfettiAnimation';

// eslint-disable-next-line no-undef
const props = defineProps({
  isOpenDialog: Boolean
})
const {isOpenDialog} = toRefs(props)
// eslint-disable-next-line no-undef
const emit = defineEmits(['closeDialog']);

let isSubmit = ref(false);
let isShowFlagWell = ref(true);
let isShowFlagGreat = ref(true);

onMounted(() => {
  if (Math.round(Math.random() * 1000) % 2) {
    isShowFlagGreat.value = false
  } else {
    isShowFlagWell.value = false;
  }
  changeShowFlag();
})

watch(isOpenDialog, () => {
  isSubmit.value = !isSubmit.value;
})

function changeShowFlag() {
  setTimeout(() => {
    isShowFlagWell.value = false;
    isShowFlagGreat.value = false;
  }, 2000)
}

function exit() {
  emit('closeDialog');
}

function nextLesson() {
  emit('closeDialog');
}

</script>

<style scoped lang="scss">

:deep(.v-overlay__content) {
  .v-card {
    background-color: var(--light-yellow);
    border: 2px solid var(--dark);
    border-radius: 10px !important;
  }
}

:deep(.v-overlay__scrim) {
}

.dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;

  .wrapper-title {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;

    img {
      width: 60px;
      height: 60px;
    }

    h2 {
      color: var(--green);
    }
  }

  .wrapper-buttons {
    display: flex;
    gap: 20px;

    button {
      padding: 5px 10px;
      border-radius: 10px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      color: var(--light-yellow);
      transition: all 0.2s;

      &:first-child {
        background-color: var(--red);
      }

      &:last-child {
        background-color: var(--green);
      }

      &:hover {
        color: var(--dark);
      }
    }
  }

}

.font-well,
.font-great {
  position: absolute;
  width: 300px;
  top: 70%;
  z-index: 1000;
  transition: all 0.5s;
}

.font-well {
  left: calc(50vw + 300px);
}

.font-great {
  right: calc(50vw + 300px);
}

.show-flag-well {
  left: calc(50vw - 50px);
}

.show-flag-great {
  right: calc(50vw - 50px);
}
</style>
