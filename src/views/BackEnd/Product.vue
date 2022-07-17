<template>
  <div>
    <!-- <Header /> -->
    <Loading :active.sync="isLoading"></Loading>

    <!-- <back-end-navigation /> -->
    <section class="product-management bg-dark">
      <div class="title-container flex-content">
        <h1 class="main-title">Product</h1>
        <button class="btn create-product" @click="goToCreate">新增商品</button>
      </div>
      <ul class="products flex-content">
        <li
          class="product flex-content"
          v-for="product in currentPageProducts"
          :key="product.id"
        >
          <div class="title flex-content">
            <span class="title-img">縮圖</span>
            <span class="title-name">名稱</span>
            <span class="title-number">號碼</span>
            <span class="title-team">球隊</span>
            <span class="title-price">價格</span>
            <span class="title-is-hot-sell">熱銷</span>
            <span class="title-is-new">新品</span>
            <span class="title-handler">操作</span>
          </div>
          <div class="info flex-content">
            <span class="img">
              <img
                :src="`https://i.imgur.com/${product.imgSrc}`"
                :alt="product.name"
              />
            </span>
            <span class="name">
              {{ product.name }}
            </span>
            <span class="number">
              {{ product.no }}
            </span>
            <span class="team">
              {{ product.team }}
            </span>
            <span class="price">
              {{ product.price }}
            </span>
            <span class="is-hot-sell" v-if="product.isHotSell">
              是
            </span>
            <span class="is-hot-sell" v-else>
              否
            </span>
            <span class="is-new" v-if="product.isNew">
              是
            </span>
            <span class="is-new" v-else>
              否
            </span>
            <span class="handler">
              <button class="btn edit" @click="goToEdit(product.id)">
                編輯
              </button>
              <button class="btn delete" @click="toggleModal(product.id, true)">
                刪除
              </button>
            </span>
          </div>
          <Modal v-if="product.isShowModal">
            <template v-slot:header>
              <h3 class="modal-header flex-content">
                <span>刪除商品</span>
                <i
                  class="fas fa-times"
                  @click="toggleModal(product.id, false)"
                ></i>
              </h3>
            </template>
            <div class="modal-content">
              確認刪除{{ product.name }} 這項商品?
            </div>
            <template v-slot:footer>
              <div class="modal-footer flex-content">
                <button class="btn confirm" @click="removeProduct(product.id)">
                  確認
                </button>
                <button
                  class="btn cancel"
                  @click="toggleModal(product.id, false)"
                >
                  取消
                </button>
              </div>
            </template>
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
import BackEndNavigation from '../../components/BackEndNavigation.vue'
import Paginate from '../../components/Pagination.vue'
import Modal from '../../components/Modal.vue'
import axios from 'axios'
export default {
  data() {
    return {
      rowsPerPage: 5,
      allProducts: [],
      currentPageProducts: [],
      isLoading: true,
      currentPage: 0,
    }
  },
  methods: {
    goToEdit(id) {
      this.$router.push({ name: 'BackEndProductEdit', params: { editId: id } })
    },
    goToCreate() {
      this.$router.push({ name: 'BackEndProductCreate' })
    },

    filterByPageNum(page, isModal = false) {
      //console.log(this.allProducts)
      this.currentPageProducts = this.allProducts.slice(
        this.rowsPerPage * (page - 1),
        this.rowsPerPage * page
      )
      if (!isModal) window.scrollTo(0, 0)
      this.currentPage = page
      console.log(this.currentPageProducts)
    },
    getProductInfo() {
      const getProductInfo =
        'https://api.jsonbin.io/b/615b3544aa02be1d4453fd5a/latest' // request URL
      const token =
        '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam' // access token
      const axiosHeaders = {
        headers: { 'secret-key': token },
        versioning: false,
      }
      this.isLoading = true
      axios.get(getProductInfo, axiosHeaders).then((response) => {
        console.log('BackEnd: ', response.data)
        this.allProducts = response.data
        this.allProducts.map((product) => (product.isShowModal = false))
        this.filterByPageNum(1)
        this.isLoading = false
      })
      // this.$store.dispatch('loadProductData')
    },
    removeProduct(id) {
      console.log(id)
      const productInfoApi =
        'https://api.jsonbin.io/b/615b3544aa02be1d4453fd5a/'
      const token =
        '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam' // access token
      const axiosHeaders = {
        headers: { 'secret-key': token },
        versioning: false,
      }
      const products = this.allProducts.filter((product) => {
        return product.id !== id
      })
      console.log(products)
      axios
        .put(productInfoApi, products, axiosHeaders)
        .then((response) => {
          console.log('BackEndProduct: ', response.data)
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
      this.currentPageProducts.map((product) => {
        if (id === product.id) {
          product.isShowModal = isShowModal
          // product.name = isShowModal
          //console.log(this.currentPageProducts)
        }
        // console.log(product.isShowModal)
      })
      this.filterByPageNum(this.currentPage, true)
      //this.isShowModal = !this.isShowModal
    },
  },
  components: { BackEndNavigation, Paginate, Modal },
  computed: {
    pageCount() {
      return Math.ceil(this.allProducts.length / this.rowsPerPage)
    },
  },
  created() {
    //console.log(this.products)
    this.getProductInfo()
  },
}
</script>

<style lang="scss" scoped>
.product-management {
  width: 100%;
  color: #fff;
  padding: 20px 50px;
  padding-top: 50px;
  .title-container {
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
}

.product {
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
  &:not(:first-child) > .title {
    display: none;
  }
  @media screen and (max-width: 768px) {
    &:not(:first-child) > .title {
      display: flex;
    }
    width: 100%;
    align-items: initial;
  }

  .title {
    margin-bottom: 20px;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      width: 40%;
      height: 600px;
    }
    span {
      width: calc(100% / 8);
      padding: 0 15px;
      font-size: 1.2rem;
      @media screen and (max-width: 768px) {
        width: 100%;
        height: calc(100% / 12);
        display: block;
        margin-bottom: 5px;
        &:first-child {
          display: none;
        }
        &:nth-of-type(2) {
          margin-top: 208px;
        }
      }
    }
  }
  .info {
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      width: 60%;
      height: 600px;
      align-items: initial;
    }
    span {
      width: calc(100% / 8);
      padding: 0 15px;
      @media screen and (max-width: 768px) {
        width: 100%;
        padding: 0 15px;
        height: calc(100% / 12);
        display: block;
        margin-bottom: 5px;
        &:first-child {
          width: 150px;
          height: initial;
          margin-bottom: 20px;
          transform: translateX(-30%);
        }
      }
    }
    img {
      width: 100%;
      min-width: 60px;
      @media screen and (max-width: 768px) {
        min-width: 0;
        // width: initial;
        height: 100%;
      }
    }
  }
}
.btn {
  color: #fff;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 5px 10px;
  margin-bottom: 10px;
  margin-left: 15px;
  font-size: 1rem;
  border-radius: 5px;
}
.create-product {
  border-color: #999;
  padding: 10px 15px;
  display: block;
  font-size: 1.2rem;
  margin-left: 35px;
  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
  }
  &:hover {
    background-color: #999;
  }
}
.edit {
  border-color: #4285f4;
  &:hover {
    background-color: #4285f4;
  }
}
.delete {
  border-color: #ff4444;
  &:hover {
    background-color: #ff4444;
  }
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
