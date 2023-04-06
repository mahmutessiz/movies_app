<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import 'swiper/css'

import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

//Pinia setup
import { useApiStore } from '../stores/api'

const trendingMoviesData = useApiStore()
trendingMoviesData.fetchTrendingMoviesData()

const modules = [Pagination, Navigation, Autoplay]
</script>

<template>
  <div class="mt-12">
    <div class="w-full px-4 py-4">
      <h2 class="text-center text-2xl font-bold text-green-500">Trending this week</h2>
    </div>
    <swiper
      :slidesPerView="4"
      :loop="false"
      :rewind="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false
      }"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide
        class="flex justify-center bg-rose-900/80 px-4 py-12"
        v-for="data in trendingMoviesData.trendingWeekMoviesData.results"
        :key="data.id"
      >
        <div>
          <img
            :src="trendingMoviesData.sourceOfMoviePosterUrl + data.poster_path"
            alt=""
            class="w-80"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
