<template>
  <footer>
    <div class="container flex-content">
      <router-link to="/">
        <img src="../assets/logo.jpg" alt="logo" />
      </router-link>
      <br />
      <div class="txt flex-content">
        <span class="copyright">© 2021</span>
        <span class="follow">FOLLOW US</span>
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-twitter"></i>
        <i class="fas fa-envelope"></i>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
footer {
  background-color: #000;
  padding: 35px;
  .container {
    width: 80%;
    margin: 0 auto;
    justify-content: space-around;
    color: rgba(255, 255, 255, 0.6);
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }
  a {
    width: 10%;
    @media screen and (max-width: 768px) {
      width: 30%;
    }
  }
  img {
    width: 100%;
  }
  .txt {
    @media screen and (max-width: 768px) {
      margin-top: 25px;
      justify-content: center;
      text-align: center;
    }
  }
  .copyright {
    margin-bottom: 15px;
  }
  .follow {
    letter-spacing: 1px;
    width: 100%;
  }
  i {
    font-size: 1.2rem;
    margin: 25px 5px 0 5px;
    color: #fff;
    cursor: pointer;
    &:hover {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
</style>
