<template>
  <transition name="fade" appear>
    <div class="modal-background" @click.self="toggleModal">
      <transition name="slideIn" appear>
        <div class="modal-container">
          <slot name="header"></slot>
          <slot></slot>
          <slot name="footer"></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      direction: this.isSlideIn,
    }
  },
  methods: {},
  props: {},
}
</script>

<style scoped lang="scss">
.modal-background {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.modal-container {
  text-align-last: left;
  width: 530px;
  background-color: #fff;
  color: #000;
  padding: 20px;
  padding-top: 30px;
  margin: 15% auto;
  border-radius: 5px;
  overflow: auto;
  position: relative;
  top: 0;

  @media screen and (max-width: 414px) {
    width: 300px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}

.slideIn-enter-active,
.slideIn-leave-active {
  transition: all 0.3s linear;
}

.slideIn-enter,
.slideIn-leave-to {
  top: -300px;
}
.slideIn-leave,
.slideIn-enter-to {
  top: 0px;
}

// .slideIn {
//   animation-name: slideIn;
//   animation-duration: 0.75s;
// }

// @keyframes slideIn {
//   from {
//     top: -300px;
//     opacity: 0;
//   }
//   to {
//     top: 0;
//     opacity: 1;
//   }
// }
</style>
