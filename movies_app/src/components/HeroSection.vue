<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
//Swiper.js setup
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import 'swiper/css'

import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

//Pinia setup
/* import { storeToRefs } from 'pinia'
import { useApiStore } from '../stores/api'

const data = useApiStore()
const refer = storeToRefs(data.movieList)

onMounted(() => {
  console.log(data.myMovieList(refer))
}) */
const denemeArr = ref([])
const sourceOfMovies = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/'
const movieListUrl = import.meta.env.VITE_API_URL
const movieListApiKey = import.meta.env.VITE_API_KEY

onMounted(async () => {
  await axios.get(`${movieListUrl}?api_key=${movieListApiKey}`).then((response) => {
    denemeArr.value = response.data
  })
})

const modules = [Pagination, Navigation, Autoplay]
</script>

<template>
  <swiper
    watch-slides-visibility
    watch-slides-progress
    :pagination="{
      type: 'progressbar'
    }"
    :loop="false"
    :initial-slide="0"
    :navigation="{ prevEl: '.prev', nextEl: '.next' }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false
    }"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(data, index) in denemeArr.items"
      :virtualIndex="data.id"
      :key="data.id"
      class="bg-gradient-from-t relative flex flex-wrap items-center justify-center bg-gradient-to-b from-red-900 to-red-600 py-4 text-center"
    >
      <div class="w-full px-4 py-4">
        <h2 class="text-left text-2xl font-bold text-green-500">Editor's pick #{{ index }}</h2>
      </div>
      <img :src="sourceOfMovies + data.backdrop_path" class="w-40" alt="" />
      <p class="w-full">{{ data.original_title }}</p>
    </swiper-slide>
    <div class="absolute bottom-[10%] right-4 z-20 flex flex-col gap-4">
      <button class="next bg-white p-1">next</button>
      <button class="prev bg-white p-1">prev</button>
    </div>
  </swiper>
</template>
