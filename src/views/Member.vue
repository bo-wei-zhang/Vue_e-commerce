<template>
  <div>
    <Header />
    <section class="member container flex-content">
      <h1>請登入</h1>
      <form action="#">
        <input
          type="text"
          id="inputEmail"
          placeholder="Email address"
          required
        />
        <input type="text" id="inputPassword" placeholder="Password" required />
        <div class="remember">
          <input type="checkbox" />
          <label>記住我</label>
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

export default {
  components: { Header, Footer },
}
</script>

<style lang="scss" scoped>
.container {
  width: 90%;
  margin: 0 auto;
}
.member {
  padding: 50px 0 350px;
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
  transition: 1s;

  &:focus {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
  }
}
input[type='submit'] {
  margin-top: 25px;
  font-size: 1.4rem;
  color: #fff;
  background-color: #000;
}

#inputEmail {
  border-radius: 5px 5px 0 0;
}
#inputPassword {
  border-radius: 0 0 5px 5px;
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
</style>
