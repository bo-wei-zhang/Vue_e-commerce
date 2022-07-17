<template>
  <section class="back-end-nav bg-dark">
    <ul class="navs flex-content">
      <li class="nav" @click="go('Home')">
        <img class="logo" src="../assets/logo.jpg" alt="" />
      </li>
      <li
        class="nav"
        :class="{ 'text-primary': isInBackEndProductPage }"
        @click="go('BackEndProduct')"
      >
        <i class="fas fa-shopping-bag"></i>
        商品管理
      </li>
      <li
        class="nav "
        :class="{ 'text-primary': isInBackEndOrderPage }"
        @click="go('BackEndOrder')"
      >
        <i class="far fa-file-alt"></i>
        訂單管理
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  methods: {
    go(route) {
      if (route === this.$route.name) return
      this.$router.push({ name: route })
    },
  },
  computed: {
    isInBackEndProductPage() {
      return this.$route.name === 'BackEndProduct'
    },
    isInBackEndOrderPage() {
      return this.$route.name === 'BackEndOrder'
    },
  },
}
</script>

<style lang="scss" scoped>
.back-end-nav {
  width: 20%;
  color: #fff;
  border-right: 1px solid #aaa;
  padding: 20px 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.navs {
  margin-top: 30px;
  font-size: 1.4rem;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  height: 100vh;

  @media screen and (max-width: 768px) {
    height: initial;
    flex-direction: row;
    font-size: 1.2rem;
  }
  .nav {
    cursor: pointer;
    padding: 10px 20px 35px;
    color: #aaa;
    transition: 0.3s;
    user-select: none;
    @media screen and (max-width: 768px) {
      padding: 10px 10px 35px;
    }
    &:hover {
      color: #fff;
    }
  }
  .text-primary {
    color: #fff;
  }
}
.logo {
  width: 65px;
  @media screen and (max-width: 768px) {
    width: 50px;
  }
}
</style>
