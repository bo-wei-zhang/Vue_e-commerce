<template>
  <div class="flex-content container" v-if="!isLoading">
    <Loading :active.sync="isLoading"></Loading>
    <div class="product-img">
      <img
        :src="`https://i.imgur.com/${product.imgSrc}`"
        alt="請輸入正確圖片網址"
      />
    </div>

    <form class="product-form" @submit.prevent="createProduct">
      <div class="name">
        <span class="form-text"> 名稱:</span>
        <input class="form-input" type="text" v-model="product.name" required />
      </div>
      <div class="no">
        <span class="form-text"> 球員背號:</span>
        <input class="form-input" type="text" v-model="product.no" required />
      </div>
      <div class="position">
        <span class="form-text"> 球員位置:</span>
        <select class="form-input" type="text" v-model="product.position">
          <option
            :value="position"
            v-for="position in positions"
            :key="position"
            class="form-input"
          >
            {{ position }}
          </option>
        </select>
      </div>
      <div class="team">
        <span class="form-text"> 球隊名稱:</span>
        <input class="form-input" type="text" v-model="product.team" required />
      </div>
      <div class="img-src">
        <span class="form-text"> 圖片網址: https://i.imgur.com/</span>
        <input class="form-input" type="text" v-model="product.imgSrc" />
      </div>
      <div class="skills">
        <span class="form-text"> 球員技術:</span>
        <div
          class="skill"
          v-for="(skill, index) in product.skills"
          :key="index"
          :class="'skill' + index"
        >
          <input
            class="form-input"
            :class="index"
            type="text"
            v-model="product.skills[index]"
            placeholder="請輸入技術名稱..."
          />
          <i class="fas fa-minus-circle " @click="removeSkillInput(index)"></i>
        </div>
        <div class="add-skill">
          <i class="fas fa-plus-circle " @click="addSkillInput"></i>
        </div>
      </div>
      <div class="price">
        <span class="form-text"> 價格:(元)</span>
        <input
          class="form-input"
          type="text"
          v-model="product.price"
          required
        />
      </div>
      <div class="is-hot-sell">
        <span class="form-text"> 熱銷:</span>
        <input
          id="is-hot-sell"
          class="form-input"
          type="checkbox"
          v-model="product.isHotSell"
        />
        <label for="is-hot-sell">
          <switch-button :isTrue="product.isHotSell" />
        </label>
      </div>
      <div class="is-new">
        <span class="form-text"> 新品:</span>
        <input
          id="is-new"
          class="form-input"
          type="checkbox"
          v-model="product.isNew"
        />
        <label for="is-new">
          <switch-button :isTrue="product.isNew" />
        </label>
      </div>
      <div class="description">
        <span class="form-text"> 球員資訊:</span>
        <!-- <input
          class="form-input description-input"
          type="text"
          v-model="product.description"
        /> -->
        <textarea
          class="form-input description-input"
          cols="30"
          rows="3"
          v-model="product.description"
        >
        </textarea>
      </div>
      <div class="btn-container">
        <router-link class="btn back" :to="{ name: 'BackEndProduct' }"
          >取消</router-link
        >
        <input class="btn save" type="submit" value="新增" />
      </div>
    </form>
  </div>
</template>

