<template>
  <div>
    <Header />
    <ul class="cart-items bg-dark flex-content" v-if="hasCartItem">
      <div class="cart-item-container">
        <li
          class="cart-item flex-content"
          v-for="(cartItem, index) in cartItemsInCart"
          :key="index"
        >
          <div class="cart-info">
            <div
              class="cart-img"
              :style="{ backgroundImage: `url(${cartItem.imgSrc})` }"
            ></div>
            <div class="cart-name">{{ cartItem.name }}</div>
          </div>
          <div class="cart-controller flex-content">
            <div class="cart-price">
              {{ cartItem.sum | commaFormat | priceFormat }}
            </div>
            <div class="cart-number">
              <i class="fas fa-minus" @click="minusCount(cartItem)"></i>
              <span class="cart-count"> {{ cartItem.count }} </span>
              <i class="fas fa-plus" @click="plusCount(cartItem)"></i>
            </div>
            <div class="remove-cart-item">
              <i class="far fa-trash-alt" @click="removeCartItem(cartItem)"></i>
            </div>
          </div>
        </li>
      </div>
      <div class="total-price">
        <span>總金額：</span> {{ total | commaFormat | priceFormat }}
        <button class="checkout">結帳</button>
      </div>
    </ul>
    <div class="no-cart-items bg-dark flex-content" v-else>
      <h1>您的購物車內沒有商品</h1>
      <router-link class="keep-shopping" :to="{ name: 'Product' }"
        >繼續購物</router-link
      >
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      cartItems: [],
    }
  },
  created() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    return this.cartItems
  },
  computed: {
    cartItemsInCart() {
      return (
        this.cartItems
          //只顯示數量大於0的
          .filter((cartItem) => cartItem.count > 0)
          .map((cartItem) => {
            cartItem.sum = cartItem.count * cartItem.price
            return cartItem
          })
      )
      // },
    },
    total() {
      return this.cartItemsInCart.reduce((sum, p) => sum + p.sum, 0)
    },
    hasCartItem() {
      return this.cartItems.length > 0
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
      cartItem.count++
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    minusCount(cartItem) {
      if (cartItem.count <= 1) return
      cartItem.count--
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    removeCartItem(cartItem) {
      if (!confirm('確定要移除嗎?')) return
      cartItem.count = 0
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
  },
}
</script>

<style lang="scss" scoped>
.cart-items {
  padding: 35px 70px;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    padding: 35px;
  }
  .cart-img {
    width: 150px;
    height: 150px;
    background-position: center 10%;
    background-size: cover;
  }
  .fas {
    cursor: pointer;
  }
  .cart-item {
    color: #fff;
    align-items: center;
    font-size: 1.2rem;
  }
  .cart-info {
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
  .cart-name {
    padding: 15px 0 25px;    
  }
  .cart-controller {
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
  .cart-price {   
    padding: 0 50px;
    font-size: 1.5rem;
    letter-spacing: 1.5px;
    @media screen and (max-width:768px){
      width: 100%;
    }
  }
  .cart-count {
    padding: 0 15px;
  }
  .cart-number {
    @media screen and (max-width: 768px) {
      padding: 15px 0 15px 50px;
      width: 100%;
    }
  }
  .remove-cart-item {
    padding: 0 25px;
    cursor: pointer;
    &:hover {
      color: rgb(212, 119, 42);
    }
    @media screen and (max-width: 768px) {
      padding: 0 85px;
      width: 100%;
    }
  }
  .total-price {
    position: sticky;
    top: 15px;
    left: 0;
    background-color: #fff;
    height: 175px;
    padding: 50px;
    font-size: 1.5rem;
    span {
      font-weight: 700;
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
  h1 {
    font-size: 2rem;
    width: 100%;
  }
  .keep-shopping {
    margin: 25px 0;
    padding: 15px 35px;
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
