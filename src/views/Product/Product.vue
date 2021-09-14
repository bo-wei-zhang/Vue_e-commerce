<template>
  <div>
    <Header />
    <!-- {{ $store.state.productsInCart }} -->
    <section class="product-list flex-content">
      <div class="side-nav">
        <ul class="navs flex-content">
          <li
            @click="swapCategory(category.title)"
            v-for="category in categories"
            :key="category.title"
            class="nav"
            :class="{ active: category.isActive }"
          >
            {{ category.title }}
          </li>
        </ul>
      </div>
      <div class=" container flex-content">
        <router-link
          v-for="product in $store.state.products"
          :key="product.id"
          :to="{
            name: 'Product-Detail',
            params: { id: product.id },
          }"
          class="card"
        >
          <!-- params can pass data to next route -->
          <div
            class="card-top-img"
            :style="{ backgroundImage: `url(${product.imgSrc})` }"
          ></div>
          <div class="card-content">
            {{ product.name }}
            <p class="flex-content">
              <router-link
                class="add-cart"
                to=""
                @click.native="addToCart(product)"
              >
                <i class="fas fa-cart-plus"></i>
              </router-link>
              <span class="originPrice">
                <del>原價 $ {{product.originPrice}}</del>
                <br />
                NT $ {{product.price}}
              </span>
            </p>
          </div>
        </router-link>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'

export default {
  components: { Header, Footer },
  data() {
    return {
      isShow: false,
      adding: [],     
      categories: [
        { title: '全部球技', isActive: true },
        { title: '後衛球員', isActive: false },
        { title: '前鋒球員', isActive: false },
        { title: '中鋒球員', isActive: false },
      ],    
      allProducts: this.$store.state.products ,
      cartItems: [],
    }
  },

  methods: {
    swapCategory(category) {
      console.log(category)
      if (category == '後衛球員') {
        this.$store.state.products = this.allProducts
        this.$store.state.products = this.$store.state.products.filter(
          (product) => product.position == 'guard'
        )
      } else if (category == '前鋒球員') {
        this.$store.state.products = this.allProducts
        this.$store.state.products = this.$store.state.products.filter(
          (product) => product.position == 'foward'
        )
      } else if (category == '中鋒球員') {
        this.$store.state.products = this.allProducts
        this.$store.state.products = this.$store.state.products.filter(
          (product) => product.position == 'center'
        )
      } else {
        this.$store.state.products = this.allProducts
      }
      this.categories.forEach((item) => {
        console.log(item, category)
        if (item.title == category) item.isActive = !item.isActive
        else item.isActive = false
      })
    },
    addToCart(product) {
      let isNew = true
      if (this.cartItems == null) this.cartItems.push(product)

      this.cartItems.forEach((cartItem) => {
        if (product.id === cartItem.id) {
          //檢查購物車裡有無此項商品
          isNew = false
          cartItem.count++
        }
      })

      if (isNew) {
        product.count++
        this.cartItems.push(product)
      } //將新的商品新增到購物車裡

      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))     
     
     this.$toastr.s("此商品已加入購物車", "SKILL");
    },
  },

  created() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    return this.cartItems
  },
}
</script>

<style lang="scss" scoped>
.product-list {
  padding: 35px 0;
  background-color: #333;
}
.side-nav {
  width: 30%;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.navs {
  position: sticky;
  top: 10%;
  left: 0;
  width: 50%;
  margin: 70px auto 0;
  justify-content: center;
  align-items: center;
  border: #fff 1px solid;
  color: #fff;
  .nav {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    font-size: 1.5rem;
    border-bottom: #fff 1px solid;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
.active {
  background-color: rgba(0, 0, 0, 0.6);
}
.container {
  width: 70%;
  background-color: #333;
  justify-content: space-evenly;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
  .card {
    width: 250px;
  }
  .card-top-img {
    width: 100%;
    height: 350px;
    background-size: cover;
    background-position: center 5%;
    display: block;
  }
  .card-content {
    background-color: #fff;
    padding: 20px 10px;
  }
  a {
    font-size: 1.2rem;
    color: #000;
    margin-top: 50px;
  }
  .fas {
    margin-left: 5px;
    color: #ddd;
    font-size: 2rem;
    &:hover {
      color: #333;
    }
  }
  p {
    text-align: right;
    margin-top: 10px;
    justify-content: space-between;
    padding: 0 5px;
  }
  del {
    font-size: 0.6em;
    color: rgba(0, 0, 0, 0.3);
    margin: 5px 0;
  }
  .add-cart {
    margin-top: 5px;
  }
}
</style>