<script>
import SwitchButton from '../../components/SwitchButton.vue'
import axios from 'axios'
export default {
  data() {
    return {
      positions: ['guard', 'foward', 'center'],
      product: {
        id: this.productId(10),
        name: 'Giannis Antetokounmpo',
        no: 34,
        position: 'foward',
        team: 'Bucks',
        imgSrc: 'E9RRshE.jpg',
        description:
          '生於希臘，綽號爲「希臘怪物」。2次NBA最有價值球員、1次NBA總決賽最有價值球員，5次入選全明星陣容（1次當選NBA全明星賽最有價值球員），3次入選NBA第一隊，2次入選NBA第二隊，，1次NBA最佳防守球員，4次獲選最佳防守陣容。',
        skills: ['密不透風的防守', '無法阻擋的歐洲步'],
        price: 8888,
        originPrice: 99998,
        count: 0,
        isHotSell: false,
        isNew: false,
        route: 'ProductDetail',
      },
      isDuplicated: false,
    }
  },

  components: {
    SwitchButton,
  },
  methods: {
    productId(length) {
      return Number(
        Math.random()
          .toString()
          .substr(2, length) + Date.now()
      ).toString(36)
    },
    addSkillInput() {
      this.product.skills.push('')
    },
    removeSkillInput(index) {
      this.product.skills.splice(index, 1)
    },
    createProduct() {
      const updateProductInfoApi =
        'https://api.jsonbin.io/b/615b3544aa02be1d4453fd5a/'
      const token =
        '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam' // access token
      const axiosHeaders = {
        headers: { 'secret-key': token },
        versioning: false,
      }
      const products = this.products

      products.map((product) => {
        console.log(product.name)
        if (product.name !== this.product.name) return
        if (!confirm('已有相同商品名稱之商品，確定新增?'))
          this.isDuplicated = true
        else this.isDuplicated = false
      })
      if (!this.isDuplicated) products.push(this.product)
      console.log(products)
      axios
        .put(updateProductInfoApi, products, axiosHeaders)
        .then((response) => {
          console.log('Create: ', response.data)
          this.$toastr.Add({
            title: 'SKILL',
            msg: '新增成功！',
            position: 'toast-top-center',
          })
        })
        .then(() => {
          this.$router.push({ name: 'BackEndProduct' })
        })
        .catch((error) => console.log(error))
    },
  },
  computed: {
    products() {
      return this.$store.state.products
    },
    isLoading() {
      return this.$store.state.isLoading
    },
  },
  watch: {
    'product.no': {
      handler(newVal, oldVal) {
        const reg = /[^\d]/g
        // if (reg.test(newVal)) this.product.no = newVal
        // else this.product.no = oldVal
        if (reg.test(newVal)) this.product.no = ''
        console.log(oldVal, newVal)
      },
    },
    'product.price': {
      handler(newVal, oldVal) {
        const reg = /[^\d]/g
        // if (reg.test(newVal)) this.product.no = newVal
        // else this.product.no = oldVal
        if (reg.test(newVal)) this.product.price = ''
        console.log(oldVal, newVal)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  color: #fff;
}
.container {
  padding: 50px 20px;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    padding: 0 20px 25px;
  }
}
.product-img {
  width: 45%;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
  img {
    width: 100%;
    max-width: 540px;
  }
}
.product-form {
  width: 45%;
  font-size: 1.2rem;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
  .form-text {
    margin: 15px 0;
    display: block;
  }
  .form-input {
    display: block;
    width: 65%;
    padding: 10px;
    padding-right: 20px;
    font-size: 1.2rem;
    background-color: #333;
    outline: none;
    border: 1px solid #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media screen and (max-width: 768px) {
      width: 90%;
    }
    &:last-child {
      overflow: initial;
      text-overflow: initial;
      white-space: initial;
    }
  }
  .description-input {
    min-height: 120px;
  }
  .skill {
    margin: 15px 0;
    display: flex;
    align-items: end;
    cursor: pointer;

    .fa-minus-circle {
      margin-left: 10px;
      color: #aaa;
      transition: 0.3s;
      &:hover {
        color: #fff;
      }
    }
  }
  .skill0 {
    .fa-minus-circle {
      display: none;
    }
  }
  .add-skill {
    text-align: right;
    width: 65%;
    cursor: pointer;
    display: block;
    @media screen and (max-width: 768px) {
      width: 90%;
    }

    i {
      color: #aaa;
      transition: 0.3s;
      &:hover {
        color: #fff;
      }
    }
  }
  input[type='checkbox'] {
    display: none;
  }
  .btn-container {
    text-align: center;
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
    .save {
      cursor: pointer;
    }
  }
}
</style>
