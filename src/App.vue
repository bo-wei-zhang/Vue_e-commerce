<template>
  <div id="app">
    <router-view :class="{ 'back-end-container': true }" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    getProductData() {
      this.$store.dispatch('getProductData')
    },
    ...mapMutations(['setWindowWidth']),
    initialize() {
      this.detectWindowWidth()
    },
    detectWindowWidth() {
      this.setWindowWidth(window.innerWidth)
    },
  },
  created() {
    this.getProductData()
    this.initialize()
    window.addEventListener('resize', this.detectWindowWidth)
  },
  destroyed() {
    window.removeEventListener('resize', this.detectWindowWidth)
  },
}
</script>

<style lang="scss">
@import url(../public/css/reset.css);
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+KuaiLe&display=swap');
.flex-content {
  display: flex;
  flex-wrap: wrap;
}
*,
*::after,
*::before {
  box-sizing: border-box;
}
body {
  font-family: Noto Sans TC, Helvetica, Arial, LiHei Pro, 黑體-繁, 微軟正黑體,
    sans-serif;
}
h1 {
  font-size: 2rem;
  text-align: center;
}
.container {
  width: 90%;
  margin: 0 auto;
}

.bg-dark {
  background-color: #333;
}

.btn-primary {
  display: inline-block;
  background-color: #fff;
  padding: 15px 20px;
  font-size: 1.2rem;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #000;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
}
button {
  outline: none;
  cursor: pointer;
  background-color: transparent;
}
</style>
