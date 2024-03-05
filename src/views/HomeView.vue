<template>
  <div class="wrapper-home-page">
    <!-- Результаты недели -->
    <week-results/>

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
        <div class="words-wrap">
          <p class="words__title">Новые добавленные слова</p>
          <wordlist-view
              :words="newWords"
              :columns="2"
          />

          <router-link to="/dictionary" class="secondary-button">
            Перейти в словарь
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"/>
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <div class="wrapper-word-chat">
      <div class="words">
        <div class="wrapper-words-theme">
          <p class="words__title">Группы слов по темам</p>
          <words-group-list
              :groups="wordGroups"
              @selected="selectGroup"
          />
        </div>
        <slider-view :feed="sliderFeed1"/>
        <slider-view :feed="sliderFeed2"/>

      </div>
    </div>

    <!-- Секция ошибок-->
    <div class="wrapper-mistakes">
      <div class="mistakes">
        <h3 class="mistakes__title">Ваши ошибки и что можно улучшить</h3>
        <tab-nav
            :tabs="mistakeTabs"
            @selected="selectMistakeTab"
        />
        <div class="mistakes__list">
          <mistake-view
              :mistakes="currentMistakes"
          />
        </div>
      </div>
    </div>

    <!-- Секция footer -->
    <div class="footer bg-base-1">
      <promo-view
          :data="footerLeft"
      />
      <promo-view
          :data="footerRight"
      />
    </div>
    <!--Модальное окно словаря -->
    <words-list-dlg ref="wordslistdlg"/>
  </div>
</template>

<script>
import WeekResults from '@/components/widgets/WeekResults.vue';
// import ChatView from '@/components/widgets/ChatView.vue';
import SliderView from '@/components/widgets/SliderView.vue';
import WordlistView from '@/components/widgets/WordlistView.vue';
import WordsGroupList from '@/components/widgets/WordsGroupList.vue';
import WordsListDlg from '@/components/modals/WordsListDlg.vue';
import TabNav from '@/components/app/TabNav.vue';
import MistakeView from '@/components/widgets/MistakeView.vue';
import PromoView from '@/components/widgets/PromoView.vue';
import ChartBlock from "@/components/widgets/NewChat";

