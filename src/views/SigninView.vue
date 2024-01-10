<template>
  <main class="signin-wrap">
    <div class="signin">

      <div class="content__signin" :class="{'show-login': isShowLoginBlock}">
        <RegistrationBlock @openLogin="changeMode">
        </RegistrationBlock>
        <LoginBlock @openRegistration="changeMode">
        </LoginBlock>
      </div>
    </div>
  </main>
</template>

<script setup>
import RegistrationBlock from "@/components/signin/RegistrationBlock";
import LoginBlock from "@/components/signin/LoginBlock";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router/dist/vue-router";

const route = useRoute();

let isShowLoginBlock = ref(false);

onMounted(() => {
  if (route.query?.type === 'signin'){
    isShowLoginBlock.value = true;
  }
})

function changeMode(arg) {
  isShowLoginBlock.value = arg;
}
</script>

<style scoped lang="scss">
.signin-wrap {
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--pink);

  .signin {
    position: relative;
    width: 850px;
    height: 470px;
    display: flex;
    border-radius: 10px;
    transition: all 0.2s;

    .content__signin {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 400ms;
      border-radius: 10px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
    }

    .show-login {
      transform: rotateX(180deg);
      border: 2px solid var(--dark);
      box-shadow: 1px -4px 1px var(--dark);
    }
  }
}
</style>
