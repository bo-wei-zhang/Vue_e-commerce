import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
    },
  },
  {
    path: '/product',
    name: 'Product',
    component: () =>
      import(/* webpackChunkName: "product" */ '../views/Product/Product.vue'),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
    },
  },
  {
    path: '/product/:id', // do not add '/' or it will return to root, route woulb be binded by name
    name: 'Product-Detail',
    component: () =>
      import(/* webpackChunkName: "product" */ '../views/Product/Detail.vue'),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
    },
    props: true,
  },
  //redirect
  {
    path: '/player/:position',
    name: 'Player',
    component: () =>
      import(/* webpackChunkName: "player" */ '../views/Player.vue'),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
    },
    props: true,
  },
  {
    path: '/all-product',
    redirect: '/product',
  },
  {
    path: '/member',
    name: 'Member',
    component: () =>
      import(/* webpackChunkName: "member" */ '../views/Member.vue'),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "info" */ '../views/NotFound.vue'),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
    },
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: '/Vue_e-commerce',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  /* 路由發生變化修改頁面 title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
