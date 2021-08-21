<template>
  <main>
    <section class="new-product-list bg-gray">
      <h2>新品上市</h2>
      <ul class="new-products">
        <li
          class="new-product"
          v-for="product in newProducts"
          :key="product.name"
        >
          <router-link :to="product.route">
            <img :src="product.imgSrc" :alt="product.name" />
            <div class="player-cover flex-content">
              <h3>{{ product.name }}</h3>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <section class="about bg-gray">
      <h3>想知道喜歡的名星住哪嗎 ?</h3>
      <p>
        SKILL有你想要的東西 <br />
        我們擁有所有球星的個人絕活 <br />
        只要你出錢，我們就賣給你
      </p>
      <router-link class="btn-about btn-primary" to="/about"
        >about us</router-link
      >
    </section>
    <section class="player-group bg-gray">
      <div class="card-wrap flex-content">
        <router-link
          class="card flex-content"
          v-for="group in groups"
          :key="group.title"
          :to="{ name: group.route, params: { position: group.position } }"
        >
          <img :src="group.imgSrc" :alt="group.name" />
          <div class="card-content">
            <p>{{ group.title }}</p>
            <div class="border-line"></div>
            <p class="titleEng">{{ group.titleEng }}</p>
            <router-link class="btn-primary more" to="/about">more</router-link>
          </div>
          <div class="card-cover"></div>
        </router-link>
      </div>
    </section>
    <section class="interview bg-gray">
      <div class="flex-content container">
        <h3>採訪記事</h3>
        <ul class="cards flex-content">
          <li
            class="card"
            v-for="interview in interviews"
            :key="interview.content"
          >
            <img :src="interview.imgSrc" :alt="interview.title" />
            <h4 class="interview-title">{{ interview.title }}</h4>
            <p class="interview-content">{{ interview.content }}</p>
          </li>
        </ul>
        <div class="cards fadeaway">
          <img src="../assets/players/fadeaway.jpg" alt="fadeaway" />
          <div class="txt">
            <h4 class="interview-title">FadeAway</h4>
            <p class="interview-content">無法封蓋?! 太扯了吧!</p>
          </div>
        </div>
      </div>
    </section>
    <section class="hot-sell bg-gray">
      <h2>熱門暢銷商品</h2>
      <div class="hot-sell-products flex-content">
        <router-link
          class="hot-sell-product"
          v-for="hotSell in hotSells"
          :key="hotSell.name"
          :to="{ name: hotSell.route, params: { id: hotSell.id } }"
        >
          <img :src="hotSell.imgSrc" :alt="hotSell.name" />
          <h3>【熱銷】{{ hotSell.name }}</h3>
          <span
            >特價 {{ hotSell.onSalePrice }}
            <del>原價 {{ hotSell.price }}</del>
          </span>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      newProducts: [
        {
          name: 'Magic Johnson',
          imgSrc: require('../assets/players/player-1.jpg'),
          route: '/product/1',
        },
        {
          name: 'Dwyane Wade',
          imgSrc: require('../assets/players/player-9.jpg'),
          route: '/product/9',
        },
        {
          name: 'Larry Bird',
          imgSrc: require('../assets/players/player-12.jpg'),
          route: '/product/12',
        },
        {
          name: 'Kevin Durant',
          imgSrc: require('../assets/players/player-13.jpg'),
          route: '/product/13',
        },
        {
          name: 'Kevin Garnett',
          imgSrc: require('../assets/players/player-17.jpg'),
          route: '/product/17',
        },
        {
          name: 'Dirk Nowitzki',
          imgSrc: require('../assets/players/player-19.jpg'),
          route: '/product/19',
        },
        {
          name: 'Kareem Abdul-Jabbar',
          imgSrc: require('../assets/players/player-21.jpg'),
          route: '/product/21',
        },
      ],
      groups: [
        {
          title: '後衛球員',
          imgSrc: require('../assets/players/guard.jpg'),
          titleEng: 'Guard',
          position: 'guard',
          route: 'Player',
        },
        {
          title: '前鋒球員',
          imgSrc: require('../assets/players/foward.webp'),
          titleEng: 'Foward',
          position: 'foward',
          route: 'Player',
        },
        {
          title: '中鋒球員',
          imgSrc: require('../assets/players/center.jpeg'),
          titleEng: 'Center',
          position: 'center',
          route: 'Player',
        },
      ],
      interviews: [
        {
          title: 'CrossOver',
          content: 'Chris Paul: 甚麼?! 竟然有帥到掉渣的過人!',
          imgSrc: require('../assets/players/crossover.jpg'),
        },
        {
          title: 'SkyHook',
          content: '魔獸: 天勾這時不學更待何時?',
          imgSrc: require('../assets/players/skyhook.jpg'),
        },
        {
          title: 'LogoShot',
          content: '字母哥: 好想擁有LogoShot的能力啊!!!',
          imgSrc: require('../assets/players/logoshot.jpg'),
        },
        {
          title: 'NoLookingPass',
          content: 'Steve Nash: 想要風靡萬千少女嗎? 趕快來學吧',
          imgSrc: require('../assets/players/nolookingpass.jpg'),
        },
      ],
      hotSells: [
        {
          id: 7,
          name: 'Kobe Brant',
          imgSrc: require('../assets/players/player-7.jpg'),
          price: 9999,
          onSalePrice: 988,
          route: 'Product-Detail',
        },
        {
          id: 6,
          name: 'Michael Jordan',
          imgSrc: require('../assets/players/player-6.jpg'),
          price: 9999,
          onSalePrice: 988,
          route: 'Product-Detail',
        },
        {
          id: 11,
          name: 'Lebron James',
          imgSrc: require('../assets/players/player-11.jpg'),
          price: 9999,
          onSalePrice: 988,
          route: 'Product-Detail',
        },
        {
          id: 13,
          name: 'Kevin Durant',
          imgSrc: require('../assets/players/player-13.jpg'),
          price: 9999,
          onSalePrice: 988,
          route: 'Product-Detail',
        },
        {
          id: 2,
          name: 'Stephen Curry',
          imgSrc: require('../assets/players/player-2.jpg'),
          price: 9999,
          onSalePrice: 988,
          route: 'Product-Detail',
        },
        {
          id: 23,
          name: "Shaquille O'Neal",
          imgSrc: require('../assets/players/player-23.jpg'),
          price: 9999,
          onSalePrice: 988,
          route: 'Product-Detail',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.new-product-list {
  padding: 50px 15px;
  h2 {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 25px;
    text-align: center;
  }
  .new-products {
    overflow-x: scroll;
    overflow-y: hidden;
    margin: auto;
    white-space: nowrap;
  }
}
.new-product {
  width: 350px;
  height: 500px;
  display: inline-block;
  margin-left: 20px;
  padding: 15px;
  cursor: pointer;
  position: relative;

  @media screen and(max-width:768px) {
    display: block;
    width: 90%;
    margin: auto;
    height: 450px;
  }

  &:hover > .player-cover {
    height: calc(100% - 30px);
    opacity: 1;
  }

  &:first-child {
    margin-left: 5px;
    @media screen and(max-width:768px) {
      margin: auto;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }
  .player-cover {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 30px);
    height: 0px;
    opacity: 0;
    font-size: 2rem;
    transition: 0.5s;
    justify-content: center;
    align-items: center;
  }
}
.about {
  text-align: center;
  padding-top: 10px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #ddd;
  }
  p {
    line-height: 1.5;
    color: #ccc;
    margin-bottom: 15px;
  }
  .btn-about {
    font-size: 1rem;
  }
}
.player-group {
  padding: 25px 0;

  .card {
    width: 50%;
    padding: 225px 0;
    margin: 0 auto;
    background-position: center center;
    background-size: cover;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    color: #fff;
    cursor: pointer;

    @media screen and (max-width: 768px) {
      width: 100%;
      padding: 150px 0;
    }
    &:first-child {
      width: 70%;
      padding: 250px 0;
      margin: 0 auto;
      @media screen and (max-width: 768px) {
        width: 100%;
        padding: 150px 0;
      }
    }

    &:last-child > .card-content {
      top: 40%;
    }

    &:hover > .card-cover {
      opacity: 1;
    }
    &:hover > .card-content {
      transform: translateY(-10px);
    }
    &:hover p {
      transform: translateY(-10px);
    }
    &:hover .titleEng {
      opacity: 1;
    }
    &:hover .more {
      opacity: 1;
      padding: 15px 20px;
    }
    &:hover .border-line {
      width: 350px;
    }
    &:hover span {
      opacity: 1;
    }
    .card-content {
      transform: translateY(0px);
      transition: 0.3s;
      z-index: 2;
      position: absolute;
    }
  }
  img {
    width: 100%;
    height: 100%;
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  p {
    font-size: 2rem;
    transform: translateY(0px);
    transition: 0.3s;
  }
  .titleEng {
    font-size: 1.2rem;
    opacity: 0;
  }
  .more {
    margin: 25px auto 0;
    opacity: 0;
    padding: 0 20px;
    transition: 0.3s;
  }
  .border-line {
    width: 0;
    height: 1px;
    background-color: #fff;
    margin: 25px 0;
    transition: 0.3s;
  }
  .card-cover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: 0.3s;
  }
}
.interview {
  padding: 25px 0;
  .container {
    width: 90%;
    margin: 0 auto;
    position: relative;
  }
  .cards {
    width: 50%;
    color: #eee;
    padding-top: 50px;
    @media screen and (max-width: 768px) {
      width: 100%;
      margin: 0 auto;
    }
  }
  .card {
    width: 50%;
    padding: 10px;
    &:nth-child(even) {
      margin-top: 60px;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  h3 {
    font-size: 2rem;
    width: 100%;
    color: #fff;
  }

  .interview-title {
    font-size: 1.4em;
    text-align: center;
    margin: 10px 0 25px;
  }

  .interview-content {
    font-size: 1.2rem;
    letter-spacing: 3px;
    line-height: 1.2;
    text-align: center;
  }
  img {
    width: 100%;
  }
  .fadeaway {
    background-position: center 35%;
    position: sticky;
    top: 0;
    left: 0;
    width: 50%;
    height: 700px;
    padding: 0 25px;
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 550px;
    }
    img {
      height: 100%;
    }
    .txt {
      position: absolute;
      bottom: 5%;
      left: 60%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.6);
      padding: 5px 10px;
    }
    .interview-title {
      font-size: 1.8rem;
    }
    .interview-content {
      font-size: 1.5rem;
    }
  }
}
.hot-sell {
  text-align: center;
  color: #fff;

  h2 {
    font-size: 2rem;
    padding: 25px 0;
  }
  .hot-sell-products {
    width: 90%;
    margin: 0 auto;
    justify-content: space-evenly;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
  .hot-sell-product {
    width: 25%;
    margin: 10px 0;
    cursor: pointer;
    color: #fff;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  img {
    width: 90%;
    height: 350px;
  }
  h3 {
    font-size: 1.5rem;
    padding: 10px 0;
  }
  del {
    color: rgba(255, 255, 255, 0.589);
    margin-left: 5px;
    font-size: 0.7em;
  }
}
</style>
