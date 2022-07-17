<template>
  <div class="bg-dark">
    <Loading :active.sync="isLoading"></Loading>
    <Header />
    <div class="container">
      <ul class="bills">
        <li
          class="bill"
          v-for="orderInfo in currentPageOrders"
          :key="orderInfo.id"
        >
          <ul class="bill-titles flex-content">
            <li
              class="title"
              :class="{ active: isActiveAll }"
              @click="swapCategory('all')"
            >
              全部訂單
              <div class="bottom-line" :class="{ active: isActiveAll }"></div>
            </li>
            <li
              class="title"
              :class="{ active: isActivePaid }"
              @click="swapCategory('paid')"
            >
              已付款
              <div class="bottom-line" :class="{ active: isActivePaid }"></div>
            </li>
            <li
              class="title"
              :class="{ active: isActiveUnpaid }"
              @click="swapCategory('unpaid')"
            >
              未付款
              <div
                class="bottom-line"
                :class="{ active: isActiveUnpaid }"
              ></div>
            </li>
          </ul>
          <div class="produt-info-container">
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
              <span>總金額：</span>
              {{ orderInfo.total | commaFormat | priceFormat }}
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
              <span class="unpaid order-info" v-else>尚未付款 </span>
            </div>
          </div>
          <div class="btn-container">
            <button
              class="btn pay-now"
              v-if="!orderInfo.paymentStatus"
              @click="payNow(orderInfo.id)"
            >
              立即付款
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div class="center">
      <Paginate
        @updatePage="filterByPageNum"
        :rowsPerPage="rowsPerPage"
        :pageCount="pageCount"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Paginate from '../components/Pagination.vue'
import axios from 'axios'
export default {
  components: {
    Header,
    Footer,
    Paginate,
  },
  data() {
    return {
      allOrderInfos: [],
      axiosHeaders: {
        headers: {
          'secret-key':
            '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam',
        },
        'Content-Type': 'application/json',
      },
      isLoading: true,
      isActiveAll: true,
      isActivePaid: false,
      isActiveUnpaid: false,
      rowsPerPage: 5,
      currentPageOrders: [],
      isShowDetail: false,
    }
  },
  methods: {
    getOrder() {
      const getOrderInfoApi =
        'https://api.jsonbin.io/b/61b7760362ed886f915f62ee/latest' // request URL
      axios.get(getOrderInfoApi, this.axiosHeaders).then((response) => {
        console.log('Get: ', response.data)

        this.allOrderInfos = response.data
        this.allOrderInfos.map(
          (order) =>
            (order.total = order.productInfos.reduce(
              (sum, p) => sum + p.sum,
              0
            ))
        )
        this.allOrderInfos.sort(
          (current, next) => new Date(current.date) - new Date(next.date)
        )
        this.filterByPageNum(1)
        this.isLoading = false
      })
      // .catch((error) => console.log(error))
    },
    go(route) {
      this.$router.push({ name: route })
    },
    swapCategory(category) {
      switch (category) {
        case 'all':
          this.isActiveAll = true
          this.isActivePaid = false
          this.isActiveUnpaid = false
          this.currentPageOrders = this.allOrderInfos
          break
        case 'paid':
          this.isActivePaid = true
          this.isActiveAll = false
          this.isActiveUnpaid = false
          this.currentPageOrders = this.allOrderInfos.filter(
            (order) => order.paymentStatus
          )
          break
        case 'unpaid':
          this.isActiveUnpaid = true
          this.isActiveAll = false
          this.isActivePaid = false
          this.currentPageOrders = this.allOrderInfos.filter(
            (order) => !order.paymentStatus
          )
          break
      }
    },
    filterByPageNum(page) {
      //console.log(this.allProducts)
      this.currentPageOrders = this.allOrderInfos.slice(
        this.rowsPerPage * (page - 1),
        this.rowsPerPage * page
      )
      window.scrollTo(0, 0)
      // console.log(this.currentPageProducts)
    },
    payNow(id) {
      const orderInfo = this.currentPageOrders.filter(
        (order) => order.id === id
      )[0]
      orderInfo.paymentStatus = true
      const updateOrderInfoApi =
        'https://api.jsonbin.io/b/61b7760362ed886f915f62ee' // request URL
      this.allOrderInfos = this.allOrderInfos.filter((order) => order.id !== id)

      this.allOrderInfos.push(orderInfo)
      console.log(this.allOrderInfos)
      axios
        .put(updateOrderInfoApi, this.allOrderInfos, this.axiosHeaders)
        .then((response) => {
          console.log('Create: ', response.data)
          this.$toastr.Add({
            title: 'SKILL',
            msg: '成功付款',
            position: 'toast-top-center',
          })
          this.$router.go(0)
        })
        .catch((error) => console.log(error))
    },
  },
  created() {
    this.getOrder()
  },
  computed: {
    pageCount() {
      return Math.ceil(this.allOrderInfos.length / this.rowsPerPage)
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
.bg-white {
  background-color: #fff;
}
.container {
  padding-top: 110px;
  color: #fff;
}
.bill {
  &:not(:first-child) .title {
    display: none;
  }
}
.bill-titles {
  justify-content: center;

  .title {
    font-size: 1.2rem;
    padding: 25px;
    color: #aaa;
    transition: 0.3s;
    cursor: pointer;
    position: relative;

    &:hover {
      color: #fff;
    }
    &:hover > .bottom-line {
      width: 75px;
    }
    .bottom-line {
      width: 0px;
      height: 1.2px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      background-color: #fff;
      transition: 0.3s;
    }
    .active {
      width: 75px;
    }
  }
  .active {
    color: #fff;
  }
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
      flex-wrap: wrap;
    }
    .product-img {
      width: 45%;
      height: 100px;
      background-size: cover;
      background-position: center 5%;
      margin: 0 auto;
      @media screen and(max-width:768px) {
        width: 80%;
        margin-bottom: 5px;
      }
    }
    .product-name {
      width: 45%;
      @media screen and(max-width:768px) {
        width: 100%;
      }
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
}
.btn-container {
  margin: 25px auto;
  width: 80%;
  justify-content: center;
  text-align: center;

  .btn {
    padding: 10px 20px;
    margin: 0 20px;
    background-color: rgb(212, 119, 42);
    color: #fff;
    font-size: 1.1rem;
    border-radius: 5px;
    border: none;

    &:hover {
      background-color: darken(rgb(212, 119, 42), 5%);
    }
  }
}
.center {
  width: 80%;
  margin: 0 auto;
}
</style>
