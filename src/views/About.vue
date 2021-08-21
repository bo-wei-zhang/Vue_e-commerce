<template>
  <div>
    <Header />
    <main>
      <section class="about">
        <h1 class="title-about">About Us</h1>
        <div class="logo">
          <div class="banner-about"></div>
          <img class="logo-img" src="../assets/logo.jpg" alt="logo" />
        </div>
        <p class="about-txt">
          SKILL 為了讓大家學會NBA等級的球技而生 <br />
          也為了大家的夢想而戰 <br />
          看完球星的Highlight 影片， <br />
          蠢蠢欲動想趕快到球場上，<span class="special"
            >使用球星的獨門絕技嗎 </span
          ><br />
          SKILL 提供了各種方案！ <br />
          我們擁有 <span class="special"> 獨家的各種球技</span> <br />
          只要您只要下單，剩下的就交給SKILL 幫您處理 <br />
          SKILL 讓您迅速學會技術的同時，也不會讓您的荷包寂寞！
        </p>
      </section>
      <section class="guarantee container">
        <h2 class="guarantee-title">三大保證</h2>
        <ul class="guarantee-txts flex-content">
          <li
            class="guarantee-txt"
            v-for="guarantee in guarantees"
            :key="guarantee.title"
          >
            <h3 class="guarantee-maintitle">
              <i class="fas fa-medal"></i>{{ guarantee.title }}
            </h3>
            <h5 class="guarantee-subtitle">{{ guarantee.subTitle }}</h5>
            <p>
              {{ guarantee.text }}
            </p>
          </li>
        </ul>
      </section>
      <section class="team container">
        <h2 class="team-title">團隊</h2>
        <ul class="team-members flex-content">
          <li
            class="team-member"
            v-for="teamMember in teamMembers"
            :key="teamMember.title"                    
          >
            <div
              class="member-img"
              :style="{ backgroundImage: `url(${teamMember.imgSrc})` }"
            >
              <h3 class="member-name">{{ teamMember.name }}</h3>
            </div>
            <h5 class="member-work-title">{{ teamMember.workTitle }}</h5>
            <p>
              {{ teamMember.text }}
            </p>
          </li>
        </ul>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      guarantees: [
        {
          title: '專屬',
          subTitle: '由專人為您打造客製化課程',
          text: '我們針對不同顧客設計專屬課程，讓您擁有獨一無二的技術。 ',
        },
        {
          title: '獨一無二',
          subTitle: '僅此一家，絕無僅有',
          text:
            '過了這個村就沒這個店，機會稍縱即逝，想要快點學到您心儀球星的球技嗎?看到了一定要好好把握阿！！！ ',
        },
        {
          title: '保母',
          subTitle: '如同保母般無微不至',
          text:
            '我們對待您就如同保母對待嬰兒一樣。 我們比您更在乎您的大小事。只要您在我們平台上的一天，就絕對不會受到任何損失及享有24小時的真人線上服務。',
        },
      ],
      teamMembers: [
        {
          name: 'Tony Stark',
          workTitle: '創辦人 / CEO / 富二代',
          text:
            '別稱鋼鐵人，企業家、天才發明家兼極度自戀的花花公子，擔任史塔克工業執行長。 ',
          imgSrc: require('../assets/team/tony_stark.jpg'),
        },
        {
          name: 'Pepper Potts',
          workTitle: '網頁設計師 / CFO / 秘書',
          text:
            '東尼·史塔克的助手與情人，2007年，她以希拉 (Hera) 為身分代號加入了復仇者：五十州英雄計畫。  ',
          imgSrc: require('../assets/team/Pepper_Potts.jpg'),
        },
        {
          name: 'Elizabeth Olsen',
          workTitle: 'CTO / CVO / COO',
          text:
            '小時候接受過芭蕾舞和唱歌課程。在四年級的時候出現在姐姐的影片裡，開始為其他項目試鏡。歐森6歲時首次在《西方是多麼有趣》。 ',
          imgSrc: require('../assets/team/elizabeth_olsen.webp'),
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
main {
  background-color: #000;
  color: #fff;
}
section {
  padding: 25px 0;
}
.container {
  width: 90%;
  margin: 0 auto;
}
.about {
  h1 {
    padding: 25px;
    text-transform: uppercase;
    text-align: center;
  }
  .title-about {
    font-size: 4.5rem;
    letter-spacing: 1px;

    @media screen and (max-width: 768px) {
      font-size: 3.5rem;
    }
  }
  .logo {
    width: 90%;
    margin: 50px auto;
    position: relative;
  }
  img {
    width: 100%;
  }
  .banner-about {
    opacity: 0.5;
    height: 70vh;
    background-image: url('../assets/banner/banner-about.jpg');
    background-position: 50% 10%;
    background-size: cover;

    @media screen and (max-width: 768px) {
      height: 30vh;
    }
  }
  .logo-img {
    position: absolute;
    width: 15rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media screen and (max-width: 768px) {
      width: 10rem;
    }
  }
  .about-txt {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    line-height: 2;
    letter-spacing: 2px;
    font-size: 1.2rem;
    font-weight: 400;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }
  .special {
    color: rgb(247, 76, 76);
  }
}
.guarantee {
  font-weight: 700;
  .guarantee-title {
    font-size: 1.8rem;
    margin-bottom: 25px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -25px;
      left: 0;
      width: 3.6rem;
      height: 2px;
      background-color: #6dd7bb;
    }
  }
  .fa-medal {
    padding-right: 10px;
  }
  .guarantee-maintitle {
    color: #6dd7bb;
    letter-spacing: 1.3px;
    font-size: 1.3rem;
  }
  .guarantee-txts {
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
  .guarantee-txt {
    width: calc(100% / 3);
    padding: 5px;

    @media screen and (max-width: 768px) {
      width: 90%;
    }
  }
  .guarantee-subtitle {
    color: rgba(255, 255, 255, 0.6);
    padding: 20px 0;
  }
  p {
    line-height: 1.5;
    letter-spacing: 1.5px;

    @media screen and (max-width: 768px) {
      margin-bottom: 25px;
    }
  }
}
.team {
  font-weight: 700;
  .team-title {
    font-size: 1.8rem;
    margin-bottom: 25px;
    text-align: center;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -25px;
      left: 47.5%;
      width: 3rem;
      height: 2px;
      background-color: #6dd7bb;
    }
  }
  .team-members {
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
  .team-member {
    width: calc(100% / 3);
    padding: 10px;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .member-img {
    width: 100%;
    height: 300px;
    background-position: 30% 5%;
    background-size: cover;
    position: relative;

    &::after,
    &::before {
      content: '';
      display: block;
      width: 0px;
      height: 0px;
      border-style: solid;
      position: absolute;
      z-index: 1;
    }
    &::before {
      top: 0;
      left: 0;
      border-width: 25px 25px 0 0;
      border-color: #000 transparent transparent transparent;
    }
    &::after {
      bottom: 0;
      right: 0;
      border-width: 0 0 25px 25px;
      border-color: transparent transparent #000 transparent;
    }
  }
  .member-name {
    position: absolute;
    width: 100%;
    bottom: -25px;
    left: 0;
    z-index: 2;
    font-size: 2.8rem;
  }
  .member-work-title {
    margin-top: 35px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 2px;
    font-size: 1.1rem;
  }
  p {
    margin-top: 25px;
    line-height: 2;
    letter-spacing: 2px;
    font-size: 1.1rem;
  }
}
</style>
