<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <Header />
    <section class="product-list flex-content bg-dark">
      <div class="side-nav">
        <ul class="navs flex-content">
          <li
            @click="swapCategory(category.position)"
            v-for="category in categories"
            :key="category.title"
            class="nav"
            :class="{ active: category.isActive }"
          >
            {{ category.title }}
          </li>
        </ul>
      </div>

      <ul class="products flex-content container bg-dark">
        <template v-if="currentPosition.length === 0">
          <li class="product" v-for="product in products" :key="product.id">
            <router-link
              :to="{
                name: 'ProductDetail',
                params: { id: product.id },
              }"
              class="card"
            >
              <!-- params can pass data to next route -->
              <div
                class="card-top-img"
                :style="{
                  backgroundImage: `url(https://i.imgur.com/${product.imgSrc})`,
                }"
              ></div>
              <div class="card-content">
                {{ product.name }}
                <p class="flex-content">
                  <router-link
                    class="add-cart"
                    to=""
                    @click.native="addToCart(product.id)"
                  >
                    <i class="fas fa-cart-plus"></i>
                  </router-link>
                  <span class="originPrice">
                    <del>原價 $ {{ product.originPrice }}</del>
                    <br />
                    NT $ {{ product.price }}
                  </span>
                </p>
              </div>
            </router-link>
          </li>
        </template>
        <template v-else>
          <li
            class="product"
            v-for="product in currentPosition"
            :key="product.id"
          >
            <router-link
              :to="{
                name: 'ProductDetail',
                params: { id: product.id },
              }"
              class="card"
            >
              <!-- params can pass data to next route -->
              <div
                class="card-top-img"
                :style="{
                  backgroundImage: `url(https://i.imgur.com/${product.imgSrc})`,
                }"
              ></div>
              <div class="card-content">
                {{ product.name }}
                <p class="flex-content">
                  <router-link
                    class="add-cart"
                    to=""
                    @click.native="addToCart(product.id)"
                  >
                    <i class="fas fa-cart-plus"></i>
                  </router-link>
                  <span class="originPrice">
                    <del>原價 $ {{ product.originPrice }}</del>
                    <br />
                    NT $ {{ product.price }}
                  </span>
                </p>
              </div>
            </router-link>
          </li>
        </template>
      </ul>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import { getCookie } from '../../functions/cookies'
export default {
  components: { Header, Footer },
  data() {
    return {
      isShow: false,
      adding: [],
      categories: [
        { title: '全部球技', isActive: true, position: 'all' },
        { title: '後衛球員', isActive: false, position: 'guard' },
        { title: '前鋒球員', isActive: false, position: 'foward' },
        { title: '中鋒球員', isActive: false, position: 'center' },
      ],
      currentPosition: [],
    }
  },
  computed: {
    products() {
      return this.$store.state.products
    },
    isLoading() {
      return this.$store.state.isLoading
    },
  },

  methods: {
    swapCategory(position) {
      console.log(position)
      this.categories.forEach((item) => {
        //console.log(item, category)
        if (item.position === position) item.isActive = !item.isActive
        else item.isActive = false
      })
      console.log(this.currentPosition)
      if (position === 'all') {
        this.currentPosition = this.products
        return
      }

      this.currentPosition = this.products
      this.currentPosition = this.products.filter(
        (product) => product.position === position
      )
    },
    addToCart(id) {
      if (getCookie('login') !== 'true')
        return this.$router.push({ name: 'Login' })
      this.$store.dispatch('addToCart', { countShow: 1, id: id })

      this.$toastr.s('此商品已加入購物車', 'SKILL')
    },
  },
  created() {},
  mounted() {},
}
</script>

<style lang="scss" scoped>
.product-list {
  padding: 35px 0;
  padding-top: 125px;
}
.side-nav {
  width: 30%;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
}
.navs {
  position: fixed;
  top: 15%;
  left: 10%;
  width: 150px;
  margin: 70px auto 0;
  justify-content: center;
  align-items: center;
  border: #fff 1px solid;
  color: #fff;
  @media screen and (max-width: 768px) {
    position: initial;
  }
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
  justify-content: space-evenly;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
  .card {
    width: 250px;
    display: inline-block;
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
