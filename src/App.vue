<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods:{
    loadProductData(){
      this.$store.dispatch('loadProductData')
    }
  },
  mounted(){
    this.loadProductData()
  }  
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
.bg-gray {
  background-color: #333;
}
.bg-dark {
  background-color: #000;
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
</style>
