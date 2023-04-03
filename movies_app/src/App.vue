<template>
  <swiper
    watch-slides-visibility
    watch-slides-progress
    :pagination="{
      type: 'progressbar'
    }"
    :loop="true"
    :navigation="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      v-for="n of 50"
      :virtualIndex="n"
      :key="n"
      class="text-center flex justify-center items-center flex-wrap"
    >
      <img src="https://picsum.photos/200/300" alt="" />
      <p class="w-full">Thumbnail {{ n }}</p>
    </swiper-slide>
  </swiper>

  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import 'swiper/css'

import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const modules = [Pagination, Navigation, Autoplay]
</script>

<style>
/* override swiperjs buttons */
.swiper-button-next {
  top: 90%;
  right: 10px;
}

.swiper-button-prev {
  top: 90%;
  left: 10px;
}
</style>
