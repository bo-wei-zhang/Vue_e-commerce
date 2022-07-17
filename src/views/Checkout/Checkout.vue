<template>
  <div class="bg-dark">
    <Loading :active.sync="isLoading"></Loading>
    <Header />
    <div class="container">
      <ul class="cart-items" v-if="hasCartItem">
        <h1 class="cart-title" v-if="isInCheckoutPage">結帳</h1>
        <h1 class="cart-title" v-else>個人資訊</h1>
        <div class="cart-item-container">
          <li class="cart-item-title flex-content">
            <span>商品名稱</span>
            <span>商品價格</span>
            <span>商品數量</span>
            <span>小計</span>
          </li>
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
                {{ cartItem.price | commaFormat | priceFormat }}
              </div>
              <div class="cart-number">
                <span class="cart-count"> {{ cartItem.count }} </span>
              </div>
              <div class="cart-subtotal">
                {{ cartItem.sum | commaFormat | priceFormat }}
              </div>
            </router-link>
          </li>
        </div>
        <div class="total-price">
          <span>總金額：</span> {{ total | commaFormat | priceFormat }}
        </div>
      </ul>
      <ul class="cart-items" v-else>
        <h1 class="cart-title" v-if="isInCheckoutPage">結帳</h1>
        <h1 class="cart-title" v-else>個人資訊</h1>
        <div class="cart-item-container">
          <li class="cart-item-title flex-content">
            <span>商品名稱</span>
            <span>商品價格</span>
            <span>商品數量</span>
          </li>
          <li
            class="cart-item flex-content"
            v-for="(product, index) in products"
            :key="index"
          >
            <router-link
              :to="{
                name: 'ProductDetail',
                params: { id: product.id },
              }"
              class="cart-info flex-content"
            >
              <div class="cart-info-container">
                <div
                  class="cart-img"
                  :style="{
                    backgroundImage: `url(
                          https://i.imgur.com/${product.imgSrc})`,
                  }"
                ></div>
                <div class="cart-name">{{ product.name }}</div>
              </div>
              <div class="cart-price">
                {{ product.price | commaFormat | priceFormat }}
              </div>
              <div class="cart-number">
                <span class="cart-count"> {{ product.count }} </span>
              </div>
            </router-link>
          </li>
        </div>
        <div class="total-price">
          <span>總金額：</span> {{ total | commaFormat | priceFormat }}
        </div>
      </ul>
      <div class="btn-container" v-if="isInCheckoutPage">
        <button class="btn back" @click="go('Cart')">上一步</button>
        <button class="btn go-to-info" @click="go('CreateOrder')">
          填寫個人相關資料
        </button>
      </div>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import Product from '../Product/Product.vue'
import axios from 'axios'

export default {
  components: {
    Header,
    Footer,
    Product,
  },
  data() {
    return {
      products: [],
      axiosHeaders: {
        headers: {
          'secret-key':
            '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam',
        },
        'Content-Type': 'application/json',
      },
      isLoading: true,
    }
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
      return (
        this.cartItemsInCart.reduce((sum, p) => sum + p.sum, 0) ||
        this.products.reduce((sum, p) => sum + p.sum, 0)
      )
    },
    hasCartItem() {
      return this.cartItemsInCart.length > 0
    },
    isInCheckoutPage() {
      return this.$route.name === 'Checkout'
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
  
    showCount() {
      console.log(this.$store.getters.cartItems)
    },
    go(route) {
      this.$router.push({ name: route })
    },
    getOrder() {
      console.log('order')
      const getOrderInfoApi =
        'https://api.jsonbin.io/b/61b7760362ed886f915f62ee/latest' // request URL
      axios
        .get(getOrderInfoApi, this.axiosHeaders)
        .then((response) => {
          console.log('Get: ', response.data)
          this.products = response.data[response.data.length - 1].productInfos
          this.isLoading = false
        })
        .catch((error) => console.log(error))
    },
  },
  created() {
    this.getOrder()
  },
}
</script>

<style lang="scss" scoped>
a {
  color: #fff;
}
.container {
  width: 65%;
  border-bottom: 1px solid #aaa;
  margin-top: 25px;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}
.cart-title {
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
  font-size: 3rem;
  @media screen and (max-width: 768px) {
    text-align: center;
    font-size: 2.2rem;
  }
}
.cart-items {
  padding: 100px 0 35px;

  .cart-img {
    width: 65%;
    height: 150px;
    background-position: center 10%;
    background-size: cover;
    margin: 0 auto;
  }
  .fas {
    cursor: pointer;
  }
  .far {
    color: #fff;
  }
  .cart-item-title {
    color: #fff;
    font-size: 1.2rem;
    width: 100%;
    text-align: center;
    //justify-content: space-between;

    span {
      width: 25%;
      padding-bottom: 25px;
      //width: 25%;

      &:first-child {
        //  width: 50%;
        min-width: 150px;
      }
      @media screen and (max-width: 768px) {
        &:first-child {
          //  width: 50%;
          min-width: 0px;
        }
      }
    }
  }
  .cart-item {
    color: #fff;
    align-items: center;
    font-size: 1.2rem;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      margin: 0 auto 20px;
    }
  }
  .cart-info {
    width: 100%;
    align-items: center;
    //  justify-content: space-between;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .cart-info-container {
    width: 25%;
  }
  .cart-item-container {
    border-bottom: 1px solid #aaa;
    margin-bottom: 25px;
  }
  .cart-name {
    padding: 15px 0 25px;
    text-align: center;
    // width: 25%;
  }

  .cart-price,
  .cart-subtotal {
    font-size: 1.5rem;
    letter-spacing: 1.5px;
    width: 25%;
    text-align: center;
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
    text-align-last: center;
    width: 25%;
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
.total-price {
  text-align: right;
  color: #fff;
  font-size: 1.6rem;
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
.btn-container {
  text-align: right;
  margin-bottom: 25px;
  .btn {
    padding: 10px 20px;
    margin-right: 20px;
    background-color: rgb(212, 119, 42);
    color: #fff;
    font-size: 1.1rem;
    border-radius: 5px;
    border: none;
    &:last-child {
      margin: 0;
    }
    &:hover {
      background-color: darken(rgb(212, 119, 42), 5%);
    }
  }
  .back {
    background-color: #aaa;
    &:hover {
      background-color: darken(#aaa, 5%);
    }
  }
}
</style>
