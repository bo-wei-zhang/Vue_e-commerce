<template>
  <div
    class="btn-switch flex-content"
    :class="{ true: isTrue, false: !isTrue }"
  >
    <div class="circle" :class="{ left: !isTrue, right: isTrue }"></div>
  </div>
</template>

<script>
export default {
  name: 'SwitchButton',
  props: {
    isTrue: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.btn-switch {
  width: 55px;
  height: 25px;
  border-radius: 25px;
  position: relative;
  cursor: pointer;

  .circle {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    transition: 0.3s;
  }
  .left {
    transform: translate(5px, -50%);
  }
  .right {
    transform: translate(30px, -50%);
  }
}
.true {
  background-color: #00d812;
  &:hover {
    background-color: darken(#00d812, 10%);
  }
}
.false {
  background-color: #ff4444;
  &:hover {
    background-color: darken(#ff4444, 10%);
  }
}
</style>
