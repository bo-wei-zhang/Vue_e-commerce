<template>
  <div>
    <Header />
    <!-- {{ productsInCart }} -->
    <section class="product-list flex-content">
      <div class="side-nav">
        <ul class="navs flex-content">
          <li
            @click="swapCategory(category.title)"
            v-for="category in categories"
            :key="category.title"
            class="nav"
            :class="{ active: category.isActive }"
          >
            {{ category.title }}
          </li>
        </ul>
      </div>
      <div class=" container flex-content">
        <router-link
          v-for="product in products"
          :key="product.id"
          :to="{
            name: 'Product-Detail',
            params: { id: product.id },
          }"
          class="card"
        >
          <!-- params can pass data to next route -->
          <div
            class="card-top-img"
            :style="{ backgroundImage: `url(${product.imgSrc})` }"
          ></div>
          <div class="card-content">
            {{ product.name }}
            <p class="flex-content">
              <router-link
                class="add-cart"
                to=""
                @click.native="addToCart(product)"
              >
                <i class="fas fa-cart-plus"></i>
              </router-link>
              <span class="price">
                <del>原價 $ 99,999</del>
                <br />
                NT $ 999
              </span>
            </p>
          </div>
        </router-link>
      </div>
    </section>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'

export default {
  components: { Header, Footer },
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Magic Johnson',
          no: 32,
          position: 'guard',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-1.jpg'),
          description:
            '聯盟有史以來最年輕的NBA總決賽最有價值球員。3次NBA最有價值球員、3次NBA總決賽最有價值球員，12次入選全明星陣容（2次當選NBA全明星賽最有價值球員），10次入選NBA最佳陣容，2次NBA抄截王，4次NBA助攻王，3次獲選為總決賽最有價值球員獎。',
          skills: [
            '潮到出水的No-Looking Pass',
            '絕對蓋不到的天勾',
            '紮實的運球技術',
          ],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 2,
          name: 'Stephen Curry',
          no: 30,
          position: 'guard',
          team: 'Warriors',
          imgSrc: require('../../assets/players/player-2.jpg'),
          description:
            'NBA歷史上首位全票通過的年度MVP，NBA歷史上最偉大的射手。3次NBA總冠軍、2次NBA年度MVP、7次入選NBA最佳陣容、1次NBA抄截王，單季最多三分球命中。',
          skills: ['萬眾矚目的Logo Shot', '神準的投射能力', '紮實的運球技術'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 3,
          name: 'Oscar Robertson',
          no: 14,
          position: 'guard',
          team: 'Kings',
          imgSrc: require('../../assets/players/player-3.jpg'),
          description:
            'NBA史上全能球員之一。1次NBA總冠軍、1次NBA最有價值球員、7次NBA助攻王、11次NBA最佳陣容、12次NBA全明星球員',
          skills: [
            '如何成為一位全能的球員',
            '精準的傳球技巧',
            '紮實的運球技術',
          ],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 4,
          name: 'Isiah Thomas',
          no: 11,
          position: 'guard',
          team: 'Pistons',
          imgSrc: require('../../assets/players/player-4.jpg'),
          description:
            '最偉大的控球後衛之一，運球教科書。2次NBA總冠軍、1次NBA總決賽最有價值球員、1次NBA助攻王、5次NBA最佳陣容、12次NBA全明星球員。',
          skills: ['矮個子如何防守', '紮實的運球技術'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 5,
          name: 'John Stockton',
          no: 12,
          position: 'guard',
          team: 'Jazz',
          imgSrc: require('../../assets/players/player-5.jpg'),
          description:
            '生涯的助攻數和抄截數都位居聯盟第一名。11次NBA最佳陣容、9次NBA助攻王、2次NBA抄截王、5次NBA最佳防守陣容、10次NBA全明星球員。',
          skills: ['精準的傳球技巧', '矮個子如何防守', '擋拆的千變萬化'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 6,
          name: 'Michael Jordan',
          no: 23,
          position: 'guard',
          team: 'Bulls',
          imgSrc: require('../../assets/players/player-6.jpg'),
          description:
            '20世紀世界上最具影響力的運動員之一，同時也是最具市場價值的籃球選手。6屆NBA總冠軍（兩次三連冠），6屆NBA總決賽最有價值球員，5屆NBA最有價值球員，3屆NBA明星賽最有價值球員，10屆NBA得分王（1987~93蟬連7屆，1996~98蟬連3屆），3屆抄截王，10次入選NBA最佳陣容，14次入選NBA全明星賽，以及1988年NBA年度最佳防守球員。在他眾多成就中，目前仍保持NBA常規賽的每場平均得分最高紀錄（30.12分）和季後賽的每場平均得分最高紀錄（33.45分）。',
          skills: [
            '勢不可擋的後仰跳投',
            '領導球隊',
            '包羅萬象的空中灌籃',
            '最致命決殺球',
            '使對手失去戰鬥能力的垃圾話能力',
          ],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 7,
          name: 'Kobe Bryant',
          no: 24,
          position: 'guard',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-7.jpg'),
          description:
            '公認為史上最偉大球員之一。5座NBA總冠軍、2次NBA總決賽最有價值球員、1次NBA最有價值球員、2次NBA得分王、15次NBA最佳陣容、12次NBA最佳防守陣、18次全明星賽、NBA灌籃大賽冠軍，聯盟生涯例行賽得分第四名。',
          skills: [
            '勢不可擋的後仰跳投',
            '領導球隊',
            '包羅萬象的空中灌籃',
            '最致命的決殺球',
          ],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 8,
          name: 'Jerry West',
          no: 44,
          position: 'guard',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-8.jpg'),
          description:
            'NBA歷史上的第一位輸隊隊伍獲得NBA總冠軍賽的MVP。1次NBA總冠軍、1次NBA得分王、9次NBA助攻王、12次NBA最佳陣容、4次NBA最佳防守陣容、14次NBA全明星球員',
          skills: ['穩定的投籃', '領導球隊', '紮實的運球技術'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 9,
          name: 'Dwyane Wade',
          no: 3,
          position: 'guard',
          team: 'Heat',
          imgSrc: require('../../assets/players/player-9.jpg'),
          description:
            '美國時代雜誌評為全美50大型男之一。3次NBA總冠軍、1次NBA總冠軍賽最有價值球員、8次NBA最佳陣容、3次NBA最佳防守陣容、13次NBA全明星球員。',
          skills: ['遜如閃電的快攻', '撕裂防線的切入'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 10,
          name: 'Allen Iverson',
          no: 3,
          position: 'guard',
          team: '76ers',
          imgSrc: require('../../assets/players/player-10.jpg'),
          description:
            'NBA歷史上最矮的選秀狀元。1次NBA最有價值球員、4次得分王、3次抄截王、7次NBA最佳陣容、11次入選全明星賽。',
          skills: [
            '令對手摸不著頭緒的花式運球',
            '紮實的運球技術',
            '穩定的中距離',
          ],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },

        {
          id: 11,
          name: 'Lebron James',
          no: 23,
          position: 'foward',
          team: 'Cavaliers',
          imgSrc: require('../../assets/players/player-11.jpg'),
          description:
            '公認為NBA歷史上最偉大球員之一。4座NBA總冠軍、4次NBA最有價值球員、4次總決賽最有價值球員以及兩枚奧運金牌、16次NBA最佳陣容、6次NBA年度防守隊伍、17次入選全明星賽，NBA季後賽歷史得分王、例行賽歷史第3高總得分與第8高總助攻數。',
          skills: ['如何成為一位全能的球員', '領導球隊', '無法阻擋的坦克切入'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 12,
          name: 'Larry Bird',
          no: 33,
          position: 'foward',
          team: 'Celtics',
          imgSrc: require('../../assets/players/player-12.jpg'),
          description:
            '公認為NBA歷史上最偉大球員之一，被譽為「史上籃球智商最高的人」。3座NBA總冠軍、3次NBA最有價值球員、2次總決賽最有價值球員、10次NBA年度最佳陣容、3次NBA年度防守隊伍、12次入選全明星賽。',
          skills: [
            '如何成為一位全能的球員',
            '領導球隊',
            '神準的投籃能力',
            '使對手失去戰鬥能力的垃圾話能力',
          ],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 13,
          name: 'Kevin Durant',
          no: 35,
          position: 'foward',
          team: 'Thunders',
          imgSrc: require('../../assets/players/player-13.jpg'),
          description:
            '擁有最豐富的進攻技能。2座NBA總冠軍、1次NBA最有價值球員、2次總決賽最有價值球員、4次NBA得分王、9次NBA年度最佳陣容、11次入選全明星賽。',
          skills: [
            '無解的二樓投籃',
            '精準的中距離',
            '神準的投籃能力',
            '最致命的決殺球',
          ],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 14,
          name: 'Scottie Pippen',
          no: 33,
          position: 'foward',
          team: 'Bulls',
          imgSrc: require('../../assets/players/player-14.jpg'),
          description:
            '世人稱之「天下第二人」。6座NBA總冠軍、1次NBA抄截王、7次NBA年度最佳陣容、8次NBA年度防守第一隊、7次入選全明星賽。',
          skills: ['密不透風的防守', '全能的身手'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 15,
          name: 'Kawhi Leonard',
          no: 2,
          position: 'foward',
          team: 'Raptors',
          imgSrc: require('../../assets/players/player-15.jpg'),
          description:
            '史上第三位擁有總決賽MVP與最佳防守球員獎項的球員。2座NBA總冠軍、2次總決賽最有價值球員、2次NBA年度最佳防守球員、1次NBA抄截王、5次NBA年度最佳陣容、6次NBA年度防守最佳陣容、5次入選全明星賽。',
          skills: ['密不透風的防守', '穩定的中距離'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 16,
          name: 'Tim Duncan',
          no: 21,
          position: 'foward',
          team: 'Spurs',
          imgSrc: require('../../assets/players/player-16.jpg'),
          description:
            '公認為史上最偉大球員之一。5座NBA總冠軍、3次總決賽最有價值球員、2次NBA最有價值球員、15次NBA年度最佳陣容、15次NBA年度防守最佳陣容、15次入選全明星賽。',
          skills: ['密不透風的防守', '穩定的打板球'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 17,
          name: 'Kevin Garnett',
          no: 21,
          position: 'foward',
          team: 'TimberWolves',
          imgSrc: require('../../assets/players/player-17.jpg'),
          description:
            '場上特點極為全能，傳球甚至比控衛更出眾、防守極具威懾力。1座NBA總冠軍、1次NBA最有價值球員、1次NBA最佳防守球員、4次NBA籃板王、9次NBA年度最佳陣容、12次NBA年度防守最佳陣容、15次入選全明星賽。',
          skills: [
            '密不透風的防守',
            '全能的身手',
            '使對手失去戰鬥能力的垃圾話能力',
          ],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 18,
          name: 'Karl Malone',
          no: 32,
          position: 'foward',
          team: 'Jazz',
          imgSrc: require('../../assets/players/player-18.jpg'),
          description:
            '公認為是史上最強壯的大前鋒，NBA史上總得分第二位。2次NBA最有價值球員、13次NBA年度最佳陣容、4次NBA年度防守最佳陣容、14次入選全明星賽。',
          skills: ['擋拆的千變萬化', '穩定的中距離', '保持球季健康的秘訣'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 19,
          name: 'Dirk Nowitzki',
          no: 21,
          position: 'foward',
          team: 'Mavericks',
          imgSrc: require('../../assets/players/player-19.jpg'),
          description:
            '公認為NBA史上最偉大的歐洲球員。1座NBA總冠軍、1次NBA最有價值球員、12次NBA年度最佳陣容、14次入選全明星賽。',
          skills: ['神準的投籃', '絕對蓋不到的金雞獨立投籃', '領導球隊'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 20,
          name: 'Charles Barkley',
          no: 21,
          position: 'foward',
          team: 'Suns',
          imgSrc: require('../../assets/players/player-20.jpg'),
          description:
            '公認為是聯盟歷史中最具統治力的大前鋒之一。1次NBA最有價值球員、1次NBA籃板王、11次NBA年度最佳陣容、9次入選全明星賽。',
          skills: ['籃板卡位', '低位進攻的訣竅'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 21,
          name: 'Kareem Abdul-Jabbar',
          no: 33,
          position: 'center',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-21.jpg'),
          description:
            '首位打滿20個NBA賽季的球員。6座NBA總冠軍、6次NBA年度最有價值球員、2次NBA總決賽最有價值球員、15次入選NBA最佳陣容、11次入選NBA最佳防守陣容、19次入選NBA全明星賽。聯盟生涯例行賽得分第一名。',
          skills: ['絕對蓋不到的天勾', '保持球季健康的秘訣'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 22,
          name: 'Hakeem Olajuwon',
          no: 34,
          position: 'center',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-22.jpg'),
          description:
            'NBA歷史上總阻攻記錄的保持人。2座NBA總冠軍、1次NBA年度最有價值球員、2次NBA總決賽最有價值球員、2次NBA最佳防守球員、12次入選NBA最佳陣容、9次入選NBA最佳防守陣容、12次入選NBA全明星賽。',
          skills: ['眼花撩亂的夢幻步伐', '封阻球的時機'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 23,
          name: "Shaquille O'Neal",
          no: 32,
          position: 'center',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-23.jpg'),
          description:
            '公認為是聯盟歷史中最偉大的長人中鋒球員之一。4座NBA總冠軍、1次NBA年度最有價值球員、3次NBA總決賽最有價值球員、13次入選NBA最佳陣容、3次入選NBA最佳防守陣容、15次入選NBA全明星賽。',
          skills: ['包夾也沒用的低位進攻', '強大的籃板爭搶能力'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 24,
          name: 'Bill Russell',
          no: 6,
          position: 'center',
          team: 'Celtics',
          imgSrc: require('../../assets/players/player-24.jpg'),
          description:
            '公認為是NBA歷史上最好的球員之一，創下NBA史上空前的八連霸的紀錄。11座NBA總冠軍、5次NBA年度最有價值球員、3次NBA總決賽最有價值球員、4次NBA籃板王、11次入選NBA最佳陣容、1次入選NBA最佳防守陣容、12次入選NBA全明星賽。',
          skills: ['奪冠的秘訣', '強大的籃板爭搶能力', '防守大個子的能力'],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
        {
          id: 25,
          name: 'Wilt Chamberlain',
          no: 13,
          position: 'center',
          team: '76ers',
          imgSrc: require('../../assets/players/player-25.jpg'),
          description:
            'NBA史上是一個神話級的球員，單場100分、單場55籃板以及單季場均50.4分。2座NBA總冠軍、4次NBA年度最有價值球員、1次NBA總決賽最有價值球員、7次NBA得分王、11次NBA籃板王、1次NBA助攻王、10次入選NBA最佳陣容、2次入選NBA最佳防守陣容、13次入選NBA全明星賽。',
          skills: [
            '難以破解的球賽紀錄',
            '無解的得分能力',
            '強大的籃板爭搶能力',
          ],
          price: 99998,
          originPrice: 9998,
          count: 0,
        },
      ],
      categories: [
        { title: '全部球技', isActive: true },
        { title: '後衛球員', isActive: false },
        { title: '前鋒球員', isActive: false },
        { title: '中鋒球員', isActive: false },
      ],
      allProducts: [
        {
          id: 1,
          name: 'Magic Johnson',
          no: 32,
          position: 'guard',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-1.jpg'),
          description:
            '聯盟有史以來最年輕的NBA總決賽最有價值球員。3次NBA最有價值球員、3次NBA總決賽最有價值球員，12次入選全明星陣容（2次當選NBA全明星賽最有價值球員），10次入選NBA最佳陣容，2次NBA抄截王，4次NBA助攻王，3次獲選為總決賽最有價值球員獎。',
          skills: [
            '潮到出水的No-Looking Pass',
            '絕對蓋不到的天勾',
            '紮實的運球技術',
          ],
        },
        {
          id: 2,
          name: 'Stephen Curry',
          no: 30,
          position: 'guard',
          team: 'Warriors',
          imgSrc: require('../../assets/players/player-2.jpg'),
          description:
            'NBA歷史上首位全票通過的年度MVP，NBA歷史上最偉大的射手。3次NBA總冠軍、2次NBA年度MVP、7次入選NBA最佳陣容、1次NBA抄截王，單季最多三分球命中。',
          skills: ['萬眾矚目的Logo Shot', '神準的投射能力', '紮實的運球技術'],
        },
        {
          id: 3,
          name: 'Oscar Robertson',
          no: 14,
          position: 'guard',
          team: 'Kings',
          imgSrc: require('../../assets/players/player-3.jpg'),
          description:
            'NBA史上全能球員之一。1次NBA總冠軍、1次NBA最有價值球員、7次NBA助攻王、11次NBA最佳陣容、12次NBA全明星球員',
          skills: [
            '如何成為一位全能的球員',
            '精準的傳球技巧',
            '紮實的運球技術',
          ],
        },
        {
          id: 4,
          name: 'Isiah Thomas',
          no: 11,
          position: 'guard',
          team: 'Pistons',
          imgSrc: require('../../assets/players/player-4.jpg'),
          description:
            '最偉大的控球後衛之一，運球教科書。2次NBA總冠軍、1次NBA總決賽最有價值球員、1次NBA助攻王、5次NBA最佳陣容、12次NBA全明星球員。',
          skills: ['矮個子如何防守', '紮實的運球技術'],
        },
        {
          id: 5,
          name: 'John Stockton',
          no: 12,
          position: 'guard',
          team: 'Jazz',
          imgSrc: require('../../assets/players/player-5.jpg'),
          description:
            '生涯的助攻數和抄截數都位居聯盟第一名。11次NBA最佳陣容、9次NBA助攻王、2次NBA抄截王、5次NBA最佳防守陣容、10次NBA全明星球員。',
          skills: ['精準的傳球技巧', '矮個子如何防守', '擋拆的千變萬化'],
        },
        {
          id: 6,
          name: 'Michael Jordan',
          no: 23,
          position: 'guard',
          team: 'Bulls',
          imgSrc: require('../../assets/players/player-6.jpg'),
          description:
            '20世紀世界上最具影響力的運動員之一，同時也是最具市場價值的籃球選手。6屆NBA總冠軍（兩次三連冠），6屆NBA總決賽最有價值球員，5屆NBA最有價值球員，3屆NBA明星賽最有價值球員，10屆NBA得分王（1987~93蟬連7屆，1996~98蟬連3屆），3屆抄截王，10次入選NBA最佳陣容，14次入選NBA全明星賽，以及1988年NBA年度最佳防守球員。在他眾多成就中，目前仍保持NBA常規賽的每場平均得分最高紀錄（30.12分）和季後賽的每場平均得分最高紀錄（33.45分）。',
          skills: [
            '勢不可擋的後仰跳投',
            '領導球隊',
            '包羅萬象的空中灌籃',
            '最致命決殺球',
            '使對手失去戰鬥能力的垃圾話能力',
          ],
        },
        {
          id: 7,
          name: 'Kobe Bryant',
          no: 24,
          position: 'guard',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-7.jpg'),
          description:
            '公認為史上最偉大球員之一。5座NBA總冠軍、2次NBA總決賽最有價值球員、1次NBA最有價值球員、2次NBA得分王、15次NBA最佳陣容、12次NBA最佳防守陣、18次全明星賽、NBA灌籃大賽冠軍，聯盟生涯例行賽得分第四名。',
          skills: [
            '勢不可擋的後仰跳投',
            '領導球隊',
            '包羅萬象的空中灌籃',
            '最致命的決殺球',
          ],
        },
        {
          id: 8,
          name: 'Jerry West',
          no: 44,
          position: 'guard',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-8.jpg'),
          description:
            'NBA歷史上的第一位輸隊隊伍獲得NBA總冠軍賽的MVP。1次NBA總冠軍、1次NBA得分王、9次NBA助攻王、12次NBA最佳陣容、4次NBA最佳防守陣容、14次NBA全明星球員',
          skills: ['穩定的投籃', '領導球隊', '紮實的運球技術'],
        },
        {
          id: 9,
          name: 'Dwyane Wade',
          no: 3,
          position: 'guard',
          team: 'Heat',
          imgSrc: require('../../assets/players/player-9.jpg'),
          description:
            '美國時代雜誌評為全美50大型男之一。3次NBA總冠軍、1次NBA總冠軍賽最有價值球員、8次NBA最佳陣容、3次NBA最佳防守陣容、13次NBA全明星球員。',
          skills: ['遜如閃電的快攻', '撕裂防線的切入'],
        },
        {
          id: 10,
          name: 'Allen Iverson',
          no: 3,
          position: 'guard',
          team: '76ers',
          imgSrc: require('../../assets/players/player-10.jpg'),
          description:
            'NBA歷史上最矮的選秀狀元。1次NBA最有價值球員、4次得分王、3次抄截王、7次NBA最佳陣容、11次入選全明星賽。',
          skills: [
            '令對手摸不著頭緒的花式運球',
            '紮實的運球技術',
            '穩定的中距離',
          ],
        },

        {
          id: 11,
          name: 'Lebron James',
          no: 23,
          position: 'foward',
          team: 'Cavaliers',
          imgSrc: require('../../assets/players/player-11.jpg'),
          description:
            '公認為NBA歷史上最偉大球員之一。4座NBA總冠軍、4次NBA最有價值球員、4次總決賽最有價值球員以及兩枚奧運金牌、16次NBA最佳陣容、6次NBA年度防守隊伍、17次入選全明星賽，NBA季後賽歷史得分王、例行賽歷史第3高總得分與第8高總助攻數。',
          skills: ['如何成為一位全能的球員', '領導球隊', '無法阻擋的坦克切入'],
        },
        {
          id: 12,
          name: 'Larry Bird',
          no: 33,
          position: 'foward',
          team: 'Celtics',
          imgSrc: require('../../assets/players/player-12.jpg'),
          description:
            '公認為NBA歷史上最偉大球員之一，被譽為「史上籃球智商最高的人」。3座NBA總冠軍、3次NBA最有價值球員、2次總決賽最有價值球員、10次NBA年度最佳陣容、3次NBA年度防守隊伍、12次入選全明星賽。',
          skills: [
            '如何成為一位全能的球員',
            '領導球隊',
            '神準的投籃能力',
            '使對手失去戰鬥能力的垃圾話能力',
          ],
        },
        {
          id: 13,
          name: 'Kevin Durant',
          no: 35,
          position: 'foward',
          team: 'Thunders',
          imgSrc: require('../../assets/players/player-13.jpg'),
          description:
            '擁有最豐富的進攻技能。2座NBA總冠軍、1次NBA最有價值球員、2次總決賽最有價值球員、4次NBA得分王、9次NBA年度最佳陣容、11次入選全明星賽。',
          skills: [
            '無解的二樓投籃',
            '精準的中距離',
            '神準的投籃能力',
            '最致命的決殺球',
          ],
        },
        {
          id: 14,
          name: 'Scottie Pippen',
          no: 33,
          position: 'foward',
          team: 'Bulls',
          imgSrc: require('../../assets/players/player-14.jpg'),
          description:
            '世人稱之「天下第二人」。6座NBA總冠軍、1次NBA抄截王、7次NBA年度最佳陣容、8次NBA年度防守第一隊、7次入選全明星賽。',
          skills: ['密不透風的防守', '全能的身手'],
        },
        {
          id: 15,
          name: 'Kawhi Leonard',
          no: 2,
          position: 'foward',
          team: 'Raptors',
          imgSrc: require('../../assets/players/player-15.jpg'),
          description:
            '史上第三位擁有總決賽MVP與最佳防守球員獎項的球員。2座NBA總冠軍、2次總決賽最有價值球員、2次NBA年度最佳防守球員、1次NBA抄截王、5次NBA年度最佳陣容、6次NBA年度防守最佳陣容、5次入選全明星賽。',
          skills: ['密不透風的防守', '穩定的中距離'],
        },
        {
          id: 16,
          name: 'Tim Duncan',
          no: 21,
          position: 'foward',
          team: 'Spurs',
          imgSrc: require('../../assets/players/player-16.jpg'),
          description:
            '公認為史上最偉大球員之一。5座NBA總冠軍、3次總決賽最有價值球員、2次NBA最有價值球員、15次NBA年度最佳陣容、15次NBA年度防守最佳陣容、15次入選全明星賽。',
          skills: ['密不透風的防守', '穩定的打板球'],
        },
        {
          id: 17,
          name: 'Kevin Garnett',
          no: 21,
          position: 'foward',
          team: 'TimberWolves',
          imgSrc: require('../../assets/players/player-17.jpg'),
          description:
            '場上特點極為全能，傳球甚至比控衛更出眾、防守極具威懾力。1座NBA總冠軍、1次NBA最有價值球員、1次NBA最佳防守球員、4次NBA籃板王、9次NBA年度最佳陣容、12次NBA年度防守最佳陣容、15次入選全明星賽。',
          skills: [
            '密不透風的防守',
            '全能的身手',
            '使對手失去戰鬥能力的垃圾話能力',
          ],
        },
        {
          id: 18,
          name: 'Karl Malone',
          no: 32,
          position: 'foward',
          team: 'Jazz',
          imgSrc: require('../../assets/players/player-18.jpg'),
          description:
            '公認為是史上最強壯的大前鋒，NBA史上總得分第二位。2次NBA最有價值球員、13次NBA年度最佳陣容、4次NBA年度防守最佳陣容、14次入選全明星賽。',
          skills: ['擋拆的千變萬化', '穩定的中距離', '保持球季健康的秘訣'],
        },
        {
          id: 19,
          name: 'Dirk Nowitzki',
          no: 21,
          position: 'foward',
          team: 'Mavericks',
          imgSrc: require('../../assets/players/player-19.jpg'),
          description:
            '公認為NBA史上最偉大的歐洲球員。1座NBA總冠軍、1次NBA最有價值球員、12次NBA年度最佳陣容、14次入選全明星賽。',
          skills: ['神準的投籃', '絕對蓋不到的金雞獨立投籃', '領導球隊'],
        },
        {
          id: 20,
          name: 'Charles Barkley',
          no: 21,
          position: 'foward',
          team: 'Suns',
          imgSrc: require('../../assets/players/player-20.jpg'),
          description:
            '公認為是聯盟歷史中最具統治力的大前鋒之一。1次NBA最有價值球員、1次NBA籃板王、11次NBA年度最佳陣容、9次入選全明星賽。',
          skills: ['籃板卡位', '低位進攻的訣竅'],
        },
        {
          id: 21,
          name: 'Kareem Abdul-Jabbar',
          no: 33,
          position: 'center',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-21.jpg'),
          description:
            '首位打滿20個NBA賽季的球員。6座NBA總冠軍、6次NBA年度最有價值球員、2次NBA總決賽最有價值球員、15次入選NBA最佳陣容、11次入選NBA最佳防守陣容、19次入選NBA全明星賽。聯盟生涯例行賽得分第一名。',
          skills: ['絕對蓋不到的天勾', '保持球季健康的秘訣'],
        },
        {
          id: 22,
          name: 'Hakeem Olajuwon',
          no: 34,
          position: 'center',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-22.jpg'),
          description:
            'NBA歷史上總阻攻記錄的保持人。2座NBA總冠軍、1次NBA年度最有價值球員、2次NBA總決賽最有價值球員、2次NBA最佳防守球員、12次入選NBA最佳陣容、9次入選NBA最佳防守陣容、12次入選NBA全明星賽。',
          skills: ['眼花撩亂的夢幻步伐', '封阻球的時機'],
        },
        {
          id: 23,
          name: "Shaquille O'Neal",
          no: 32,
          position: 'center',
          team: 'Lakers',
          imgSrc: require('../../assets/players/player-23.jpg'),
          description:
            '公認為是聯盟歷史中最偉大的長人中鋒球員之一。4座NBA總冠軍、1次NBA年度最有價值球員、3次NBA總決賽最有價值球員、13次入選NBA最佳陣容、3次入選NBA最佳防守陣容、15次入選NBA全明星賽。',
          skills: ['包夾也沒用的低位進攻', '強大的籃板爭搶能力'],
        },
        {
          id: 24,
          name: 'Bill Russell',
          no: 6,
          position: 'center',
          team: 'Celtics',
          imgSrc: require('../../assets/players/player-24.jpg'),
          description:
            '公認為是NBA歷史上最好的球員之一，創下NBA史上空前的八連霸的紀錄。11座NBA總冠軍、5次NBA年度最有價值球員、3次NBA總決賽最有價值球員、4次NBA籃板王、11次入選NBA最佳陣容、1次入選NBA最佳防守陣容、12次入選NBA全明星賽。',
          skills: ['奪冠的秘訣', '強大的籃板爭搶能力', '防守大個子的能力'],
        },
        {
          id: 25,
          name: 'Wilt Chamberlain',
          no: 13,
          position: 'center',
          team: '76ers',
          imgSrc: require('../../assets/players/player-25.jpg'),
          description:
            'NBA史上是一個神話級的球員，單場100分、單場55籃板以及單季場均50.4分。2座NBA總冠軍、4次NBA年度最有價值球員、1次NBA總決賽最有價值球員、7次NBA得分王、11次NBA籃板王、1次NBA助攻王、10次入選NBA最佳陣容、2次入選NBA最佳防守陣容、13次入選NBA全明星賽。',
          skills: [
            '難以破解的球賽紀錄',
            '無解的得分能力',
            '強大的籃板爭搶能力',
          ],
        },
      ],
      cartItems: [],
    }
  },
  methods: {
    swapCategory(category) {
      console.log(category)
      if (category == '後衛球員') {
        this.products = this.allProducts
        this.products = this.products.filter(
          (product) => product.position == 'guard'
        )
      } else if (category == '前鋒球員') {
        this.products = this.allProducts
        this.products = this.products.filter(
          (product) => product.position == 'foward'
        )
      } else if (category == '中鋒球員') {
        this.products = this.allProducts
        this.products = this.products.filter(
          (product) => product.position == 'center'
        )
      } else {
        this.products = this.allProducts
      }
      this.categories.forEach((item) => {
        console.log(item, category)
        if (item.title == category) item.isActive = !item.isActive
        else item.isActive = false
      })
    },
    addToCart(product) {
      let isNew = true
      if (this.cartItems == null) this.cartItems.push(product)

      this.cartItems.forEach((cartItem) => {
        if (product.id === cartItem.id) { //檢查購物車裡有無此項商品
          isNew = false
          cartItem.count++
        }
      })

      if (isNew) {
        product.count++
        this.cartItems.push(product)
      } //將新的商品新增到購物車裡

      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    del() {
      localStorage.removeItem('cartItems')
    },
  },
  // computed: {
  //   productsInCart() {
  //     return (
  //       this.products
  //         // 只顯示購買數量 > 0 的項目
  //         .filter((p) => p.count > 0)
  //     )
  //   },
  // },
  created() {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
    return this.cartItems
  },
}
</script>

<style lang="scss" scoped>
.product-list {
  padding: 35px 0;
  background-color: #333;
}
.side-nav {
  width: 30%;
  position: relative;
   @media screen and (max-width: 768px){
    width: 100%; 
   }
}
.navs {
  position: sticky; 
  top: 10%;
  left: 0;
  width: 50%;
  margin: 70px auto 0;
  justify-content: center;
  align-items: center;
  border: #fff 1px solid;
  color: #fff;
  .nav {
    width: 100%;
    text-align: center;
    padding: 15px 0;
    font-size: 1.5rem;
    border-bottom: #fff 1px solid;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
.active {
  background-color: rgba(0, 0, 0, 0.6);
}
.container {
  width: 70%;
  background-color: #333;
  justify-content: space-evenly;
   @media screen and (max-width: 768px){
     width: 100%;
    margin: 0 auto; 
   }
  .card {
    width: 250px;
  }
  .card-top-img {
    width: 100%;
    height: 350px;
    background-size: cover;
    background-position: center 5%;
    display: block;
  }
  .card-content {
    background-color: #fff;
    padding: 20px 10px;
  }
  a {
    font-size: 1.2rem;
    color: #000;
    margin-top: 50px;
  }
  .fas {
    margin-left: 5px;
    color: #ddd;
    font-size: 2rem;
    &:hover {
      color: #333;
    }
  }
  p {
    text-align: right;
    margin-top: 10px;
    justify-content: space-between;
    padding: 0 5px;
  }
  del {
    font-size: 0.6em;
    color: rgba(0, 0, 0, 0.3);
    margin: 5px 0;
  }
  .add-cart {
    margin-top: 5px;
  }
}
</style>
