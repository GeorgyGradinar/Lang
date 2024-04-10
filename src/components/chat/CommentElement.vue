<template>
  <div class="wrapper-comment animate__animated animate__fast animate__fadeInRight">
    <p class="comment" :class="{'show-comment': isShowComment, 'correct-message': comment?.grading === 'success'}">
      {{ comment?.spelling_comment }}
    </p>
    <button v-if="comment?.spelling_comment.length > 50" @click="toggleIsShowComment">{{ textButton }}</button>
  </div>
</template>

<script setup>
import {ref} from "vue";

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  comment: Object
})

let isShowComment = ref(false);
let textButton = ref('Расскрыть');

function toggleIsShowComment() {
  isShowComment.value = !isShowComment.value;
  textButton.value = !isShowComment.value ? 'Расскрыть' : 'Скрыть';
}
</script>

<style scoped lang="scss">
.wrapper-comment {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  max-width: 40%;

  .comment {
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: var(--yellow);
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: normal;
    overflow: hidden;
    margin: 10px 0;
    transition: all 0.2s;
  }

  .show-comment {
    display: flex;
    white-space: pre-wrap;
  }

  button {
    display: flex;
    font-size: 13px;
    padding: 3px 9px;
    border-radius: 10px;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    background-color: var(--dark-pink);
    color: var(--light-yellow);
    transition: all 0.2s;

    &:active {
      box-shadow: 0 0 1px var(--dark);
      transform: translateY(5px);
    }
  }

  .correct-message {
    color: var(--light-gray);
  }
}
</style>
