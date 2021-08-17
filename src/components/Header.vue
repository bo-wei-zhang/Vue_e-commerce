<template>
  <header>
    <nav class="flex-content">
      <input id="menu-control" type="checkbox" />
      <label for="menu-control">
        <span class="hamburger-menu"></span>
      </label>
      <div class="logo-center flex-content">
        <router-link to="/">
          <h1 class="logo">
            <img src="../assets/logo.jpg" alt="logo" />
          </h1>
        </router-link>
        <ul class="nav-links flex-content">
          <li class="nav-link" v-for="link in links" :key="link.name">
            <router-link
              :to="{ name: link.route, params: { position: link.position } }"
              >{{ link.name }}
            </router-link>
          </li>
          <li class="nav-link user-mobile">
            <router-link :to="{ name: 'Member' }">
              會員
            </router-link>
          </li>
        </ul>
      </div>
      <ul class="members flex-content">
        <li class="member user">
          <router-link :to="{ name: 'Member' }">
            <i class="far fa-user"></i>
          </router-link>
        </li>
        <li class="member cart">
          <router-link :to="{ name: 'Cart' }">
            <i class="fas fa-shopping-cart"></i>
            <span> {{ cartItems.length }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      links: [
        {
          name: '關於我們',
          route: 'About',
          position: '',
        },
        {
          name: '全部球技',
          route: 'Product',
          position: '',
        },
        {
          name: '後衛球員',
          route: 'Player',
          position: 'guard',
        },
        {
          name: '前鋒球員',
          route: 'Player',
          position: 'foward',
        },
        {
          name: '中鋒球員',
          route: 'Player',
          position: 'center',
        },
      ],
      cartItems: [],
    }
  },
  methods: {
    // changeActive(index) {
    //   console.log(index)
    //   this.links.forEach((link) => (link.isActive = false))
    //   this.links[index].isActive = true
    // },
  },
  created() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    return this.cartItems
  },
}
</script>

<style lang="scss" scoped>
header {
  .router-link-exact-active {
    color: #fff;
  }
  background: #000;
  color: #fff;
  padding: 10px;
  font-size: 1.3rem;
  @media screen and (max-width: 767px) {
    padding: 0;
  }
  nav {
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 767px) {
      overflow: hidden;      
    }
  }
  #menu-control {
    display: none;
  }
  #menu-control:checked ~ .logo-center > .nav-links {
    @media screen and (max-width: 767px) {
      height: 364px;
    }
    height: 0;
  }
  label {
    display: none;
    user-select: none;
    @media screen and (max-width: 767px) {
      display: block;
      width: 35px;
      height: 30px;
      cursor: pointer;
      position: absolute;
      top: 5%;
      left: 10%;
    }
  }
  .hamburger-menu {
    width: 30px;
    height: 1px;
    display: block;
    background-color: #fff;
    box-shadow: 0 -10px 0 #fff, 0 10px 0 #fff;
    position: absolute;
    top: 50%;
    left: 0;
  }
  a {
    display: inline-block;
    color: #aaa;
    padding: 5px 8px;
    &:hover {
      color: #fff;
    }
  }
  .nav-links {
    align-items: center;
    transition: 0.3s;

    @media screen and (max-width: 767px) {
      display: block;
      margin-top: 90px;
      background-color: #000;
      height: 0px;
    }
  }
  .nav-link {
    @media screen and (max-width: 767px) {
      padding: 15px;      
    }
  }

  .logo-center {
    @media screen and (max-width: 767px) {
      display: block;
    }
  }

  .logo {
    width: 50px;
    @media screen and (max-width: 767px) {
      position: absolute;
      top: 3%;
      left: 50%;
      transform: translate(-50%, -3%);
    }
  }
  img {
    width: 100%;
    vertical-align: middle;
  }
  .member {
    padding: 0 10px;
  }
  .user {
    @media screen and (max-width: 767px) {
      display: none;
    }
  }
  .user-mobile {
    display: none;

    @media screen and (max-width: 767px) {
      display: block;
    }
  }
  .cart {
    @media screen and (max-width: 767px) {
      position: absolute;
      top: 5%;
      right: 5%;
    }
  }
}
</style>
