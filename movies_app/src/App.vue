<!-- <script setup>

import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template> -->
<template>
  <swiper watch-slides-visibility watch-slides-progress>
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
</template>

<script setup>
import SwiperCore, { Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'

SwiperCore.use([Thumbs])
</script>
