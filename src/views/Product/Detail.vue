<template>
  <div>
    <Header />
    <main>
      <section class="product-detail">
        <div class="flex-content container">
          <div
            class="product-img"
            :style="{ backgroundImage: `url(${$store.state.products[id - 1].imgSrc})` }"
          ></div>
          <div class="product-description">
            <h1>【熱銷】{{ $store.state.products[id - 1].name }}</h1>
            <h3>
              球隊： {{ $store.state.products[id - 1].team }} 位置：
              {{ $store.state.products[id - 1].position }}
            </h3>
            <p>
              {{ $store.state.products[id - 1].description }}
            </p>
            <div class="price flex-content">
              <del
                >原價 $
                {{
                  $store.state.products[id - 1].originPrice | commaFormat | priceFormat
                }}</del
              >
              <span class="price-no"
                >優惠價 $
                {{ $store.state.products[id - 1].price | commaFormat | priceFormat }}</span
              >
            </div>
            <div class="product-info">
              <h3>您可獲得的技術有：</h3>
              <p v-for="skill in $store.state.products[id - 1].skills" :key="skill">
                {{ skill }}
              </p>
              <div class="flex-content jc-sb">
                <div class="product-amount flex-content">
                  <div
                    class="bg-round flex-content"
                    @click="minusCount($store.state.products[id - 1])"
                  >
                    <i class="fas fa-minus"></i>
                  </div>
                  <span>{{ $store.state.products[id - 1].countShow }}</span>
                  <div
                    class="bg-round flex-content"
                    @click="plusCount($store.state.products[id - 1])"
                  >
                    <i class="fas fa-plus"></i>
                  </div>
                </div>
                <button class="buy-now" @click="addToCart($store.state.products[id - 1])">
                  立即購買
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="shopping-instruction">
        <div class="container">
          <h3 class="shopping-instruction-title">購物說明</h3>
          <p>
            若您具有法人身份為常態性且大量購買者，或有特殊作業需求，建議您可洽詢「企業採購」。
          </p>
          <h3 class="returning-instruction-title">退換貨說明</h3>
          <p>
            會員所購買的商品均享有到貨十天的猶豫期（含例假日）。退回之商品必須於猶豫期內寄回。
            <br />
            辦理退換貨時，商品必須是全新狀態與完整包裝(請注意保持商品本體、
            配件、贈品、保證書、
            原廠包裝及所有附隨文件或資料的完整性，切勿缺漏任何配件或損毀原廠外盒)。
            <br />
            退回商品無法回復原狀者，恐將影響退貨權益或需負擔部分費用。
            <br />
            訂購本商品前請務必詳閱商品退換貨原則。
          </p>
        </div>
      </section>
      <section class="reccommendation ">
        <div class="container">
          <h3>其他人也看了...</h3>
          <div class="reccommends">
            <router-link
              class="reccommend card"
              v-for="reccommend in reccommends"
              :key="reccommend.id"
              :to="{
                name: 'Product-Detail',
                params: { id: reccommend.id },
              }"
            >
              <div
                class="card-top-img"
                :style="{ backgroundImage: `url(${reccommend.imgSrc})` }"
              ></div>
              <div class="card-content">
                {{ reccommend.name }}
                <p>
                  <del
                    >原價
                    {{ reccommend.price | commaFormat | priceFormat }}</del
                  >
                  NT {{ reccommend.originPrice | commaFormat | priceFormat }}
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'

