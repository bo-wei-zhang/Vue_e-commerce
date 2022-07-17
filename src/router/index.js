import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { getCookie } from '../functions/cookies'

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
    name: 'ProductDetail',
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
    path: '/backend',
    name: 'BackEndHome',
    component: () =>
      import(/* webpackChunkName: "member" */ '../views/BackEnd/Home.vue'),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
      requireAuth: true,
    },
    children: [
      {
        path: 'product',
        name: 'BackEndProduct',
        component: () =>
          import(
            /* webpackChunkName: "member" */ '../views/BackEnd/Product.vue'
          ),
        meta: {
          title: 'SKILL | 你想的到的球技都在這裡',
          requireAuth: true,
        },
      },
      {
        path: 'edit/:editId',
        name: 'BackEndProductEdit',
        component: () =>
          import(
            /* webpackChunkName: "member" */ '../views/BackEnd/EditProduct.vue'
          ),
        meta: {
          title: 'SKILL | 你想的到的球技都在這裡',
        },
        props: true,
      },
      {
        path: 'create',
        name: 'BackEndProductCreate',
        component: () =>
          import(
            /* webpackChunkName: "member" */ '../views/BackEnd/CreateProduct.vue'
          ),
        meta: {
          title: 'SKILL | 你想的到的球技都在這裡',
        },
      },
      {
        path: 'order',
        name: 'BackEndOrder',
        component: () =>
          import(/* webpackChunkName: "member" */ '../views/BackEnd/Order.vue'),
        meta: {
          title: 'SKILL | 你想的到的球技都在這裡',
        },
      },
      {
        path: 'order/:orderId',
        name: 'BackEndOrderDetail',
        component: () =>
          import(
            /* webpackChunkName: "member" */ '../views/BackEnd/OrderDetail.vue'
          ),
        props: true,
        meta: {
          title: 'SKILL | 你想的到的球技都在這裡',
        },
      },
    ],
  },

  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "member" */ '../views/Login.vue'),
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
      requireAuth: true,
    },
  },
  {
    path: '/bill',
    name: 'Bill',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Bill.vue'),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
      requireAuth: true,
    },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () =>
      import(
        /* webpackChunkName: "checkout" */ '../views/Checkout/Checkout.vue'
      ),
    meta: {
      title: 'SKILL | 你想的到的球技都在這裡',
    },
    children: [
      {
        path: 'createorder',
        name: 'CreateOrder',
        component: () =>
          import(
            /* webpackChunkName: "member" */ '../views/Checkout/CreateOrder.vue'
          ),
        meta: {
          title: 'SKILL | 你想的到的球技都在這裡',
        },
      },
      {
        path: 'finishorder',
        name: 'FinishOrder',
        component: () =>
          import(
            /* webpackChunkName: "member" */ '../views/Checkout/FinishOrder.vue'
          ),
        meta: {
          title: 'SKILL | 你想的到的球技都在這裡',
        },
      },
    ],
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
  const isLogin = getCookie('login') === 'true'
  //console.log(to)
  if (to.meta.requireAuth) {
    if (isLogin) {
      next()
    } else if (from.name == 'Login') {
      alert('請登入！')
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
export default router
