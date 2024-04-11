<template>
  <div class="wrapper-home-page">
    <!-- Результаты недели -->
    <week-results/>

    <div class="wrapper-welcome-block">
      <WelcomeBlock></WelcomeBlock>
    </div>

    <!-- Секция чата и заданий -->
    <div class="wrapper-dialog-promo">
      <div class="dialog-promo">
        <!--        <div class="card half bg-orange dialog-chat">-->
        <!--          <chat-view-->
        <!--              :smallMode="true"-->
        <!--          />-->
        <!--        </div>-->
        <div class="wrapper-chat">
          <ChartBlock :isMainPageChat="true"></ChartBlock>
        </div>
        <NewAddedWordBlock></NewAddedWordBlock>
      </div>
    </div>

    <div class="wrapper-word-chat">
      <div class="words">
        <words-group-list/>
        <!--        <slider-view :feed="sliderFeed1"/>-->
        <!--        <slider-view :feed="sliderFeed2"/>-->

        <TasksList></TasksList>
      </div>
    </div>

    <!-- Секция ошибок-->
    <div class="wrapper-mistakes">
      <div class="mistakes">
        <h3 class="mistakes__title">Ваши ошибки и что можно улучшить</h3>
        <!--        <tab-nav-->
        <!--            :tabs="mistakeTabs"-->
        <!--            @selected="selectMistakeTab"-->
        <!--        />-->
        <div class="mistakes__list">
          <mistake-view/>
        </div>
      </div>
    </div>
    <FooterElement></FooterElement>
  </div>
  <RejectModal v-if="isOpenRejectModal" @hiddenBlock="hiddenRejectModal"></RejectModal>
</template>

<script setup>
import WeekResults from '@/components/widgets/WeekResults.vue';
// import ChatView from '@/components/widgets/ChatView.vue';
// import SliderView from '@/components/widgets/SliderView.vue';
import WordsGroupList from '@/components/widgets/WordsGroupList.vue';
// import TabNav from '@/components/app/TabNav.vue';
import MistakeView from '@/components/widgets/MistakeView.vue';
import ChartBlock from "@/components/widgets/NewChat";
import NewAddedWordBlock from "@/components/widgets/NewAddedWordBlock";
import TasksList from "@/components/widgets/TasksList";
import FooterElement from "@/components/FooterElement";
import WelcomeBlock from "@/components/main-page/WelcomeBlock";
import RejectModal from "@/components/modals/chat/RejectModal";
import {ref} from "vue";

let isOpenRejectModal = ref(true);


function hiddenRejectModal(isOpen) {
  isOpenRejectModal.value = isOpen;
}
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

.wrapper-home-page {

  .wrapper-welcome-block {
    display: flex;
    justify-content: center;
    background-color: var(--white);
  }

  .wrapper-dialog-promo {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--white);

    .dialog-promo {
      display: flex;
      justify-content: center;
      gap: 25px;
      width: 100%;
      max-width: 1440px;
      padding: 0 0 12px 0;
      margin: 0 20px;
      font-size: 15px;
      font-weight: 600;
      color: var(--white);

      .wrapper-chat {
        width: 55%;
        height: 500px;
      }
    }
  }

  .wrapper-word-chat {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--white);

    .words {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 25px;
      width: 100%;
      max-width: 1440px;
      padding: 15px 0 90px 0;
      margin: 0 20px;
      font-size: 15px;
      font-weight: 700;
      color: var(--white);
    }
  }

  .wrapper-mistakes {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--white);

    .mistakes {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 1440px;
      padding: 90px 0;
      font-size: 15px;
      font-weight: 600;
      color: var(--white);

      .mistakes__title {
        width: 100%;
        font-size: 32px;
        font-weight: 900;
        text-align: center;
        margin-bottom: 30px;
        color: var(--dark);
      }

      .mistakes__list {
        width: 100%;
        padding: 32px;
        border-radius: 10px;
        background-color: var(--red);
        border: 2px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .wrapper-home-page {

    .dialog-promo {

    }

    .words {
      flex-direction: column;
      align-items: center;
      padding: 90px 20px;

      .bg-purple {

      }
    }

    .mistakes {


      .mistakes__title {

      }

      .mistakes__list {

      }
    }
  }
}


@media screen and (max-width: 700px) {
  .wrapper-home-page {

    .dialog-promo {
      flex-direction: column;
      align-items: center;
    }

    .words {

      .bg-purple {

      }
    }

    .mistakes {
      padding: 90px 10px;

      .mistakes__title {

      }

      .mistakes__list {
        padding: 30px 15px;
      }
    }
  }
}
</style>
