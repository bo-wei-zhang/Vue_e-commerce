import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const getPrdoctInfoApi =
  'https://api.jsonbin.io/b/615b3544aa02be1d4453fd5a/latest' // request URL
const token = '$2b$10$E80Yyy9TzBqCY7bceVjdneSHeiAZqkNzb9dVn.9FbaTeX6LCvyEam' // access token
const axiosHeaders = {
  headers: { 'secret-key': token },
}

export default new Vuex.Store({
  //kind of data
  state: {
    products: [],
    isLoading: false,
    windowWidth: 0,
  },
  //kind of methods
  mutations: {
    LOADING_STATUS(state, status) {
      state.isLoading = status
    },
    GET_PRODUCT_DATA(state, data) {
      state.products = data
    },
    ADD_TO_CART(state, { countShow, id }) {
      console.log(countShow, id)
      state.products.map((product) => {
        if (product.id === id) product.count += countShow
      })

      sessionStorage.setItem('cartItems', JSON.stringify(state.products))
      // console.log(JSON.parse(sessionStorage.getItem('cartItems'))[id].count)
    },
    PLUS_COUNT(state, { id }) {
      // console.log('+', id)
      state.products.map((product) => {
        if (product.id === id) ++product.count
      })
      console.log('+', state.products[id].count)
      sessionStorage.setItem('cartItems', JSON.stringify(state.products))
    },
    MINUS_COUNT(state, { id }) {
      state.products.map((product) => {
        if (product.count == 1) return
        if (product.id === id) --product.count
      })
      sessionStorage.setItem('cartItems', JSON.stringify(state.products))
    },
    REMOVE_CART_ITEM(state, { ids, isSystem }) {
      console.log(isSystem)
      if (!isSystem) {
        if (!confirm('確定要移除嗎?')) return
        state.products.map((product) => {
          ids.map((id) => {
            if (product.id === id) product.count = 0
          })
        })
        sessionStorage.setItem('cartItems', JSON.stringify(state.products))
      } else {
        state.products.map((product) => {
          ids.map((id) => {
            if (product.id === id) product.count = 0
          })
        })
        sessionStorage.setItem('cartItems', JSON.stringify(state.products))
      }
    },
    setWindowWidth(state, value) {
      state.windowWidth = value
    },
  },
  actions: {
    getProductData({ commit }) {
      commit('LOADING_STATUS', true)

      axios
        .get(getPrdoctInfoApi, axiosHeaders)
        .then((response) => {
          console.log('Store: ', response.data)
          commit('GET_PRODUCT_DATA', response.data)
          commit('LOADING_STATUS', false)
        })
        .catch((error) => console.log(error))
    },

    addToCart({ commit }, { countShow, id }) {
      commit('ADD_TO_CART', { countShow, id })
    },
    plusCount({ commit }, { id }) {
      commit('PLUS_COUNT', { id })
    },
    minusCount({ commit }, { id }) {
      commit('MINUS_COUNT', { id })
    },
    removeCartItem({ commit }, { ids }) {
      commit('REMOVE_CART_ITEM', { ids })
    },
  },
  //kind of computed
  getters: {
    cartItems: (state) => {
      if (sessionStorage.getItem('cartItems'))
        state.products = JSON.parse(sessionStorage.getItem('cartItems'))
      return state.products.filter((product) => product.count > 0)
    },
    windowWidth: (state) => state.windowWidth,
  },
})
