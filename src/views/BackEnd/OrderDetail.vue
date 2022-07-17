<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="produt-info-container">
      <h1 class="main-title">
        訂單編號：
        <span>{{ orderId }}</span>
      </h1>
      <h4>
        訂單日期:
        {{ orderInfo.date }}
      </h4>
      <ul class="products">
        <div class="title flex-content">
          <span class="title-product">商品</span>
          <span class="title-count">數量</span>
          <span class="title-price">價格</span>
          <span class="title-subtotal-price">小計</span>
        </div>
        <template v-if="orderInfo.productInfos !== undefined">
          <li
            class="product flex-content"
            v-for="product in orderInfo.productInfos"
            :key="product.id"
          >
            <div class="product-info flex-content">
              <div
                class="product-img"
                :style="{
                  backgroundImage: `url(https://i.imgur.com/${product.imgSrc})`,
                }"
              ></div>
              <span class="product-name">
                {{ product.name }}
              </span>
            </div>
            <div class="product-count">
              {{ product.count }}
            </div>
            <div class="product-price">
              {{ product.price | commaFormat | priceFormat }}
            </div>
            <div class="product-subtotal">
              {{ product.sum | commaFormat | priceFormat }}
            </div>
          </li>
        </template>
      </ul>
      <div class="total-price">
        <span>總金額：</span> {{ total | commaFormat | priceFormat }}
      </div>
    </div>
    <div class="order-info-container">
      <div class="email border-bottom">
        <span class="form-text"> Email: </span>
        <span class="order-info"> {{ orderInfo.email }}</span>
      </div>
      <div class="name border-bottom">
        <span class="form-text"> 姓名: </span>
        <span class="order-info">
          {{ orderInfo.name }}
        </span>
      </div>
      <div class="phone-number border-bottom">
        <span class="form-text"> 電話: </span>
        <span class="order-info">
          {{ orderInfo.phoneNumber }}
        </span>
      </div>
      <div class="line-id border-bottom">
        <span class="form-text"> Line ID: </span>
        <span class="order-info">{{ orderInfo.lineId }}</span>
      </div>
      <div class="comment border-bottom">
        <span class="form-text"> 留言: </span>
        <p class="order-info">
          {{ orderInfo.comment }}
        </p>
      </div>
      <div class="payment-status border-bottom">
        <span class="form-text"> 付款狀態: </span>
        <span class="paid order-info" v-if="orderInfo.paymentStatus"
          >已付款</span
        >
        <span class="unpaid order-info" v-else>尚未付款</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      orderInfos: [],
      orderInfo: {
        email: '',
        name: '',
        phoneNumber: '',
        lineId: '',
        comment: '',
        paymentStatus: false,
        productInfos: [],
      },
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
  props: {
    orderId: String,
  },
  methods: {
    getOrder() {
      const getOrderInfoApi =
        'https://api.jsonbin.io/b/61b7760362ed886f915f62ee/latest' // request URL
      axios
        .get(getOrderInfoApi, this.axiosHeaders)
        .then((response) => {
          console.log('Get: ', response.data)

          this.orderInfos = response.data
          this.orderInfo = response.data.filter((order) => {
            return order.id === this.orderId
          })[0]
          this.isLoading = false
        })
        .catch((error) => console.log(error))
    },
    go(route) {
      this.$router.push({ name: route })
    },
  },
  created() {
    this.getOrder()
  },
  computed: {
    total() {
      return this.orderInfo.productInfos.reduce((sum, p) => sum + p.sum, 0)
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
}
</script>

<style lang="scss" scoped>
* {
  color: #fff;
}
.produt-info-container {
  width: 80%;
  margin: 25px auto 0;
  padding: 25px 0;
  border-bottom: 1px solid #aaa;
  @media screen and(max-width:768px) {
    width: 90%;
    margin: 0 auto;
  }
  .main-title {
    margin-bottom: 25px;
    span {
      display: inline-block;
      width: 30%;
      @media screen and(max-width:768px) {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
  h4 {
    margin-bottom: 50px;
    text-align: center;
    font-size: 1.4rem;
  }
  .title {
    margin-bottom: 25px;
    text-align: center;
    font-size: 1.4rem;
    border-bottom: 1px solid #aaa;
    padding-bottom: 20px;
    span {
      width: 25%;
    }
  }
  .product {
    margin: 0 auto 20px;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #aaa;
    font-size: 1.2rem;
    div {
      width: 25%;
      text-align: center;
    }
    .product-info {
      align-items: center;
    }
    .product-img {
      width: 45% !important;
      height: 100px;
      background-size: cover;
      background-position: center 5%;
      margin: 0 auto;
    }
    .product-name {
      width: 45%;
      //#00d812
    }
  }
  .total-price {
    font-size: 1.4rem;
    text-align: right;
  }
}
.order-info-container {
  width: 50%;
  font-size: 1.2rem;
  margin: 35px auto;
  @media screen and (max-width: 768px) {
    width: 75%;
  }

  .border-bottom {
    border-bottom: 1px solid #aaa;
  }
  .order-info {
    display: inline-block;
    //  width: 80%;
    padding: 10px;
    margin: 10px 0;
    padding-right: 20px;
    font-size: 1.2rem;
    background-color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:last-child {
      overflow: initial;
      text-overflow: initial;
      white-space: initial;
    }
  }
  .error-text {
    color: lighten(#ff4444, 5%);
    font-size: 0.8rem;
    text-align: right;
    display: block;
    width: 80%;
    margin-top: 10px;
  }
  .unpaid {
    color: #ff4444;
  }
  .paid {
    color: #00d812;
  }
  .btn-container {
    margin: 25px auto;
    width: 80%;
    justify-content: center;
  }
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
  .shopping {
    background-color: #aaa;
    &:hover {
      background-color: #bbb;
    }
  }
}
</style>
