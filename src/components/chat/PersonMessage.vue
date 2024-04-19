<template>
  <div class="person_message animate__animated animate__fast animate__fadeInRight">
    <div class="message"
         :class="{
                    'bg-done': message?.grading === 'success',
                    'bg-reject': message?.grading === 'error'
                 }">
      <span>{{ message.message }}</span>
    </div>
    <CommentElement v-if="message?.spelling_comment" :comment="message"></CommentElement>
  </div>
</template>

<script setup>
import {toRefs} from "vue";
import CommentElement from "@/components/chat/CommentElement";

// eslint-disable-next-line no-undef
const props = defineProps({
  message: Object
})
const {message} = toRefs(props);
</script>

<style scoped lang="scss">

.person_message {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

  .message {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 20px;
    padding: 5px 10px;
    border: 2px solid var(--dark);
    box-shadow: 1px 4px 1px var(--dark);
    max-width: 60%;
    background-color: var(--light-gray);

    span {
      position: relative;
      cursor: default;
      transition: all 0.2s;

      span.english-word:hover {
        color: var(--red);
      }
    }

    .message-in-main-page {
      white-space: pre-wrap;
    }

    .translate-all-message {
      position: absolute;
      opacity: 0;
      bottom: -7px;
      right: -15px;
      display: flex;
      border-radius: 10px;
      padding: 4px 6px;
      border: 2px solid var(--dark);
      box-shadow: 1px 4px 1px var(--dark);
      background-color: var(--yellow);
      transition: all 0.2s;

      img {
        width: 20px;
      }

      &:hover {
        background-color: var(--light-yellow);
      }

      &:active {
        box-shadow: 0 0 1px var(--dark);
        transform: translateY(5px);
      }
    }

    &:hover {
      .translate-all-message {
        opacity: 1;
      }
    }
  }

  .bg-done {
    background-color: var(--green);
  }

  .bg-reject {
    background-color: var(--light-red);
  }
}

@media screen and (min-width: 2200px) {
  .person_message {
    .message {
      span {
        font-size: 23px;
      }
    }
  }
}

</style>
