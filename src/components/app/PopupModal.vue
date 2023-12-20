<template>
  <transition name="fade">
    <div class="popup-modal bg-dark" v-if="isVisible">
      <div class="window-modal">
        <button class="window-modal__close" @click="$emit('onEsc')">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path
                d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg>
        </button>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopupModal',

  emits: ['onEsc'],

  data: () => ({
    isVisible: false,
  }),

  methods: {
    open() {
      this.isVisible = true
    },

    close() {
      this.isVisible = false
    },
  },
}
</script>

<style scoped lang="scss">
/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.popup-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  padding: 50px 30px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  z-index: 100;
  overflow: auto;

  .window-modal {
    position: relative;
  }

  .window-modal__close {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 24px;
    right: 24px;
    background-color: unset;
    border: unset;
    cursor: pointer;

    svg {
      width: 30px;
      height: 30px;
      fill: var(--white);
      transition: all 0.2s;
    }

    &:hover {
      svg {
        transform: scale(1.2);
      }
    }

    &:active {
      svg {
        transform: scale(1);
      }
    }
  }
}

.popup-modal.bg-dark {
  background-color: rgba(32, 31, 38, .8)
}

</style>