export default {
  props: ['id'],
  components: { Header, Footer },
  data() {
    return {          
      reccommends: [],
      cartItems: [],
      isShow: false,
    }
  },
  created() {
    if (this.id <= 10)
      this.reccommends = this.$store.state.products.filter(
        (product) => product.position === 'guard'
      )
    if (this.id > 10 && this.id <= 20)
      this.reccommends = this.$store.state.products.filter(
        (product) => product.position === 'foward'
      )
    if (this.id > 20)
      this.reccommends = this.$store.state.products.filter(
        (product) => product.position === 'center'
      )
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    return this.cartItems
  },
  watch: {
    $route(to, from) {
      this.$router.go(0)
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
    addToCart(product) {
      let isNew = true
      if (this.cartItems == null) this.cartItems.push(product)

      this.cartItems.forEach((cartItem) => {
        if (product.id === cartItem.id) {
          //檢查購物車裡有無此項商品
          isNew = false
          cartItem.count += product.countShow
        }
      })

      if (isNew) {
        product.count++
        this.cartItems.push(product)
      } //將新的商品新增到購物車裡

      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))

      this.$toastr.s('此商品已加入購物車', 'SKILL')
    },
    plusCount(product) {
      ++product.countShow
    },
    minusCount(product) {
      if (product.countShow <= 1) return
      product.countShow--
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1080px;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  color: #fff;
  padding: 0 35px;
}
.product-detail {
  padding: 35px 0;
  background-color: #000;

  @media screen and (max-width: 768px) {
    padding: 0;
  }

  .container {
    @media screen and (max-width: 768px) {
      flex-direction: column;
      padding: 0;
    }
  }
  .product-img {
    width: 40%;
    height: 500px;
    background-position: center 10%;
    background-size: cover;

    @media screen and (max-width: 768px) {
      width: 100%;
      height: 350px;
    }
  }
  .product-description {
    width: 50%;
    text-align: center;

    @media screen and (max-width: 768px) {
      padding-top: 25px;
      width: 100%;
    }
  }
  h3 {
    font-size: 1.6rem;
    margin: 15px 0;
    text-transform: capitalize;
    letter-spacing: 1.5px;
  }
  p {
    text-align: left;
    letter-spacing: 1px;
    line-height: 1.5;
  }
  .price {
    justify-content: space-evenly;
    padding: 35px 0;
    border-bottom: 1px solid #fff;
  }
  .price-no {
    color: rgb(212, 119, 42);
    font-size: 2rem;
    font-weight: 700;

    @media screen and (max-width: 768px) {
      padding-top: 15px;
    }
  }
  .product-info {
    padding: 30px 0;
    text-align: left;
    align-items: center;

    h3 {
      font-size: 1.6rem;
    }
    p {
      padding-top: 10px;
      font-size: 1.2rem;
    }
    span {
      padding: 15px;
      display: block;
      font-size: 1.5rem;
    }
    .fas {
      color: #fff;
      font-size: 1.2rem;
      position: relative;
      z-index: 1;
      margin: 5px;
    }
    .bg-round {
      border: #fff 2px solid;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      margin: 10px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: #fff;
      }
      &:hover > .fas {
        color: #000;
      }
    }
    .jc-sb {
      justify-content: space-between;

      @media screen and (max-width: 768px) {
        justify-content: center;
      }
    }
    .product-amount {
      @media screen and (max-width: 768px) {
        width: 100%;
        justify-content: center;
        padding: 10px 0;
      }
    }
    .buy-now {
      padding: 5px 20px 10px;
      border: 1px solid #fff;
      color: #fff;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      background-color: #000;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: #fff;
        color: #000;
      }
    }
  }
}
.shopping-instruction {
  background-color: #000;
  color: #fff;
  line-height: 1.5;
  padding: 25px 0;

  .shopping-instruction-title,
  .returning-instruction-title {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .shopping-instruction-title {
    color: rgb(212, 119, 42);
  }
  .returning-instruction-title {
    margin-top: 25px;
  }
  p {
    line-height: 2;
  }
}

.reccommendation {
  background-color: #000;
  padding-bottom: 35px;
  overflow: hidden;

  h3 {
    color: rgb(212, 119, 42);
    font-size: 1.6rem;
    margin: 15px 0;
    font-weight: 700;
    letter-spacing: 1.5px;
  }
  .container {
    padding: 35px;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }
  .reccommends {
    overflow-x: scroll;
    overflow-y: hidden;
    margin: auto;
    white-space: nowrap;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .card {
    width: 300px;
    height: 350px;
    padding: 0 20px;
    display: inline-block;

    @media screen and (max-width: 768px) {
      display: block;
      margin-bottom: 25px;
      padding: 35px 20px;
      margin: 0 auto;
    }
  }
  .card-top-img {
    height: 100%;
    background-position: center 15%;
    background-size: cover;
  }
  .card-content {
    color: #fff;
    text-align: center;
    line-height: 1.5;
    font-size: 1.2rem;
  }
  del {
    font-size: 0.8em;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
