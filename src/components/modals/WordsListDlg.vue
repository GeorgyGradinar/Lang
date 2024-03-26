<template>
  <popup-modal ref="popup" @onEsc="_cancel()">
    <div class="words-wrap">
      <p class="words__title">Группа слов {{ selectedGroupWords.title }}</p>
      <wordlist-view
          :words="groupWords"
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

<script setup>
import PopupModal from '@/components/app/PopupModal.vue';
import WordlistView from '@/components/widgets/WordlistView.vue';
import {ref, toRefs, watch} from "vue";
import {dictionaryStore} from "@/store/dictionaryStore";
import {storeToRefs} from "pinia/dist/pinia";

const dictionary = dictionaryStore();
const {changeGroupWords, changeSelectedGroup} = dictionary;
const {groupWords, selectedGroupWords} = storeToRefs(dictionary);
// eslint-disable-next-line no-undef
const props = defineProps({
  triggerOpen: Boolean,
  groupName: String
})
const {triggerOpen} = toRefs(props);

let popup = ref(null);

watch(triggerOpen, () => {
  show();
})

function show() {
  popup.value.open();
}

function _cancel() {
  popup.value.close();
  changeGroupWords([]);
  changeSelectedGroup(null);
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
