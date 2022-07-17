<template>
  <div>
    <div class="order-info-container" @submit.prevent="createOrder">
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
        <span class="order-info" v-if="orderInfo.paymentStatus">已付款</span>
        <span class="unpaid order-info" v-else>尚未付款</span>
      </div>
      <div class="btn-container flex-content">
        <button class="btn shopping" @click="go('Product')">繼續購物</button>
        <button class="btn pay-now" @click="payNow">立即付款</button>
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
      },
      axiosHeaders: {
        headers: {
          'secret-key':
            '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam',
        },
        'Content-Type': 'application/json',
      },
    }
  },
  methods: {
    getOrder() {
      const getOrderInfoApi =
        'https://api.jsonbin.io/b/61b7760362ed886f915f62ee/latest' // request URL
      axios
        .get(getOrderInfoApi, this.axiosHeaders)
        .then((response) => {
          console.log('Get: ', response.data)
          this.orderInfo = response.data[response.data.length - 1]
          this.orderInfos = response.data
        })
        .catch((error) => console.log(error))
    },
    go(route) {
      this.$router.push({ name: route })
    },
    payNow() {
      this.orderInfo.paymentStatus = true
      const updateOrderInfoApi =
        'https://api.jsonbin.io/b/61b7760362ed886f915f62ee' // request URL
      this.orderInfos.pop()
      this.orderInfos.push(this.orderInfo)
      console.log(this.orderInfos)
      axios
        .put(updateOrderInfoApi, this.orderInfos, this.axiosHeaders)
        .then((response) => {
          console.log('Create: ', response.data)
          this.$toastr.Add({
            title: 'SKILL',
            msg: '成功付款',
            position: 'toast-top-center',
          })
        })
        .then(() => {
          this.$router.push({ name: 'Home' })
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
* {
  color: #fff;
}

.order-info-container {
  width: 55%;
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
