<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import 'swiper/css'

import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const modules = [Pagination, Navigation, Autoplay]
</script>

<template>
  <div class="mt-12">
    <div class="w-full px-4 py-4">
      <h2 class="text-2xl font-bold text-green-500">Trending this week</h2>
    </div>
    <swiper
      :slidesPerView="3"
      :spaceBetween="30"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false
      }"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper bg-slate-400"
    >
      <swiper-slide class="h-96 w-96 bg-white"></swiper-slide>
      <swiper-slide class="h-96 w-96 bg-green-400"></swiper-slide>
      <swiper-slide class="h-96 w-96 bg-white"></swiper-slide>
      <swiper-slide class="h-96 w-96 bg-green-400"></swiper-slide>
      <swiper-slide class="h-96 w-96 bg-white"></swiper-slide>
      <swiper-slide class="h-96 w-96 bg-green-400"></swiper-slide>
      <swiper-slide class="h-96 w-96 bg-white"></swiper-slide>
      <swiper-slide class="h-96 w-96 bg-green-400"></swiper-slide>
      <swiper-slide class="h-96 w-96 bg-white"></swiper-slide>
    </swiper>
  </div>
</template>
