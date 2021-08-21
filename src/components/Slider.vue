<template>
  <div class="slide-container">
    <transition-group
      :name="direction ? 'slide' : 'slide-invert'"
      tag="ul"
      class="slides"
      mode="out-in"
    >
      <li
        class="slide flex-content"
        v-for="(slide, index) in slides"
        v-show="currentSlide === index"
        :key="slide.name"
        :style="{ backgroundImage: `url(${slide.imgSrc})` }"
      >
        <div class="hot-sell flex-content">
          <h2 class="hot-sell-title">
            熱賣商品
            <small>【熱銷】{{ slide.name }}</small>
          </h2>
          <router-link
            class="buy-now btn-primary"
            :to="{ name: 'Product-Detail', params: { id: slide.id } }"
            >馬上買 buy now</router-link
          >
        </div>
      </li>
      <ul class="slide-controls flex-content" key="slide-control">
        <li
          class="slide-control"
          :class="{ controlActive: slide.isActive }"
          v-for="(slide, index) in slides"
          :key="slide.name"
          @click="swapSlide(index)"
        ></li>
      </ul>
    </transition-group>
    <i class="fas fa-chevron-left" @click="swapSlide(currentSlide - 1)"></i>
    <i class="fas fa-chevron-right" @click="swapSlide(currentSlide + 1)"></i>
  </div>
</template>

<script>
import bannerHomeKb from '@/assets/banner/banner-home-1.jpg'
import bannerHomeMj from '@/assets/banner/banner-home-2.jpg'
import bannerHomeLbj from '@/assets/banner/banner-home-3.jpg'

export default {
  data() {
    return {
      currentSlide: 0,
      direction: true,
      slides: [
        {
          id: 7,
          name: 'Kobe Brant',
          imgSrc: bannerHomeKb,
          isActive: true,
        },
        {
          id: 6,
          name: 'Michael Jordan',
          imgSrc: bannerHomeMj,
          isActive: false,
        },
        {
          id: 11,
          name: 'Lebron James',
          imgSrc: bannerHomeLbj,
          isActive: false,
        },
      ],
    }
  },
  computed: {
    totalSlide() {
      return this.slides.length
    },
  },
  methods: {
    swapSlide(index) {
      this.slides[this.currentSlide].isActive = !this.slides[this.currentSlide]
        .isActive

      this.direction = index > this.currentSlide
      //console.log(index)
      this.currentSlide = (index + this.totalSlide) % this.totalSlide

      this.slides[this.currentSlide].isActive = !this.slides[this.currentSlide]
        .isActive
    },
    toggleShow(index) {
      this.slides[index].isActive = !this.slides[index].isActive
    },
    autoSlide() {
      window.setInterval(() => {
        this.currentSlide++
        if (this.currentSlide > this.totalSlide - 1) this.currentSlide = 0
        if (this.currentSlide < 0) this.currentSlide = this.totalSlide - 1
      }, 3000)
    },
  },
  mounted() {
    //this.autoSlide()
  },
}
</script>

<style lang="scss" scoped>
.slide-container{
  position: relative;
}
.slides {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  @media screen and (max-width: 768px) {
    height: 50vh;
  }
}
.slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center 10%;
  position: absolute;
  top: 0%;
  left: 0%;

  .hot-sell {
    background-color: rgba(0, 0, 0, 0.3);
    width: 50%;
    padding: 35px 0 25px;
    justify-content: center;
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    @media screen and (max-width: 768px) {
      width: 75%;
    }
  }
  .hot-sell-title {
    color: #fff;
    font-size: 4.5rem;
    font-weight: 500;
    text-align: center;
    width: 100%;
    @media screen and (max-width: 768px) {
      font-size: 3em;
    }
    small {
      display: block;
      padding-top: 50px;
      font-size: 0.6em;
    }
  }
  .buy-now {
    margin: 25px 0 20px;
  }
}

.slide-controls {
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 3%;
}
.slide-control {
  width: 35px;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
  }
}
.controlActive {
  background-color: #fff;
}

.fas {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.6);
  position: absolute;
  top: 50%;
  z-index: 0;
  transform: translateY(-50%);
  cursor: pointer;
  &:hover {
    color: #fff;
  } 
}
.fa-chevron-left {
  left: 7.5%;
  transform: translateX(-10%);
  @media screen and (max-width: 768px) {
    left: 2.5%;
  }
}
.fa-chevron-right {
  right: 7.5%;
  transform: translateX(-10%);
  @media screen and (max-width: 768px) {
    right: 2.5%;
  }
}
.slide-enter-active,
.slide-leave-active,
.slide-invert-enter-active,
.slide-invert-leave-active {
  transition: transform 0.5s linear;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-invert-enter {
  transform: translateX(-100%);
}

.slide-invert-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
</style>
