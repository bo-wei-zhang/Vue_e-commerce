<template>
  <header :class="{ 'position-relative': isInBackEndPage }">
    <nav class="flex-content">
      <input id="menu-control" type="checkbox" />
      <label for="menu-control">
        <span class="hamburger-menu"></span>
      </label>

      <ul class="nav-links flex-content">
        <router-link to="/">
          <h1 class="logo">
            <img src="../assets/logo.jpg" alt="logo" />
          </h1>
        </router-link>
        <li class="nav-link" v-for="link in links" :key="link.name">
          <router-link
            :to="{ name: link.route, params: { position: link.position } }"
            >{{ link.name }}
          </router-link>
        </li>
      </ul>

      <ul class="members flex-content">
        <li class="member user" v-if="!isLogin">
          <router-link :to="{ name: 'Login' }" title="登入">
            <i class="fas fa-user"></i>
          </router-link>
        </li>
        <li class="pay-now member" v-if="isLogin">
          <router-link :to="{ name: 'Bill' }" title="立即付款">
            <i class="fas fa-money-check-alt"></i>
          </router-link>
        </li>
        <li
          v-if="isShowCartIcon"
          class="cart member"
          @mouseenter="showCartItems"
          @mouseleave="disShowCartItems"
          @click="go('Cart')"
        >
          <a href="javascript:;" title="購物車">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="isLogin">{{ cartItemsCount }}</span>
            <span v-else>0</span>
          </a>

          <!-- 購物車預覽 -->
          <transition name="enlarge">
            <div class="cart-items-preview flex-content" v-if="isShowCartItem">
              <!-- -->
              <template v-if="cartItemsInCart.length > 0 && isLogin">
                <ul class="cart-items">
                  <h3 class="cart-items-title">最近加入的商品</h3>
                  <li
                    class="cart-item flex-content"
                    v-for="cartItem in cartItemsInCart"
                    :key="cartItem.id"
                    @click.stop="
                      goToProductDeatail('ProductDetail', cartItem.id)
                    "
                  >
                    <div
                      class="cart-img"
                      :style="{
                        backgroundImage: `url(
                          https://i.imgur.com/${cartItem.imgSrc})`,
                      }"
                    ></div>
                    <div class="cart-name">{{ cartItem.name }}</div>
                    <span class="cart-price"> $ {{ cartItem.price }}</span>
                  </li>
                </ul>
                <span class="check-cart" @click.stop="go('Cart')"
                  >查看購物車</span
                >
              </template>
              <p class="no-cart-item flex-content" v-else>
                <span> 您的購物車尚無商品 </span>
                <span class="buy-now" @click.stop="go('Product')"
                  >立即選購</span
                >
              </p>
            </div>
          </transition>
        </li>
        <li class="member user" v-if="!isInLoginPage && isLogin">
          <router-link :to="{ name: 'Login' }" title="登出">
            <i class="fas fa-sign-out-alt" @click="logout"></i>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { getCookie, setCookie } from '../functions/cookies'
export default {
  name: 'Header',
  data() {
    return {
      links: [
        {
          name: '關於我們',
          route: 'About',
          position: '',
        },
        {
          name: '全部球技',
          route: 'Product',
          position: '',
        },
        {
          name: '後衛球員',
          route: 'Player',
          position: 'guard',
        },
        {
          name: '前鋒球員',
          route: 'Player',
          position: 'foward',
        },
        {
          name: '中鋒球員',
          route: 'Player',
          position: 'center',
        },
        {
          name: '後臺管理',
          route: 'BackEndHome',
          position: '',
        },
      ],
      isShowCartItem: false,
      windowTop: 0,
    }
  },
  methods: {
    showCartItems() {
      console.log(this.$store.getters.windowWidth)
      if (this.$store.getters.windowWidth < 768) return
      this.isShowCartItem = true
      // console.log('isShow: ' + this.isShowCartItem)
    },
    disShowCartItems() {
      this.isShowCartItem = false
    },
    logout() {
      console.log('logout')
      setCookie('login', 'false', -1)
    },
    go(route) {
      // if (!this.isLogin) return this.$router.push({ name: 'Login' })
      if (this.isInProductPage && route === 'Product') return
      this.$router.push({ name: route }).catch(() => {})
    },
    goToProductDeatail(route, id) {
      if (this.isInProductDetailPage) return
      this.$router.push({ name: route, params: { id: id } })
    },
  },
  computed: {
    cartItemsCount() {
      return this.$store.state.products.filter((product) => product.count > 0)
        .length
    },
    cartItemsInCart() {
      return this.$store.getters.cartItems
        .filter((product) => product.count > 0)
        .map((product) => {
          product.sum = product.count * product.price
          return product
        })
    },
    isInLoginPage() {
      return this.$route.name === 'Login'
    },
    isInBackEndPage() {
      return this.$route.name === 'BackEndProduct'
    },
    isShowCartIcon() {
      return (
        this.$route.name !== 'Cart' &&
        this.$route.name !== 'Checkout' &&
        this.$route.name !== 'Login' &&
        this.$route.name !== 'CreateOrder'
      )
    },
    isLogin() {
      return getCookie('login') === 'true'
    },
    isInProductPage() {
      return this.$route.name === 'Product'
    },
    isInProductDetailPage() {
      return this.$route.name === 'ProductDetail'
    },
  },
  mounted() {},
  created() {},
}
</script>

