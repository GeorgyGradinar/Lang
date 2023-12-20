<template>
  <popup-modal ref="popup"
    @onEsc="_cancel()"
  >
    <div class="tariff-modal">
      <div class="tariff-modal__icon"><img src="img/icon/polar_bear.png"></div>
      <div class="tariff-modal__descr">Вы действительно хотите отказаться от подписки?</div>
      <div class="tariff-modal__button">
        <button @click="$router.push('/tariff')">Да, отменяю подписку</button>
      </div>
      <div>
        <a href="#">Нет, продолжаю обучение с Pro</a>
      </div>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from '@/components/app/PopupModal.vue'
export default {
  name: 'CancelSubscriptionDlg',
  components: {
    PopupModal
  },

  methods: {
    show() {
      this.$refs.popup.open()
      // Return promise so the caller can get results
      return new Promise((resolve, reject) => {
          this.resolvePromise = resolve
          this.rejectPromise = reject
      })
    },
    _cancel() {
        this.$refs.popup.close()
        this.resolvePromise({accept : false})
    },
  }

}
</script>

<style>

</style>