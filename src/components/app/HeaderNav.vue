<template>
  <header>
    <div class="header__container">
      <router-link to="/" class="header__logo">
        <img src="img/robots/робот-01.png" alt="">
        НейроРепетитор
      </router-link>

      <div class="header__menu" :class="{active:mobileMenu}">
        <button v-for="item in menu"
                :key="item.id"
                :class="{'selected-page': router.currentRoute.value.path === item.path}"
                @click="routeTo(item.path)">
          {{ item.title }}
        </button>

        <div class="wrapper-signin-buttons" v-if="!person?.id">
          <button @click="routeTo('/auth', {type: 'signin'})">Войти</button>
          <button @click="routeTo('/auth')">Регистрация</button>
        </div>
        <button class="logout" v-if="person?.id && mobileMenu" @click="prepareForLogout">Выйти</button>
      </div>

      <div class="header__sign-wrap" v-if="person?.id" >
        <div class="header__sign-title">
          <button @click="togglePopupMenu">
            <img src="img/icon/bxs-user-circle2.svg">
            <p>{{ person?.name }}</p>
          </button>
        </div>
        <div class="header__sign-popup" :class="{'open-popup': popupMenu}">
          <button v-for="item in popupmenuList" :key="item.id"
                  @click="routeTo(item.path)">
            {{ item.title }}
          </button>
          <button @click="prepareForLogout">Выйти</button>
        </div>
      </div>

      <div class="header__burger-wrap">
        <div class="header__burger " :class="{active:mobileMenu}" @click="mobileMenu = !mobileMenu">
          <span></span>
        </div>
      </div>
    </div>
    <div class="popup-modal" v-if="popupMenu" @click="popupMenu = !popupMenu"></div>
  </header>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router/dist/vue-router";
import {storeToRefs} from "pinia/dist/pinia";
import {mainStore} from "@/store/mainStore";
import shared from "@/mixins/shared";

const router = useRouter();
const main = mainStore();
const {person} = storeToRefs(main);
const {prepareForLogout} = shared();

const menu = [
  {id: 0, path: '/', title: 'Главная'},
  {id: 1, path: '/tasks', title: 'Задания'},
  {id: 2, path: '/dictionary', title: 'Словарь'},
  {id: 3, path: '/progress', title: 'Прогресс'},
  {id: 4, path: '/tariff', title: 'Тариф'},
];

const popupmenuList = [
  {id: 3, path: '/payment', title: 'Платежи'},
  {id: 4, path: '/callback', title: 'Обратная связь'}
];

let mobileMenu = ref(false);
let popupMenu = ref(false);

function routeTo(path, query) {
  closeAllModal();
  router.push({path, query});
}

function closeAllModal() {
  mobileMenu.value = false;
  popupMenu.value = false;
}

function togglePopupMenu() {
  popupMenu.value = !popupMenu.value;
}
</script>

