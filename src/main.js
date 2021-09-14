import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import plugin
import VueToastr from 'vue-toastr'
// use plugin
Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
  defaultTimeout: 3000,
  defaultProgressBar: false,
  defaultProgressBarValue: 0,
  defaultType: 'success',
  defaultPosition: 'toast-top-right',
  defaultCloseOnHover: false,
  defaultStyle: {
    'background-color': '#333',
    color: '#fff',
    padding: '20px 15px 20px 50px',
    'margin-bottom': '25px'
    
  },
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
