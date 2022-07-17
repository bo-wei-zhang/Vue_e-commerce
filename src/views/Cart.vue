<template>
  <div class="bg-dark">
    <Loading :active.sync="isLoading"></Loading>
    <Header />
    <div class="container ">
      <ul class="cart-items" v-if="hasCartItem">
        <h1 class="cart-title">購物車</h1>
        <div class="cart-item-container">
          <li
            class="cart-item flex-content"
            v-for="(cartItem, index) in cartItemsInCart"
            :key="index"
          >
            <router-link
              :to="{
                name: 'ProductDetail',
                params: { id: cartItem.id },
              }"
              class="cart-info flex-content"
            >
              <div class="cart-info-container">
                <div
                  class="cart-img"
                  :style="{
                    backgroundImage: `url(
                          https://i.imgur.com/${cartItem.imgSrc})`,
                  }"
                ></div>
                <div class="cart-name">{{ cartItem.name }}</div>
              </div>
              <div class="cart-price">
                {{ cartItem.sum | commaFormat | priceFormat }}
              </div>
            </router-link>
            <div class="cart-controller flex-content">
              <div class="cart-number">
                <i class="fas fa-minus" @click="minusCount(cartItem)"></i>
                <span class="cart-count"> {{ cartItem.count }} </span>
                <i class="fas fa-plus" @click="plusCount(cartItem)"></i>
              </div>
              <div class="remove-cart-item">
                <i
                  class="far fa-trash-alt"
                  @click="removeCartItem(cartItem)"
                ></i>
              </div>
            </div>
          </li>
        </div>
        <div class="total-price">
          <span>總金額：</span> {{ total | commaFormat | priceFormat }}
          <button class="checkout" @click="checkoutBill">結帳</button>
        </div>
      </ul>
      <div class="no-cart-items bg-dark" v-else>
        <h1 @click="showCount">您的購物車尚無商品</h1>
        <router-link class="keep-shopping" :to="{ name: 'Product' }"
          >繼續購物</router-link
        >
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Product from './Product/Product.vue'

export default {
  components: {
    Header,
    Footer,
    Product,
  },
  data() {
    return {}
  },
  watch: {
    $route(to, from) {
      //刷新頁面
      this.$router.go(0)
    },
  },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems
    },
    cartItemsInCart() {
      return (
        this.cartItems
          //只顯示數量大於0的
          .map((product) => {
            product.sum = product.count * product.price
            return product
          })
      )
    },
    total() {
      return this.cartItemsInCart.reduce((sum, p) => sum + p.sum, 0)
    },
    hasCartItem() {
      return this.cartItemsInCart.length > 0
    },
    isLoading() {
      return this.$store.state.isLoading
    },
  },
  filters: {
    priceFormat(value) {
      // 加上 $ 字號
      return '$' + value.toString()
    },
    commaFormat(value) {
      // 加上千分位符號
      return value
        .toString()
        .replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function(
          all,
          pre,
          groupOf3Digital
        ) {
          return pre + groupOf3Digital.replace(/\d{3}/g, ',$&')
        })
    },
  },
  methods: {
    plusCount(cartItem) {
      this.$store.dispatch('plusCount', {
        id: cartItem.id,
      })
    },
    minusCount(cartItem) {
      this.$store.dispatch('minusCount', {
        id: cartItem.id,
        // count: cartItem.count,
      })
    },
    removeCartItem(cartItem) {
      this.$store.dispatch('removeCartItem', {
        ids: [cartItem.id],
        isSystem: false,
      })
    },
    showCount() {
      console.log(this.$store.getters.getCartItems)
    },
    checkoutBill() {
      this.$router.push({ name: 'Checkout' })
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  color: #fff;
}
.container {
  width: 80%;
}
.cart-title {
  color: #fff;
  text-align: left;
  margin: 15px 0 25px;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
}
.cart-items {
  padding: 100px 0 35px;
  justify-content: space-around;

  .cart-img {
    width: 150px;
    height: 150px;
    background-position: center 10%;
    background-size: cover;
  }
  .fas {
    cursor: pointer;
  }
  .far {
    color: #fff;
  }
  .cart-item {
    color: #fff;
    align-items: center;
    font-size: 1.2rem;
    width: 75%;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      margin: 0 auto 20px;
    }
  }
  .cart-info {
    width: 40%;
    align-items: center;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .cart-info-container {
    margin: 0 auto;
  }
  .cart-name {
    padding: 15px 0 25px;
    text-align: center;
    max-width: 150px;
  }
  .cart-controller {
    width: 60%;
    @media screen and (max-width: 768px) {
      width: 50%;
      flex-direction: column;
      margin: 0 auto;
    }
  }
  .cart-price {
    width: 50%;
    padding-left: 35px;
    font-size: 1.5rem;
    letter-spacing: 1.5px;
    @media screen and (max-width: 768px) {
      margin: 0 auto;
      padding: 0;
      text-align: center;
    }
  }
  .cart-count {
    padding: 0 15px;
  }
  .cart-number {
    padding-left: 25px;
    @media screen and (max-width: 768px) {
      padding: 15px 0;
      margin: 0 auto;
    }
  }
  .remove-cart-item {
    padding: 0 25px;
    cursor: pointer;
    &:hover {
      color: rgb(212, 119, 42);
    }
    @media screen and (max-width: 768px) {
      padding: 0;
      margin: 0 auto;
    }
  }
  .total-price {
    position: fixed;
    top: 110px;
    right: 7.5%;
    background-color: #fff;
    height: 175px;
    padding: 50px;
    font-size: 1.5rem;
    text-align: center;
    span {
      font-weight: 700;
    }
    @media screen and (max-width: 768px) {
      position: relative;
      top: 0;
      left: 0;
    }
  }
  .checkout {
    width: 100%;
    outline: none;
    border: 1.5px solid rgb(212, 119, 42);
    padding: 10px 25px;
    display: block;
    margin-top: 25px;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 1px;
    color: rgb(212, 119, 42);
    background-color: #fff;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: rgb(212, 119, 42);
      color: #fff;
    }
  }
}
.no-cart-items {
  color: #fff;
  padding: 50px;
  justify-content: center;
  min-height: 100vh;
  padding-top: 150px;
  h1 {
    font-size: 2rem;
    width: 100%;
  }
  .keep-shopping {
    display: block;
    width: 150px;
    text-align: center;
    margin: 75px auto 25px;
    padding: 15px;
    color: #6dd7bb;
    border: 1px solid #6dd7bb;
    font-size: 1.2rem;
    letter-spacing: 1px;
    transition: 0.3s;
    &:hover {
      background-color: #6dd7bb;
      color: #000;
    }
  }
}
</style>
