<template>
  <div class="chat flex-v-rub">
    <div class="chat__header bg-base-dark-purple row-center">
      <div class="chat-header">
        <p class="chat__header-title row-center"> ИИ-репетитор</p>
      </div>


      <div class="chat__header-microphone cursor" :class="{'bg-orange' : mode === 'sound'}" @click="mode = 'sound'">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M12 15.9995C14.206 15.9995 16 14.2055 16 11.9995V5.99952C16 3.78252 14.215 1.97852 12.021 1.97852C11.9506 1.97894 11.8805 1.98733 11.812 2.00352C10.7853 2.0533 9.81693 2.49587 9.10738 3.23967C8.39783 3.98346 8.00136 4.97156 8 5.99952V11.9995C8 14.2055 9.794 15.9995 12 15.9995Z"/>
          <path
              d="M11 19.931V22H13V19.931C16.939 19.436 20 16.073 20 12H18C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12H4C4 16.072 7.061 19.436 11 19.931Z"/>
        </svg>
      </div>
      <div class="chat__header-text cursor" :class="{'bg-orange' : mode === 'text'}" @click=" mode = 'text'">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <g id="bxs-text">
            <path id="Vector" d="M5 8H7V6H10.252L7.68 18H5V20H13V18H10.748L13.32 6H17V8H19V4H5V8Z"/>
          </g>
        </svg>
