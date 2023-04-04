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
  <div class="w-full px-4 py-4">
    <h2 class="text-center text-2xl font-bold text-green-500">Editor's pick</h2>
  </div>
  <swiper
    watch-slides-visibility
    watch-slides-progress
    :pagination="{
      type: 'progressbar'
    }"
    :loop="true"
    :navigation="{ prevEl: '.prev', nextEl: '.next' }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false
    }"
    :modules="modules"
    class="mySwiper bg-gradient-from-t relative bg-gradient-to-b from-red-900 to-red-600 py-4"
  >
    <swiper-slide
      v-for="n of 10"
      :virtualIndex="n"
      :key="n"
      class="flex flex-wrap items-center justify-center text-center"
    >
      <img src="https://picsum.photos/200/300" alt="" />
      <p class="w-full">Mylist will be here {{ n }}</p>
    </swiper-slide>
    <div class="absolute bottom-[10%] right-4 z-20 flex flex-col gap-4">
      <button class="next bg-white p-1">next</button>
      <button class="prev bg-white p-1">prev</button>
    </div>
  </swiper>
</template>
