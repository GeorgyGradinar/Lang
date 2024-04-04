<template>
  <footer class="footer">
    <!--          <promo-view-->
    <!--              :data="footerLeft"-->
    <!--          />-->


    <router-link to="/" class="logo">
      <img src="img/robots/робот-01.png" alt="logo">
      НейроРепетитор
    </router-link>

    <div class="add-to-us">
      <p>Присоединяйтесь к нам в соц.сетях</p>
      <div class="wrapper-footer-button">
        <a><img src="img/vk.svg" alt="vk"></a>
        <a><img src="img/telegram.svg" alt="telegram"></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
// import PromoView from '@/components/widgets/PromoView.vue';

// const footerLeft = {
//   title: 'Присоединяйтесь к нам Вконтакте',
//   text: 'Каждый день тематичные подборки и карточки с новыми словами для всех',
//   img: 'img/promo/VK.png',
//   route: '',
//   extpath: 'http://www.vk.com',
//   bgclass: 'bg-base-purple'
// }
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 40px 5%;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background-color: var(--pink);

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 30px;
    font-weight: 900;
    color: var(--white);
    -webkit-transition: text-shadow .3s;
    transition: text-shadow .3s;
    text-decoration: none;

    img {
      width: 45px;
    }
  }

  .add-to-us {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .wrapper-footer-button {
      display: flex;

      a {
        display: flex;
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
