<template>
  <div>
    <Header />
    <Slider
      :currentSlide="currentSlide"
      :positive="positive"
      :slides="slides"
      @swapSlide="swapSlide"
    />
    <Main />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Header.vue'
import Slider from '../components/Slider.vue'
import Main from '../components/Main.vue'
import Footer from '../components/Footer.vue'
import bannerHomeKb from '@/assets/banner/banner-home-1.jpg'
import bannerHomeKd from '@/assets/banner/banner-home-2.jpg'
import bannerHomeLbj from '@/assets/banner/banner-home-3.webp'

export default {
  name: 'Home',
  components: {
    Header,
    Slider,
    Main,
    Footer,
  },

  data() {
    return {
      currentSlide: 0,
      positive: true,
      slides: [
        {
          id: 7,
          name: 'Kobe Brant',
          imgSrc: bannerHomeKb,
          isActive: true,
        },
        {
          id: 13,
          name: 'Kevin Durant',
          imgSrc: bannerHomeKd,
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
      console.log(index)
      this.slides[this.currentSlide].isActive = !this.slides[this.currentSlide]
        .isActive

      this.positive = index > this.currentSlide
      //console.log(index)
      this.currentSlide = (index + this.totalSlide) % this.totalSlide

      this.slides[this.currentSlide].isActive = !this.slides[this.currentSlide]
        .isActive
    },

    autoSwap() {
      window.setInterval(() => {
        this.slides[this.currentSlide].isActive = !this.slides[
          this.currentSlide
        ].isActive

        this.currentSlide++
        if (this.currentSlide > this.totalSlide - 1) this.currentSlide = 0
        if (this.currentSlide < 0) this.currentSlide = this.totalSlide - 1
        this.slides[this.currentSlide].isActive = !this.slides[
          this.currentSlide
        ].isActive
      }, 7500)
    },
  },
  mounted() {
    this.autoSwap()
  },
}
</script>

<style lang="scss" scoped></style>
1