export default {
  name: 'HomeView',
  components: {
    ChartBlock,
    WeekResults,
    // ChatView,
    SliderView, WordlistView, WordsGroupList, WordsListDlg, TabNav, MistakeView, PromoView
  },
  data: () => ({
    sliderFeed1: [],
    sliderFeed2: [],
    newWords: [],
    wordGroups: [],
    mistakeTabs: [],
    mistakesArray: {},
    currentMistakes: {},
    footerLeft: {},
    footerRight: {},
  }),

  created() {
    // центральный слвйдер
    this.sliderFeed1 = [
      {
        id: 1,
        bgclass: 'bg-base-purple',
        title: 'Доступные задания',
        img: 'img/promo/Pound_Sign_L1.png',
        group: 'Интервью',
        path: '/tasks',
        description: 'Интервью на английском языке - разбираем популярные варианты'
      },
      {
        id: 2,
        bgclass: 'bg-base-green',
        title: 'perfect continuous tense',
        img: 'img/promo/Sphere_Matrix_x3__L.png',
        group: 'Группа 2',
        path: '/dictionary',
        description: 'The Present Perfect Continuous Tense и форма have been + Ving'
      },
      {
        id: 3,
        bgclass: 'bg-base-red',
        title: 'uncountable nouns',
        img: 'img/promo/2x2_Brick_Magenta_L.png',
        group: 'Группа 3',
        path: '/dictionary',
        description: 'Эквиваленты модальных глаголов с Have, правильное употребление'
      }
    ]
    // правый слайдер
    this.sliderFeed2 = [
      {
        id: 1,
        bgclass: 'bg-base-3',
        title: 'Изучение слов',
        img: 'img/promo/Action_translate_L1.png',
        group: 'IT-термины',
        path: '/dictionary',
        description: 'Изучаем новые слова в профессии и сочетания слов для тематики'
      },
      {
        id: 1,
        bgclass: 'bg-base-purple',
        title: 'Изучение слов',
        img: 'img/promo/Block_Cross_3D_2__L1.png',
        group: 'Географические наименования',
        path: '/dictionary',
        description: 'Эквиваленты модальных глаголов с Have, правильное употребление'
      },
      {
        id: 1,
        bgclass: 'bg-base-red',
        title: 'Изучение слов',
        img: 'img/promo/Block_Cross_3D_2__L1.png',
        group: 'Природа и погода',
        path: '/dictionary',
        description: 'О местоимениях в английском, группы местоимений'
      },
    ]
    // Новые слова
    this.newWords = [
      {id: 0, title: 'Cloud', hint: 'подсказка1', sound: 'sound/black.mp3', path: '/lesson'},
      {id: 1, title: 'Adventure', hint: 'подсказка2', sound: 'sound/blue.mp3', path: '/lesson'},
      {id: 2, title: 'Family', hint: 'подсказка3', sound: 'sound/brown.mp3', path: '/lesson'},
      {id: 3, title: 'Squirrel', hint: 'подсказка4', sound: 'sound/green.mp3', path: '/lesson'},
      {id: 4, title: 'Delicious', hint: 'подсказка5', sound: 'sound/red.mp3', path: '/lesson'},
      {id: 5, title: 'Person', hint: 'подсказка6', sound: 'sound/red.mp3', path: '/lesson'},
      {id: 6, title: 'Rainbow', hint: 'подсказка7', sound: 'sound/yellow.mp3', path: '/lesson'},
      {id: 7, title: 'Sister', hint: 'подсказка8', sound: 'sound/blue.mp3', path: '/lesson'},
      {id: 8, title: 'Autumn', hint: 'подсказка9', sound: 'sound/brown.mp3', path: '/lesson'},
      {id: 9, title: 'Mist', hint: 'подсказка10', sound: 'sound/green.mp3', path: '/lesson'},
    ]
    // Группы слов
    this.wordGroups = [
      {id: 0, title: 'Магазин'},
      {id: 1, title: 'Путешествие'},
      {id: 2, title: 'Школа'},
      {id: 3, title: 'Аэропорт'},
      {id: 4, title: 'Самолет'},
      {id: 5, title: 'Гостиница'},
      {id: 6, title: 'Кафе'},
      {id: 7, title: 'Рождество'},
      {id: 8, title: 'Погода'},
      {id: 9, title: 'Мероприятия'},
      {id: 10, title: 'Здоровье'},
      {id: 11, title: 'Спорт'},
    ]

    // Навигация в ошибках
    this.mistakeTabs = [
      {id: 0, title: 'Словарь'},
      {id: 1, title: 'Произношение'},
      {id: 2, title: 'Грамматика'},
    ]
    // структура с ошибками
    this.mistakesArray = [{
      id: 0,
      data: {
        title: [
          {w: 50, text: 'Оригинальное'},
          {w: 50, text: 'Верное'},
          {w: 50, text: 'Рекомендации'}
        ],
        rows: [
          [
            {w: 50, text: 'I have five years of teaching experience and also have other jobs like hosting events.'},
            {w: 50, text: 'I`ve been teaching for five years and I also have experience hosting events.'},
            {w: 50, text: 'Используйте эти примеры для повышения уровня нативности.'},
          ],
          [
            {w: 50, text: 'In addition, I do commissioned coffee artworks.'},
            {w: 50, text: 'Furthermore, I create commissioned coffee artworks.'},
            {
              w: 50,
              text: 'У вас хороший словарь. В данном случае можно использовать для более естественного звучания.'
            },
          ],
          [
            {w: 50, text: 'I have five years of teaching experience and also have other jobs like hosting events.'},
            {w: 50, text: 'I`ve been teaching for five years and I also have experience hosting events.'},
            {w: 50, text: 'Используйте эти примеры для повышения уровня нативности.'},
          ],
          [
            {w: 50, text: 'In addition, I do commissioned coffee artworks.'},
            {w: 50, text: 'Furthermore, I create commissioned coffee artworks.'},
            {
              w: 50,
              text: 'У вас хороший словарь. В данном случае можно использовать для более естественного звучания.'
            },
          ],
        ]
      }
    },
      {
        id: 1,
        data: {
          title: [
            {w: 60, text: 'Оригинальное'},
            {w: 40, text: 'Рекомендации'}
          ],
          rows: [
            [
              {
                w: 60,
                text: 'Taking time to space out – whether by showering, pulling weeds, or petting a dog – provides an opportunity for what psychologists call wakeful rest.'
              },
              {w: 40, text: 'Ошибка произношения выделенного слова. Общий ритм речи немного медленный.'},
            ],
            [
              {
                w: 60,
                text: 'Constantly cramming knowledge and experiences into your brain may seem like the quickest path to self-optimisation.'
              },
              {w: 40, text: 'Фонетические неточности, изменяющие смысл. Речь достаточно беглая.'},
            ],
          ]
        }
      },
      {
        id: 2,
        data: {
          title: [
            {w: 50, text: 'Ваши продвинутые грамматические конструкции'},
            {w: 50, text: 'Распространенные грамматические проблемы'}
          ],
          rows: [
            [
              {
                w: 50,
                text: '<span style="line-height:32px">1.Relative clauses<br>2.Passive voice<br>3.Tags<br>4.Tenses: Future Continuous, Present Continuous<br>5.Conditional: Zero<br>6.Intensifiers: a lot, quite, rather<br>7.Modals: may, might, should<br>8.Phrasal verbs: get along</span>'
              },
              {
                w: 50,
                text: '<span style="line-height:32px">1.Prepositions - 3<br>Wrong sequence - 2<br>2.Conditionals - 1<br>3.Articles -  1<br>4.Verb Constructions -  1</span>'
              },
            ],
          ]
        }
      }
    ]
    this.selectMistakeTab({id: 0})

    // структура банеров в подвале
    this.footerLeft = {
      title: 'Присоединяйтесь к нам Вконтакте',
      text: 'Каждый день тематичные подборки и карточки с новыми словами для всех',
      img: 'img/promo/VK.png',
      route: '',
      extpath: 'http://www.vk.com',
      bgclass: 'bg-base-purple'
    }
    this.footerRight = {
      title: 'Пригласите друзей',
      text: 'Есть ли у вас кто-то, кому может быть полезно изучение английского?',
      img: 'img/promo/f1.png',
      route: '/tariff',
      extpath: '',
      bgclass: 'bg-base-3'
    }
  },

  methods: {
    async selectGroup(group) {
      const words = [
        {id: 0, title: 'Shop'},
        {id: 1, title: 'Customer'},
        {id: 2, title: 'Store'},
        {id: 3, title: 'Cashier'},
        {id: 4, title: 'Salesperson'},
        {id: 5, title: 'Retail'},
        {id: 6, title: 'Discount'},
        {id: 7, title: 'Shopping'},
        {id: 8, title: 'Purchase'},
        {id: 9, title: 'Grocery'},
        {id: 10, title: 'Shopping cart'},
        {id: 11, title: 'Shelf'},
        {id: 12, title: 'Department'},
        {id: 13, title: 'Return'},
        {id: 14, title: 'Cash register'},

      ]
      //const ok = await this.$refs.wordslistdlg.show({group, words})
      this.$refs.wordslistdlg.show({group, words})
    },

    selectMistakeTab(tab) {
      const page = this.mistakesArray.find(val => val.id === tab.id)
      this.currentMistakes = (page) ? page.data : {mode: 33, title: [], rows: []}
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

.wrapper-home-page {

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
      padding: 90px 0 12px 0;
      margin: 0 20px;
      font-size: 15px;
      font-weight: 600;
      color: var(--white);

      .wrapper-chat {
        width: 55%;
        height: 500px;
      }

      .words-wrap {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 20px;
        border-radius: 10px;
        border: 2px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        background-color: var(--yellow);

        a {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--light-gray);
        }

        .words__title {
          font-size: 26px;
          color: var(--dark-pink);
        }

        .secondary-button {
          width: 230px;
          align-self: flex-end;
          border: 2px solid var(--dark);
          background-color: var(--pink);

          svg {
            fill: var(--white);
            transition: fill 0.2s;
          }

          &:hover {
            svg {
              fill: var(--dark);
            }
          }
        }
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
      gap: 20px;
      width: 100%;
      max-width: 1440px;
      padding: 15px 0 90px 0;
      margin: 0 20px;
      font-size: 15px;
      font-weight: 700;
      color: var(--white);

      .wrapper-words-theme {
        display: flex;
        flex-direction: column;
        width: 55%;
        height: 100%;
        padding: 30px 20px 40px;
        border-radius: 10px;
        border: 2px solid var(--dark);
        box-shadow: 1px 4px 1px var(--dark);
        background-color: var(--red);

        .words__title {
          font-size: 26px;
          margin-bottom: 20px;
        }
      }


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

  .footer {
    display: flex;
    gap: 40px;
    padding: 40px 5%;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
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

      .words-wrap {

        .secondary-button {

          svg {

          }

          &:hover {
            svg {

            }
          }
        }
      }

      .bg-purple {

      }
    }

    .mistakes {


      .mistakes__title {

      }

      .mistakes__list {

      }
    }

    .footer {
      flex-direction: column;
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

      .words-wrap {

        .secondary-button {

          svg {

          }

          &:hover {
            svg {

            }
          }
        }
      }

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

    .footer {
      font-size: 15px;
    }
  }
}
</style>