<style scoped lang="scss">
header {
  width: 100vw;
  height: 82px;
  background-color: var(--white);
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 99;
  border-bottom: 2px solid var(--dark);

  .header__container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    height: 100%;
    margin: 0 40px;

    a {
      font-size: 15px;
      font-weight: 600;
      -webkit-transition: text-shadow .3s;
      transition: text-shadow .3s;
      color: var(--white);
      text-decoration: none;

      &:hover {
        text-decoration: none;
      }
    }

    .header__logo {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 30px;
      font-weight: 900;
      color: #671ba1;

      img {
        width: 45px;
      }
    }

    .header__menu {
      display: flex;
      gap: 50px;
      margin: 0 10px;

      button {
        display: flex;
        justify-content: center;
        background-color: var(--dark-pink);
        padding: 7px;
        border-radius: 8px;
        border: 1px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        transition: all 0.2s;
        font-weight: 700;
        color: var(--white);

        &:hover {
          color: var(--dark);
          background-color: var(--yellow);
        }
      }

      .selected-page {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
        background-color: var(--yellow);
        color: var(--dark);
      }

      &.active {
        .wrapper-signin-buttons {
          flex-direction: column;
        }

        button {
          padding: 7px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 20px;
          color: var(--light-yellow);

          &:hover {
            color: var(--dark);
            background-color: var(--yellow);
          }

          &:active {
            box-shadow: 0 0 1px var(--dark);
            transform: translateY(5px);
          }
        }

        .logout {
          background-color: var(--red);
        }
      }
    }

    .header__sign-wrap {
      position: relative;
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;

      &:hover {
        background-color: #9747ff
      }

      .header__sign-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        width: 100%;
        height: 100%;
        background-color: var(--white);
        z-index: 103;

        button {
          width: 220px;
          height: 55%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          background-color: var(--yellow);
          border: 1px solid var(--dark);
          box-shadow: 1px 4px 1px var(--dark);
          border-radius: 8px;
          transition: all 0.2s;

          &:active {
            box-shadow: 0 0 1px var(--dark);
            transform: translateY(5px);
          }

          a {
            color: var(--dark);
          }
        }
      }

      .header__sign-popup {
        position: absolute;
        top: -300%;
        width: 220px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 0 0 8px 8px;
        background-color: #ffd073;
        overflow: hidden;
        z-index: 102;
        transition: all 0.2s;
        border: 1px solid var(--dark);

        button {
          color: #201f26;
          padding: 10px 20px;
          border-bottom: 1px solid #4f3dca45;
          transition: all 0.2s;

          &:hover {
            text-decoration: none;
            background-color: var(--blue);
            color: var(--white);
          }

          &.router-link-active {
            color: #bc32fc;
          }
        }
      }

      .open-popup {
        top: 100%;
      }
    }

    .wrapper-signin-buttons {
      display: flex;
      gap: 10px;

      button {
        padding: 5px 10px;
        border-radius: 10px;
        border: 1px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        transition: all 0.2s;
        font-weight: 700;

        &:first-child {
          background-color: var(--red);

          &:hover {
            background-color: #f18b80;
          }
        }

        &:last-child {
          background-color: var(--blue);

          &:hover {
            background-color: var(--light_blue);
          }
        }

        &:active {
          box-shadow: 0 0 1px var(--dark);
          transform: translateY(5px);
        }
      }
    }

    .header__burger-wrap {
      display: none;
      width: 30px;
      height: 30px;

      .header__burger {
        display: none;
        position: relative;
        width: 30px;
        height: 20px;

        &-wrap {
          margin-left: auto;
        }

        span {
          content: '';
          background-color: var(--dark-pink);
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          top: 9px;
          transition: all 0.3s ease 0s;
        }

        &:before,
        &:after {
          content: '';
          background-color: var(--dark-pink);
          position: absolute;
          width: 100%;
          height: 2px;
          left: 0;
          transition: all 0.3s ease 0s;
        }

        &.active:before {
          transform: rotate(45deg);
          top: 9px;
        }

        &.active:after {
          transform: rotate(-45deg);
          bottom: 9px;
        }

        &.active span {
          transform: scale(0);
        }

        &:before {
          top: 0
        }

        &:after {
          bottom: 0;
        }

        cursor: pointer;
      }
    }
  }
}

@media screen and (min-width: 2000px) {
  header {
    .header__container {
      max-width: unset;
      margin: 0 50px;

      .header__logo {
        font-size: 40px;
      }

      .header__menu {

        a {
          font-size: 20px;
        }
      }

      .header__sign-wrap {

        .header__sign-title {

          button {
            width: 300px;
            height: 65%;

            a {
              font-size: 21px;
            }
          }
        }

        .header__sign-popup {
          width: 300px;

          a {
            font-size: 20px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1150px) {
  header {
    .header__container {

      .header__logo {
        font-size: 20px;
      }

      .header__menu {
        gap: 20px;

        a {
          font-size: 12px;
        }
      }

      .header__sign-wrap {
        width: 170px;

        .header__sign-title {

        }

        .header__sign-popup {
          width: 170px;
          height: 240px;

          a {
          }
        }
      }
    }
  }
}

@media screen and (max-width: 850px) {
  header {

    .header__container {
      margin: 0 20px;

      a {
      }

      .header__logo {
        a {
        }
      }

      .header__menu {
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100%;
        height: calc(100vh - 82px);
        left: 0;
        top: 100%;
        background-color: #9747ff;
        overflow: auto;
        transition: all 0.3s ease 0s;
        margin: unset;
        padding: 30px;

        a {
          font-size: 20px;
        }
      }

      .header__menu.active {
        top: 82px;
      }

      .header__sign-wrap {
        display: none;

        .header__sign-title {

        }

        .header__sign-popup {

          a {
          }
        }
      }

      .header__burger-wrap {
        display: block;

        .header__burger {
          display: block;
        }

        .header__menu {
          position: fixed;
          width: 100%;
          left: 0;
          bottom: 100%;
          overflow: auto;
          transition: all 0.3s ease 0s;
        }

        .header__menu.active {
          bottom: 0;
        }
      }
    }
  }
}

</style>