<style lang="scss" scoped>
.enlarge-enter-active,
.enlarge-leave-active {
  transition: transform 0.5s;
}
.enlarge-enter-to,
.enlarge-leave {
  transform-origin: 325px 0;
  transform: scale(1);
}
.enlarge-enter, .enlarge-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform-origin: 325px 0;
  transform: scale(0);
}
.position-relative {
  position: relative;
}
header {
  background-color: #000;
  .router-link-exact-active {
    color: #fff;
  }
  @media screen and (max-width: 833px) {
    height: 90px;
  }
  color: #fff;
  padding: 10px;
  padding-left: 0;
  font-size: 1.3rem;
  position: fixed;
  top: 0;
  z-index: 98;
  width: 100%;

  nav {
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 833px) {
      overflow: hidden;
    }
  }
  #menu-control {
    display: none;
  }
  #menu-control:checked ~ .nav-links {
    @media screen and (max-width: 833px) {
      height: 394px;
    }
    height: 0;
  }
  label {
    display: none;
    user-select: none;
    @media screen and (max-width: 833px) {
      display: block;
      width: 35px;
      height: 30px;
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 7.5%;
      transform: translateY(-50%);
    }
  }
  .hamburger-menu {
    width: 25px;
    height: 2px;
    display: block;
    background-color: #aaa;
    box-shadow: 0 -8px 0 #aaa, 0 8px 0 #aaa;
    position: absolute;
    top: 50%;
    left: 0;
  }
  a {
    display: inline-block;
    color: #aaa;
    padding: 5px 8px;
    &:hover {
      color: #fff;
    }
  }
  .nav-links {
    align-items: center;
    transition: 0.3s;

    @media screen and (max-width: 833px) {
      display: block;
      background-color: rgba(0, 0, 0, 1);
      color: #fff;
      width: 100vw;
      height: 0;
      margin-top: 80px;
    }
  }
  .nav-link {
    @media screen and (max-width: 833px) {
      padding: 15px;
    }
  }

  .logo-center {
    @media screen and (max-width: 833px) {
      display: block;
    }
  }

  .logo {
    width: 50px;
    @media screen and (max-width: 833px) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  img {
    width: 100%;
    vertical-align: middle;
  }
  .member {
    padding: 0 10px;
  }
  .user {
    @media screen and (max-width: 833px) {
      position: absolute;
      top: 50%;
      right: 7.5%;
      transform: translateY(-50%);
    }
  }
  .user-mobile {
    display: none;

    @media screen and (max-width: 833px) {
      display: block;
    }
  }
  .pay-now {
    @media screen and (max-width: 833px) {
      position: absolute;
      top: 50%;
      right: 17.5%;
      transform: translateY(-50%);
    }
  }
  .cart {
    position: relative;
    @media screen and (max-width: 833px) {
      position: absolute;
      top: 50%;
      left: 17.5%;
      transform: translateY(-50%);
    }
  }
  .fa-shopping-cart {
    padding-right: 10px;
  }
  .cart-items-preview {
    position: fixed;
    top: 70px;
    right: 35px;
    z-index: 99;
    background-color: #fff;
    color: #000;
    font-size: 1rem;
    padding: 35px 0px 15px;
    width: 350px;
    align-items: center;
    @media screen and (max-width: 833px) {
      top: 40px;
      right: 10px;
    }

    &::before {
      content: '';
      border-style: solid;
      border-width: 0px 10px 10px 10px;
      border-color: transparent transparent #fff;
      position: absolute;
      top: -10px;
      right: 5%;
    }
  }
  .cart-items {
    margin-bottom: 20px;
    width: 100%;
  }
  .cart-items-title {
    color: #ccc;
    font-size: 0.8rem;
    margin-bottom: 15px;
    margin-left: 10px;
  }
  .cart-item {
    width: 100%;
    margin-bottom: 10px;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    user-select: none;
    padding-top: 10px;
    &:hover {
      background-color: #ccc;
    }
  }

  .cart-img {
    width: 50px;
    height: 50px;
    background-position: center 10%;
    background-size: cover;
    margin-bottom: 15px;
  }
  .cart-name {
    text-align: center;
  }
  .cart-price {
    color: #d4772a;
  }
  .check-cart {
    position: absolute;
    bottom: 15px;
    right: 35px;
    border: none;
    background-color: #d4772a;
    color: #fff;
    cursor: pointer;
    padding: 5px 15px;
    font-size: 1rem;
  }
  .no-cart-item {
    width: 50%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;

    span {
      display: inline-block;
      text-align: center;
      width: 90%;
      margin-bottom: 25px;
    }
  }
  .buy-now {
    color: #fff;
    background-color: rgb(212, 119, 42);
    margin-top: 10px;
    margin-left: 10px;
    padding: 10px 15px;
    cursor: pointer;
  }
}
</style>
