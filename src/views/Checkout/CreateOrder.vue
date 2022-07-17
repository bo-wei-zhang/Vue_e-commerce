<template>
  <div>
    <form class="info-form" @submit.prevent="createOrder">
      <div class="email">
        <span class="form-text"> Email: </span>
        <input
          class="form-input"
          type="text"
          required
          v-model="orderInfo.email"
        />
        <span class="error-text" v-if="isEmailError">請輸入正確的E-mail</span>
      </div>
      <div class="name">
        <span class="form-text"> 姓名: </span>
        <input
          class="form-input"
          type="text"
          required
          v-model="orderInfo.name"
        />
      </div>
      <div class="phone-number">
        <span class="form-text"> 電話: </span>
        <input
          class="form-input"
          type="tel"
          required
          v-model="orderInfo.phoneNumber"
        />
        <span class="error-text" v-if="isPhoneNumberError"
          >請輸入正確的電話號碼</span
        >
      </div>
      <div class="line-id">
        <span class="form-text"> Line ID: </span>
        <input
          class="form-input"
          type="text"
          required
          v-model="orderInfo.lineId"
        />
      </div>
      <div class="comment">
        <span class="form-text"> 留言: </span>
        <textarea
          class="form-input"
          cols="30"
          rows="5"
          v-model="orderInfo.comment"
          required
        >
        </textarea>
      </div>
      <!-- <div class="payment-status">
        <span class="form-text"> 付款狀態: </span>
        <label for="payment-status" v-if="paymentStatus">是</label>
        <label for="payment-status" v-else>否</label>
        <input id="payment-status" class="form-input" type="checkbox" />
      </div> -->
      <div class="btn-container" v-if="isInCreateOrderPage">
        <router-link class="btn back" :to="{ name: 'Checkout' }"
          >上一步</router-link
        >
        <input class="btn create-order" type="submit" value="完成訂單" />
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      orderInfos: [],
      orderInfo: {
        email: 'test@gmail.com',
        name: 'test',
        phoneNumber: '0912345678',
        lineId: 'test123',
        comment: '留言測試...',
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
      isEmailError: false,
      isPhoneNumberError: false,
    }
  },
  computed: {
    isInCreateOrderPage() {
      return this.$route.name == 'CreateOrder'
    },
    cartItems() {
      return this.$store.getters.cartItems
    },
  },
  watch: {
    'orderInfo.email': {
      handler(newVal, oldVal) {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
        // if (reg.test(newVal)) this.product.no = newVal
        // else this.product.no = oldVal
        if (!reg.test(newVal)) this.isEmailError = true
        else this.isEmailError = false
        // console.log(oldVal, newVal)
      },
    },
    'orderInfo.phoneNumber': {
      handler(newVal, oldVal) {
        const reg = /^09[0-9]{8}$/
        // if (reg.test(newVal)) this.product.no = newVal
        // else this.product.no = oldVal
        if (!reg.test(newVal)) this.isPhoneNumberError = true
        else this.isPhoneNumberError = false
        //  console.log(oldVal, newVal)
      },
    },
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
        })
        .catch((error) => console.log(error))
    },

    createOrder() {
      function uid(length) {
        return Number(
          Math.random()
            .toString()
            .substr(2, length) + Date.now()
        ).toString(36)
      }
      const id = uid(20)
      const date = new Date().toLocaleDateString()
      console.log(date)
      const updateOrderInfoApi =
        'https://api.jsonbin.io/b/61b7760362ed886f915f62ee' // request URL

      this.orderInfo.id = id
      this.orderInfo.date = date
      this.orderInfo.productInfos = this.cartItems
      //  console.log(this.orderInfo)
      let productIds = []
      this.orderInfo.productInfos.map((info) => productIds.push(info.id))
      if (this.isEmailError || this.isPhoneNumberError)
        return alert('請輸入正確格式！')
      this.orderInfos.push(this.orderInfo)

      console.log(this.orderInfos)
      //console.log(productIds)
      axios
        .put(updateOrderInfoApi, this.orderInfos, this.axiosHeaders)
        .then((response) => {
          console.log('Create: ', response.data)
          this.$store.dispatch('removeCartItem', {
            ids: productIds,
            isSystem: true,
          })
          // sessionStorage.removeItem('cartItems')
          this.$toastr.Add({
            title: 'SKILL',
            msg: '訂單已成立！',
            position: 'toast-top-center',
          })
        })
        .then(() => {
          this.$router.push({ name: 'FinishOrder' })
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

.info-form {
  width: 35%;
  font-size: 1.2rem;
  margin: 35px auto;

  @media screen and (max-width: 768px) {
    width: 75%;    
  }

  .form-text {
    margin: 10px 0;
    display: block;
  }
  .form-input {
    display: block;
    width: 80%;
    padding: 10px;
    padding-right: 20px;
    font-size: 1.2rem;
    background-color: #333;
    outline: none;
    border: 1px solid #fff;
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
  .btn-container {
    text-align: right;
    margin: 25px 0;
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
}
</style>
