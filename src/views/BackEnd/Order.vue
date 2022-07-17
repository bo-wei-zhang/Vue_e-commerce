<template>
  <div v-if="!isLoading">
    <Loading :active.sync="isLoading"></Loading>
    <!-- <back-end-navigation /> -->
    <section class="order-management bg-dark">
      <h1 class="main-title">Order</h1>
      <ul class="orders">
        <div class="title flex-content">
          <span class="title-id">訂單編號</span>
          <span class="title-date">購買日期</span>
          <span class="title-is-paid">是否付款</span>
          <span class="title-handler">操作</span>
        </div>
        <li
          class="order flex-content"
          v-for="order in currentPageOrders"
          :key="order.id"
        >
          <span class="id" :title="order.id">
            {{ order.id }}
          </span>
          <span class="date">
            {{ order.date }}
          </span>
          <span class="is-paid paid" v-if="order.paymentStatus">已付款</span>
          <span class="is-paid unpaid" v-else>未付款</span>
          <span class="handler">
            <button class="check" @click="goToDetail(order.id)">查看</button>
            <button class="delete" @click="toggleModal(order.id, true)">
              刪除
            </button>
          </span>
          <Modal v-if="order.isShowModal">
            <template v-slot:header>
              <h3 class="modal-header flex-content">
                刪除訂單
                <i
                  class="fas fa-times"
                  @click="toggleModal(order.id, false)"
                ></i>
              </h3>
            </template>
            <div class="modal-content">確認刪除{{ order.id }} 這筆訂單?</div>

            <div slot="footer" class="modal-footer flex-content">
              <button class="btn confirm" @click="removeOrder(order.id)">
                確認
              </button>
              <button class="btn cancel" @click="toggleModal(order.id, false)">
                取消
              </button>
            </div>
          </Modal>
        </li>
      </ul>
      <Paginate
        @updatePage="filterByPageNum"
        :rowsPerPage="rowsPerPage"
        :pageCount="pageCount"
      />
    </section>
  </div>
</template>

<script>
import Paginate from '../../components/Pagination.vue'
import Modal from '../../components/Modal.vue'
import axios from 'axios'
export default {
  components: { Paginate, Modal },
  data() {
    return {
      orderInfo: {
        email: 'test@gmail.com',
        name: 'test',
        phoneNumber: '0912345678',
        lineId: 'test123',
        comment: '留言測試...',
        paymentStatus: false,
      },
      axiosHeaders: {
        headers: {
          'secret-key':
            '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam',
        },
        'Content-Type': 'application/json',
      },
      rowsPerPage: 5,
      allOrders: [],
      currentPageOrders: [],
      isLoading: true,
      currentPage: 0,
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
          this.allOrders = response.data
          this.allOrders.map((order) => (order.isShowModal = false))
          this.filterByPageNum(1)
          this.isLoading = false
        })
        .catch((error) => console.log(error))
    },
    filterByPageNum(page, isModal = false) {
      //console.log(this.allProducts)
      this.allOrders.sort(
        (current, next) => new Date(current.date) - new Date(next.date)
      )
      console.log(this.allOrders)

      this.currentPageOrders = this.allOrders.slice(
        this.rowsPerPage * (page - 1),
        this.rowsPerPage * page
      )
      if (!isModal) window.scrollTo(0, 0)
      this.currentPage = page
      console.log(this.currentPageOrders)
    },
    goToDetail(id) {
      this.$router.push({
        name: 'BackEndOrderDetail',
        params: {
          orderId: id,
        },
      })
    },
    removeOrder(id) {
      const orderInfoApi = 'https://api.jsonbin.io/b/61b7760362ed886f915f62ee/'
      const token =
        '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam' // access token
      const axiosHeaders = {
        headers: { 'secret-key': token },
        versioning: false,
      }
      const orders = this.allOrders.filter((order) => {
        return order.id !== id
      })
      console.log(orders)
      axios
        .put(orderInfoApi, orders, axiosHeaders)
        .then((response) => {
          console.log('BackEndOrder: ', response.data)
          this.$toastr.Add({
            title: 'SKILL',
            msg: '刪除成功！',
            position: 'toast-top-center',
          })
        })
        .then(() => {
          this.$router.go(0)
        })
    },
    toggleModal(id, isShowModal) {
      // console.log('toggle', isShowModal)
      this.currentPageOrders.map((order) => {
        if (id === order.id) {
          order.isShowModal = isShowModal
          // product.name = isShowModal
          //console.log(this.currentPageProducts)
        }
        // console.log(product.isShowModal)
      })
      this.filterByPageNum(this.currentPage, true)
      //this.isShowModal = !this.isShowModal
    },
  },
  created() {
    this.getOrder()
  },

  computed: {
    pageCount() {
      return Math.ceil(this.allOrders.length / this.rowsPerPage)
    },
  },
}
</script>

<style lang="scss" scoped>
.order-management {
  width: 100%;
  color: #fff;
  padding: 50px 50px 20px;
  .main-title {
    margin-bottom: 50px;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0;
  }
}
.title {
  margin-bottom: 20px;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  span {
    width: 23%;
    padding: 0 15px;
    font-size: 1.2rem;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
      width: 20%;
      padding: 0;
    }
  }
}
.order {
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
  span {
    width: calc(100% / 4);
    padding: 0 15px;
    @media screen and (max-width: 768px) {
      font-size: 1rem;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      &:last-child {
        overflow: initial;
        text-overflow: initial;
        white-space: initial;
      }
    }
  }
  img {
    width: 100%;
  }
}
.check {
  color: #fff;
  background-color: transparent;
  border: 1px solid #4285f4;
  padding: 5px 10px;
  margin-bottom: 5px;
  margin-left: 15px;
  font-size: 1rem;
  border-radius: 5px;
  &:hover {
    background-color: #4285f4;
  }
}
.delete {
  color: #fff;
  background-color: transparent;
  border: 1px solid #ff4444;
  padding: 5px 10px;
  margin-left: 15px;
  font-size: 1rem;
  border-radius: 5px;
  &:hover {
    background-color: #ff4444;
  }
}
.unpaid {
  color: #ff4444;
}
.paid {
  color: #00d812;
}
.modal-content {
  border-bottom: 1px solid #000;
  padding: 15px 5px;
}
.modal-header {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 20px;
  padding: 5px;
  border-bottom: 1px solid #000;
}

.modal-footer {
  padding: 15px 5px;
  padding-bottom: 0;
  justify-content: end;
}
.btn {
  color: #fff;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 5px 10px;
  margin-left: 15px;
  font-size: 1rem;
  border-radius: 5px;
}
.confirm {
  color: #ff4444;
  border-color: #ff4444;
  &:hover {
    background-color: #ff4444;
    color: #fff;
  }
}
.cancel {
  border-color: #888;
  color: #888;
  &:hover {
    background-color: #888;
    color: #fff;
  }
}
.fa-times {
  transition: 0.3s;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #aaa;
  cursor: pointer;
  &:hover {
    color: #000;
  }
}
</style>
