<template>
  <div class="bg-dark">
    <Header />
    <section class="member container flex-content ">
      <h1>請登入</h1>
      <form @submit.prevent="login">
        <input
          type="text"
          id="inputEmail"
          placeholder="Email address"
          required
          v-model="userName"
        />
        <input
          :type="passwordType"
          id="inputPassword"
          placeholder="Password"
          required
          v-model="password"
        />
        <div
          class="is-show-password"
          v-if="isShowPassword"
          @click="toggleShowPassword"
        >
          <i class="far fa-eye "></i>
        </div>
        <div class="is-show-password" v-else @click="toggleShowPassword">
          <i class="far fa-eye-slash"></i>
        </div>
        <div class="remember">
          <input id="rememberAccount" type="checkbox" v-model="isRemember" />
          <label class="remember" for="rememberAccount">記住我</label>
        </div>
        <input type="submit" value="登入" />
      </form>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { setCookie, getCookie } from '../functions/cookies'

export default {
  components: { Header, Footer },
  data() {
    return {
      userName: 'test',
      password: 'test',
      isRemember: false,
      isShowPassword: false,
      passwordType: 'password',
    }
  },
  methods: {
    login() {
      console.log('login')
      if (this.userName !== 'test' || this.password !== 'test')
        return alert('請輸入正確的帳號密碼!')
      setCookie('login', 'true', 1)
      console.log(this.isRemember)
      if (!this.isRemember) return
      this.rememberAccountAndPassword()
      this.$router.push({ name: 'Home' })
    },
    rememberAccountAndPassword() {
      console.log(this.isRemember)
      setCookie('userName', this.userName, 1)
      setCookie('password', this.password, 1)
    },
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword
      console.log('isShow ' + this.isShowPassword)
      this.isShowPassword
        ? (this.passwordType = 'text')
        : (this.passwordType = 'password')
    },
  },
  created() {
    this.userName = getCookie('userName') || 'test'
    this.password = getCookie('password') || 'test'
    this.isRemember = true
  },
  watch: {},
}
</script>

<style lang="scss" scoped>
.container {
  width: 90%;
  margin: 0 auto;
  color: #fff;
}
.member {
  padding: 150px 0 350px;
  justify-content: center;
}
h1 {
  width: 100%;
  padding-bottom: 25px;
  display: block;
}
form {
  width: 100%;
  max-width: 330px;
  padding: 10px;
}
input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
}
input[type='text'] {
  font-size: 1.2rem;
  outline: none;
  transition: 0.5s;
}
input[type='password'] {
  font-size: 1.2rem;
  outline: none;
  transition: 0.5s;
}
input[type='submit'] {
  margin-top: 25px;
  font-size: 1.4rem;
  color: #fff;
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #888;
  }
}

#inputEmail {
  border-radius: 5px 5px 0 0;
}
#inputPassword {
  border-radius: 0 0 5px 5px;
}
.is-show-password {
  margin: -30px 0 30px 270px;
}
.remember {
  text-align: center;
  padding-top: 15px;
  font-weight: 700;
}
input[type='checkbox'] {
  display: inline-block;
  width: 10%;
}
.remember {
  cursor: pointer;
}
</style>
