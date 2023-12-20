<template>
  <popup-modal ref="popup" @onEsc="cancel()">
    <div class="words-props-modal">
      <div class="words-props-modal__title-row">
        <p class="words-props-modal__title">Adventure</p>
        <p><img src="img/icon/fluent_hat-graduation-24-regular.svg">Отработано: 2 раза </p>
      </div>
      <div class="info-and-tasks readonly">
        <img src="img/icon/bxs-help-circle.svg">
        <p>an exciting or unexpected event or course of events</p>
      </div>
      <div class="info-and-tasks readonly">
        <img src="img/icon/bi_translate.png">
        <p>приключение</p>
        <!--        <img src="img/icon/bxs-hide.png">-->
      </div>

      <div class="info-and-tasks">
        <img src="img/icon/bxs-volume-low.svg">
        <p>Прослушать</p>
      </div>
      <div class="info-and-tasks">
        <img src="img/icon/bxs-extension.svg">
        <p>Выполнить задания</p>
      </div>
    </div>
  </popup-modal>
</template>

<script setup>
import PopupModal from '@/components/app/PopupModal.vue';
import {ref} from "vue";

let popup = ref(null);
let group = ref({
  id: 0,
  title: ''
})
let words = ref([]);

function show(opts = {}) {
  group.value = opts.group;
  words.value = opts.words;
  popup.value.open();
}

function cancel() {
  popup.value.close();
}

// eslint-disable-next-line no-undef
defineExpose({
  show
});
</script>

<style scoped lang="scss">
.words-props-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  background-color: var(--purple);
  border-radius: 10px;
  font-size: 15px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  .info-and-tasks {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    transition: all 0.2s;
    cursor: pointer;

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }

    &:hover {
      color: var(--yellow);
    }
  }

  .readonly {
    box-shadow: 0 0 1px var(--dark);
    transform: translateY(5px);
    cursor: default;

    &:hover {
      color: var(--white);
    }
  }

  .words-props-modal__title-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 20px;

    p {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .words-props-modal__title {
      color: var(--white);
      font-size: 20px;
      font-weight: 800;
    }
  }
}
</style>
