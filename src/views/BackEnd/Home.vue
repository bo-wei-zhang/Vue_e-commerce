<template>
  <div>
    <back-end-navigation />
    <section class="bg-dark home" v-if="isInHome">
      <h1 class="back-end-title">
        Welcome
        <span>{{ userName }}</span>
      </h1>
    </section>
    <router-view class="main-content bg-dark" />
    <Footer />
  </div>
</template>

<script>
import Footer from '../../components/Footer.vue'
import BackEndNavigation from '../../components/BackEndNavigation.vue'
import { setCookie, getCookie } from '../../functions/cookies'

export default {
  components: { BackEndNavigation, Footer },
  computed: {
    userName() {
      return getCookie('userName')
    },
    isInHome() {
      return this.$route.name === 'BackEndHome'
    },
  },
}
</script>

<style lang="scss" scoped>
.back-end-container {
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
}
.main-content {
  width: 80%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.home {
  width: 80%;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 35vh;
  }
}
.back-end-title {
  margin: 50px auto 0;
  color: #fff;
  text-transform: capitalize;
}
</style>