<!--        <div class="chat__header-text-tooltip-text" v-if="leanPhase===4">-->
<!--          Сверху можно переключать режимы чат-бота-->
<!--        </div>-->
      </div>
      <div class="chat__header-statistic">{{ done }}/{{ total }}</div>


    </div>

    <div class="flex-div-rub chat__feed-container bg-orange">
      <div ref="chatFeedWraper" class="chat__feed-wraper">
        <div class="chat__feed-wrap">
          <div class="chat__feed">
            <div class="message"
                 v-for="message in messages" :key="message.id"
                 :class="{ 'right': message.side == 'right', 'pleer-wrap': message.mode == 'sound'}"
            >
              <div v-if="message.mode == 'text'">
                  <span
                      v-for="word in message.source" :key="word.id"
                      class="message__word"
                      :class="{'message__word--hover': word.popup.hover === 'yes', 'cursor' : word.popup.mode=='yes'}"
                      :style="{ position: word.popupShow ? 'relative' : '' }"
                      v-on-click-outside="[() => word.popupShow = false]"
                      @click="word.popupShow = !word.popupShow">
                    {{ word.value }}
                    <div class="message__tooltip-text row-center" v-if="(word.popup.mode=='yes')&&(word.popupShow)"
                         style="top: 30px; left: -80px;">
                      <div @click="play(word.popup.sound)">
                        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M4.66683 19.8333H7.81333L16.3335 25.5126V2.4873L7.81333 8.16664H4.66683C3.38 8.16664 2.3335 9.21314 2.3335 10.5V17.5C2.3335 18.7868 3.38 19.8333 4.66683 19.8333ZM18.6668 8.16664V19.8333C20.096 18.55 21.0002 16.0661 21.0002 14C21.0002 11.9338 20.096 9.44997 18.6668 8.16664Z"/>
                        </svg>
                      </div>
                      <div :title="word.popup.hint">
                        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M14.0002 2.3335C7.56716 2.3335 2.3335 7.56716 2.3335 14.0002C2.3335 20.4332 7.56716 25.6668 14.0002 25.6668C20.4332 25.6668 25.6668 20.4332 25.6668 14.0002C25.6668 7.56716 20.4332 2.3335 14.0002 2.3335ZM15.1668 21.0002H12.8335V18.6668H15.1668V21.0002ZM16.3055 15.301C16.0768 15.4853 15.8563 15.6615 15.6813 15.8365C15.2053 16.3113 15.168 16.743 15.1668 16.7617V16.9168H12.8335V16.722C12.8335 16.5843 12.8673 15.3488 14.0305 14.1857C14.258 13.9582 14.5403 13.7272 14.8367 13.4868C15.693 12.7927 16.2553 12.2863 16.2553 11.5887C16.2418 10.9993 15.9981 10.4386 15.5764 10.0266C15.1547 9.61465 14.5885 9.38406 13.999 9.38421C13.4095 9.38437 12.8434 9.61524 12.4219 10.0275C12.0005 10.4397 11.7571 11.0004 11.7438 11.5898H9.4105C9.4105 9.05933 11.4697 7.00016 14.0002 7.00016C16.5307 7.00016 18.5898 9.05933 18.5898 11.5898C18.5898 13.453 17.2143 14.5648 16.3055 15.301Z"/>
                        </svg>
                      </div>
                      <div>
                        {{ word.popup.hint }}
                      </div>
                      <div @click="$router.push(word.popup.path)">
                        <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                          <path
                              d="M22.1665 17.4998V13.9998H19.8332V17.4998H16.3332V19.8332H19.8332V23.3332H22.1665V19.8332H25.6665V17.4998H24.5733H22.1665ZM4.6665 8.1665H17.4998V10.4998H4.6665V8.1665ZM4.6665 12.8332H17.4998V15.1665H4.6665V12.8332ZM4.6665 17.4998H13.9998V19.8332H4.6665V17.4998Z"/>
                        </svg>
                      </div>
                    </div>
                  </span>
              </div>
              <chat-player
                  v-if="message.mode == 'sound'"
                  :source="message.source"
              />
              <div class="message__result"
                   v-if="message.resultType!=''"
                   :class="{'green': message.resultType == 'success', 'error-red':  message.resultType == 'error'}"
              >{{ message.result }}
              </div>
              <div class="message-help-text" v-if="(message.id==100000)&&(leanPhase == 5)">
                Под каждым сообщением отображается подсказка
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="chat__sender bg-orange">
      <div class="chat__sender-input row-center">
        <div class="flex-div-rub">
          <input type="text" placeholder="Написать сообщение..." v-model="text"
                 @keyup.enter="() => {(mode == 'text') ? sendText() : sendSound()}">
        </div>
        <div class="cursor chat__sender-icon" v-if="mode == 'text'" @click="sendText">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.426 11.0952L4.42601 3.09517C4.25482 3.01462 4.0643 2.98428 3.87657 3.00768C3.68883 3.03108 3.51158 3.10725 3.36541 3.22735C3.21923 3.34745 3.11012 3.50656 3.05076 3.68619C2.99139 3.86582 2.98419 4.05861 3.03001 4.24217L4.24201 9.09117L12 12.0002L4.24201 14.9092L3.03001 19.7582C2.98333 19.9419 2.98992 20.135 3.04902 20.3151C3.10811 20.4952 3.21726 20.6547 3.3637 20.7751C3.51014 20.8954 3.68782 20.9715 3.87594 20.9946C4.06406 21.0176 4.25486 20.9866 4.42601 20.9052L21.426 12.9052C21.5978 12.8244 21.7431 12.6964 21.8448 12.5362C21.9466 12.3759 22.0006 12.19 22.0006 12.0002C22.0006 11.8103 21.9466 11.6244 21.8448 11.4642C21.7431 11.3039 21.5978 11.1759 21.426 11.0952Z"/>
          </svg>
        </div>
        <div class="cursor chat__sender-icon" v-if="mode == 'sound'" @click="sendSound">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 16C14.206 16 16 14.206 16 12V6C16 3.783 14.215 1.979 12.021 1.979C11.9506 1.97943 11.8805 1.98781 11.812 2.004C10.7853 2.05378 9.81693 2.49636 9.10738 3.24016C8.39783 3.98395 8.00136 4.97205 8 6V12C8 14.206 9.794 16 12 16Z"/>
            <path
                d="M11 19.931V22H13V19.931C16.939 19.436 20 16.073 20 12H18C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12H4C4 16.072 7.061 19.436 11 19.931Z"/>
          </svg>
        </div>

      </div>

    </div>
  </div>

</template>

<script>
import store from '@/store'
import ChatPlayer from '@/components/app/ChatPlayer.vue'
import {vOnClickOutside} from '@vueuse/components'

