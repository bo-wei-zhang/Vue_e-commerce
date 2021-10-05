import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const getUrl = 'https://api.jsonbin.io/b/615b3544aa02be1d4453fd5a/4' // request URL
const token = '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam' // access token
var axiosHeaders = {
  headers: { 'secret-key': token },
}

export default new Vuex.Store({
  state: {
    products: [],
  },
  actions: {
    loadProductData({ commit }) {
      axios
        .get(getUrl, axiosHeaders)
        .then((response) => commit('loadProductData', response.data))
        .catch((error) => console.log(error))
    },
    addToCart({ commit }, { countShow, id }) {
      commit('addToCart', { countShow, id })
    },
    plusCount({ commit }, { id, count }) {
      commit('plusCount', { id, count })
    },
    minusCount({ commit }, { id, count }) {
      commit('minusCount', { id, count })
    },
    removeCartItem({ commit }, { id, count }) {
      commit('removeCartItem', { id, count })
    },
  },
  mutations: {
    loadProductData(state, data) {     
      console.log(data[0].imgSrc)
       state.products = data
    },
    addToCart(state, { countShow, id }) {
      console.log(countShow, id)
      state.products[id].count += countShow

      sessionStorage.setItem('cartItems', state)
    },
    plusCount(state, { id, count }) {
      ++state.products[id].count
    },
    minusCount(state, { id, count }) {
      if (state.products[id].count == 1) return
      --state.products[id].count
    },
    removeCartItem(state, { id, count }) {
      if (!confirm('確定要移除嗎?')) return

      state.products[id].count = 0

      sessionStorage.setItem('cartItems', state)
    },
  },
  modules: {},
})
