<template>
  <div>
    <Header />
    <Slider />
    <Main />
   <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header.vue'
import Slider from '../components/Slider.vue'
import Main from '../components/Main.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Slider,
    Main,
    Footer,
  },
}
</script>

<style lang="scss" scoped>

</style>
1
