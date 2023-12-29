<template>
  <popup-modal ref="popup" @onEsc="_cancel()">
    <div class="words-wrap">
      <p class="words__title">Группа слов <span>{{ group.title }}</span></p>
      <wordlist-view
          :words="words"
          :columns="3"
          :is-popup="true"
      />
      <div>
        <router-link to="/dictionary" class="secondary-button">
          Посмотреть больше слов &nbsp;&nbsp;&nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z"/>
          </svg>
        </router-link>
      </div>
    </div>
  </popup-modal>
</template>

<script>
import PopupModal from '@/components/app/PopupModal.vue';
import WordlistView from '@/components/widgets/WordlistView.vue';

export default {
  name: 'WordsListDlg',
  components: {
    PopupModal, WordlistView
  },

  data: () => ({
    group: {
      id: 0,
      title: ''
    },
    words: [],
    // Private variables
    resolvePromise: undefined,
    rejectPromise: undefined,
  }),

  methods: {
    show(opts = {}) {
      this.group = opts.group;
      this.words = opts.words;
      this.$refs.popup.open();
      // Return promise so the caller can get results
      // return new Promise((resolve, reject) => {
      //     this.resolvePromise = resolve
      //     this.rejectPromise = reject
      // })
    },

    _cancel() {
      this.$refs.popup.close();
      // this.resolvePromise({accept : false})
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/buttons";

.words-wrap {
  background-color: var(--green);
  width: 100%;
  max-width: 950px;
  border-radius: 10px;
  padding: 40px;
  border: 1px solid var(--dark);
  box-shadow: 1px 4px 1px var(--dark);

  .words__title {
    span {
      color: var(--yellow);
    }
  }

  .secondary-button {
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

@media screen and (max-width: 900px) {
  .words-wrap {
    height: 100%;
    max-height: 70vh;
    overflow: auto;

    .words__title {
      span {

      }
    }

    .secondary-button {
      svg {
      }
    }
  }
}
</style>
