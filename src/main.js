import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import VueLoading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';

Vue.config.productionTip = false
//Vue.component('VueLoading', VueLoading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
