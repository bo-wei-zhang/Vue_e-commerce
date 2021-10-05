<template>
  <div>
    <Header />
    <div
      class="banner flex-content"
      :style="{ backgroundImage: `url(${currentBanner[0].imgSrc})` }"
    >
      <div class="position">{{ currentBanner[0].positionZh }}</div>
    </div>
    <section class="product-list flex-content">
      <div class=" container flex-content">
        <router-link
          v-for="product in currentPosition"
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
            :style="{backgroundImage: 'url('+require('@/assets/players/'+product.imgSrc)+')'}">
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
                <del>原價 {{ product.originPrice }}</del>
                <br />
                NT $ {{ product.price }}
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
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: { Header, Footer },
  props: ['position'],
  data() {
    return {
      banners: [
        {
          imgSrc: require('../assets/banner/banner-guard.jpg'),
          position: 'guard',
          positionZh: '後衛球員',
        },
        {
          imgSrc: require('../assets/banner/banner-foward.jpeg'),

          position: 'foward',
          positionZh: '前鋒球員',
        },
        {
          imgSrc: require('../assets/banner/banner-center.jpg'),
          position: 'center',
          positionZh: '中鋒球員',
        },
      ],
      isShow: false,
    }
  },

  methods: {
    addToCart(id) {
      this.$store.dispatch('addToCart', { countShow: 1, id: id - 1 })

      this.$toastr.s('此商品已加入購物車', 'SKILL')
    },
  },
  computed: {
    currentPosition() {
      return this.$store.state.products.filter(
        (product) => this.position == product.position
      )
    },
    currentBanner() {
      return this.banners.filter((banner) => banner.position === this.position)
    },
  },
  created() {
    // this.banners = this.banners.filter(
    //   (banner) => banner.position === this.position
    // )
  },
}
</script>

<style lang="scss" scoped>
.banner {
  background-size: cover;
  background-position: center 10%;
  height: 70vh;
  justify-content: center;
  align-items: center;
  .position {
    font-size: 3rem;
    text-align: center;
    padding: 50px 75px;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-weight: 700;
    letter-spacing: 3px;
    @media screen and (max-width: 768px) {
      width: 80%;
      padding: 50px 35px;
    }
  }
}

.container {
  background-color: #333;
  justify-content: space-evenly;
  padding: 0 50px;
  .card {
    width: 350px;
    @media screen and (max-width: 768px) {
      width: 250px;
    }
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
    padding: 0 15px;
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
