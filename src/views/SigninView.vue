<template>
<div class="container bg-base-light-violet">
  <main class="fullscreen sign-wrap">
    <div class="sign__form-wrap">

      <div class="sign__form-wrap-col1">
        <div class="sign__form-promotitle">Бесплатная регистрация</div>
        <div class="sign__form-title" v-if="mode == 'signin'">Создайте аккаунт</div>
        <div class="sign__form-title" v-if="mode == 'signup'">Войти</div>
        <div class="row mb-20" v-if="mode == 'signin'">
          <div>Уже есть? </div>
          <div class="switcher"><a href="#" @click="changeMode()">Войти</a></div>
        </div>
        <div class="row mb-20" v-if="mode == 'signup'">
          <div>Нет аккаунта? </div>
          <div class="switcher"><a href="#" @click="changeMode()">Создать</a></div>
        </div>
        <div class="input mb-16">
          <input type="text" placeholder="Email">
        </div>
        <div class="input mb-8">
          <input type="text" placeholder="Пароль">
        </div>
        <div class="input forgot-password mb-20" v-if="mode == 'signin'">
          <a href="#">восстановить пароль</a>
        </div>
        <div class="sign__form-button">
          <button class="bg-base-green white cursor shadow" v-if="mode == 'signup'">Войти</button>
          <button class="bg-base-green white cursor shadow" v-if="mode == 'signin'">Создать аккаунт</button>
        </div>
        <div class="sign__form-accept row mb-20">
          <div class="checkbox-wrap"><input type="checkbox"></div>
          <div class="label-wrap">Согласие с <a href="#">условиями соглашения и политикой конфиденциальности</a></div>
        </div>
        <div class="sign__form-icon">
          <a href="http://www.ya.ru"><img src="img/icon/yandex-ic.svg" class="shadow"></a>
          <a href="http://www.google.com"><img src="img/icon/google-ic1.svg" class="shadow"></a>
          <a href="http://www.vc.com"><img src="img/icon/vk-ic.svg" class="shadow"></a>
        </div>
      </div>
      <div class="sign-promo">
        <img src="img/Saly.png">
      </div>
    </div>
  </main>
</div>
</template>

<script>
export default {
  name: 'SigninView',

  data: () => ({
    mode: 'signin',
  }),

  methods : {
    changeMode () {
      this.mode = (this.mode =='signin') ? 'signup' : 'signin'
    }
  }
}
</script>

<style>

</style>