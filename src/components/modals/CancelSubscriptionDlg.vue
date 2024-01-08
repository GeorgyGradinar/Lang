<template>
  <popup-modal ref="popup" @onEsc="_cancel()">
    <div class="tariff-modal-dialog">
      <div class="wrapper-image">
        <img src="img/robots/робот-04.png">
        <p class="description">Вы действительно хотите отказаться от подписки?</p>
      </div>

      <div class="wrapper-button">
        <button @click="$router.push('/tariff')">Да, отменяю подписку</button>
        <button>Нет, продолжаю обучение с Pro</button>
      </div>
    </div>
  </popup-modal>
</template>

<script setup>
import PopupModal from '@/components/app/PopupModal.vue';
import {ref, toRefs, watch} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  isShow: Boolean
})
const {isShow} = toRefs(props);
// eslint-disable-next-line no-undef
const emit = defineEmits(['close']);

let popup = ref(null);

watch(isShow, () => {
  if (isShow.value) {
    show();
  }
})

function show() {
  popup.value.open();
}

function _cancel() {
  emit('close', false);
  popup.value.close();
}
</script>

<style scoped lang="scss">
.tariff-modal-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  max-width: 550px;
  max-height: 300px;
  background-color: var(--light_blue);
  padding: 40px;
  border-radius: 10px;
  color: var(--dark);
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  .wrapper-image {
    display: flex;
    align-self: flex-start;

    img {
      width: 60px;
      height: 60px;
    }
  }

  .description {
    width: 80%;
    text-align: center;
  }

  .wrapper-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    button {
      padding: 5px 15px;
      border-radius: 10px;
      border: 1px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      transition: all 0.2s;

      &:first-child {
        background-color: var(--green);
      }

      &:last-child {
        background-color: var(--red);
      }

      &:hover {
        background-color: var(--light-green);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }
    }
  }
}
</style>