export default {
  name: 'ChatView',
  components: {
    ChatPlayer
  },
  directives: {
    onClickOutside: vOnClickOutside
  },
  props: {
    'smallMode': {
      type: Boolean,
      default: true
    },
    'leanPhase': {
      type: Number,
      default: 0
    }
  },
  computed: {
    isNew() {
      return store.getters['account/isNew']
    },
  },

  data: () => ({
    mode: 'text',
    total: 15,
    done: 2,
    text: '',
    count: 0,
    messages: [],
    helpPhase: 0
  }),

  mounted() {
    if (this.isNew) {
      this.count++

      let words = 'Hello, my friend!How`s it going?'.match(/\b(\w+)\b/g)?.map((word, index) => ({
        id: index,
        value: word,
        popupShow: false,
        popup: {
          mode: 'yes',
          hover: 'yes',
          sound: '/sound/black.mp3',
          hint: word,
          path: '/dictionary'
        }
      })) ?? []

      this.messages.push({
        id: this.count,
        mode: 'text',
        source: words,
        side: 'left',
        result: '',
        resultType: '',
      })
      this.count++

      words = 'Hey! I`m doing great. How are you doing today?Hey! I`m doing great. How are you doing today?Hey! I`m doing great. How are you doing today?Hey! I`m doing great. How are you doing today?Hey! I`m doing great. How are you doing today?'.match(/\b(\w+)\b/g)?.map((word, index) => ({
        id: index,
        value: word,
        popupShow: false,
        popup: {
          mode: 'no',
          hover: 'no',
          sound: '',
          hint: word,
          path: ''
        }
      })) ?? []
      this.messages.push({
        id: 100000,
        mode: 'text',
        source: words,
        side: 'right',
        result: 'Верно составлено',
        resultType: 'success',
      })
      this.count++

      words = 'Hey! I`m doing great. How are you doing today?'.match(/\b(\w+)\b/g)?.map((word, index) => ({
        id: index,
        value: word,
        popupShow: false,
        popup: {
          mode: 'no',
          hover: 'no',
          sound: '',
          hint: word,
          path: ''
        }
      })) ?? []
      this.messages.push({
        id: this.count,
        mode: 'text',
        source: words,
        side: 'right',
        result: 'Грамматическая ошибка',
        resultType: 'error',
      })

    }
  },

  watch: {
    messages: {
      handler() {
        setTimeout(() => {
          var container = this.$refs.chatFeedWraper;
          if (container) {
            container.scrollTop = container.scrollHeight + 500;
          }
        }, 50)
      },
      deep: true,
      immediate: true
    }
  },

  methods: {
    sendText() {
      if (this.text != '') {
        let words = this.text.match(/\b(\w+)\b/g)?.map((word, index) => ({
          id: index,
          value: word,
          popupShow: false,
          popup: {
            mode: 'yes',
            hover: 'no',
            sound: '/sound/black.mp3',
            hint: word,
            path: '/dictionary'
          }
        })) ?? []

        this.messages.push({
          id: this.count,
          mode: 'text',
          source: words,
          side: 'right',
          result: '',
          resultType: '',
        })
        this.count++

        words = ('Ответ ИИ будет такой......' + this.count).match(/\b(\w+)\b/g)?.map((word, index) => ({
          id: index,
          value: word,
          popupShow: false,
          popup: {
            mode: 'yes',
            hover: 'yes',
            sound: '/sound/black.mp3',
            hint: word,
            path: '/dictionary'
          }
        })) ?? []

        this.messages.push({
          id: this.count,
          mode: 'text',
          source: words,
          side: 'left',
          result: '',
          resultType: '',
        })
        this.count++
        this.text = ''
      }
    },

    sendSound() {
      this.messages.push({
        id: this.count,
        mode: 'sound',
        source: '/sound/s1.mp3',
        side: 'right'
      })
      this.count++
      this.messages.push({
        id: this.count,
        mode: 'sound',
        source: '/sound/s1.mp3',
        side: 'left'
      })
      this.count++
      this.text = ''
    },

    play(sound) {
      let myAudio = new Audio(sound);
      myAudio.play()
    }
  }
}
</script>

<style>

</style>
