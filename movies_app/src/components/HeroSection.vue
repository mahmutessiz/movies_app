<script setup>
import { onMounted, computed } from 'vue'

//Swiper.js setup
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import { Pagination, Navigation, Autoplay } from 'swiper'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

//Pinia setup
import { useApiStore } from '../stores/api'

const myMovieListData = useApiStore()

myMovieListData.fetchMovieListData()

onMounted(() => {
  computed(() => myMovieListData.myMovieList)
})

const modules = [Pagination, Navigation, Autoplay]

//When i use vue router i can pull id of the movie via fetching image id
</script>

<template>
  <swiper
    watch-slides-visibility
    watch-slides-progress
    :pagination="{
      type: 'progressbar'
    }"
    :loop="false"
    :rewind="true"
    :initial-slide="0"
    :navigation="{ prevEl: '.prev', nextEl: '.next' }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false
    }"
    :modules="modules"
    class="mySwiper relative overflow-hidden"
  >
    <swiper-slide
      v-for="(data, index) in myMovieListData.myMovieList.items"
      :virtualIndex="data.id"
      :key="data.id"
      class="bg-gradient-from-t relative flex h-[30rem] flex-wrap items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600/50 py-4 text-center"
    >
      <div class="absolute inset-0 -z-10 flex h-full w-full justify-center">
        <img
          :src="myMovieListData.sourceOfMoviesBackdropImg + data.backdrop_path"
          class="h-[30rem] w-full"
          :id="data.id"
          :alt="data.original_title"
        />
      </div>
      <div
        class="bg-gradient-from-t relative flex h-[30rem] w-full flex-wrap items-center justify-center bg-gradient-to-b from-gray-900 to-gray-600/50 py-4 text-center"
      >
        <div>
          <img
            :src="myMovieListData.sourceOfMovies + data.poster_path"
            class="w-40"
            :id="data.id"
            :alt="data.original_title"
          />
        </div>
        <div class="w-1/2 px-4 py-4 text-left">
          <h2 class="text-left text-2xl font-bold text-green-500">
            Editor's pick #{{ index + 1 }}
          </h2>
          <br />
          <p class="text-lg font-bold text-white">{{ data.original_title }}</p>
          <p class="line-clamp-4">
            Overview: <br />
            {{ data.overview }}
          </p>
          <br />
          <p>Rating: {{ data.vote_average }}</p>
        </div>
      </div>
    </swiper-slide>
    <div class="absolute bottom-[10%] right-4 z-20 flex flex-col gap-4">
      <button class="next bg-white p-1">next</button>
      <button class="prev bg-white p-1">prev</button>
    </div>
  </swiper>
</template>
