<script setup>
//Swiper.js setup
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//Pinia setup
import { useApiStore } from '../stores/api';

const myMovieListData = useApiStore();

myMovieListData.fetchMovieListData();

const modules = [Pagination, Navigation, Autoplay];

/**
 * TODO: When i use vue router i can pull id of the movie via fetching image id
 */
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
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }"
    :modules="modules"
    class="mySwiper relative overflow-hidden"
  >
    <swiper-slide
      v-for="(data, index) in myMovieListData.myMovieList.items"
      :virtualIndex="data.id"
      :key="data.id"
      class="relative flex flex-wrap items-center justify-center text-center sm:h-[35rem]"
    >
      <div class="absolute inset-0 -z-10 flex h-full w-full justify-center">
        <img
          :src="myMovieListData.sourceOfMoviesBackdropImg + data.backdrop_path"
          class="h-[35rem] w-full"
          :id="data.id"
          :alt="data.original_title"
        />
      </div>
      <div
        class="bg-gradient-from-t bg-gradient-to-b from-gray-900 to-gray-700/80 backdrop-blur-[5px]"
      >
        <div
          class="relative flex h-[35rem] w-full flex-wrap items-end justify-start px-2 py-9 text-center sm:pb-24 md:px-12"
        >
          <div>
            <img
              :src="myMovieListData.sourceOfMoviePosterUrl + data.poster_path"
              class="ml-4 w-48 sm:w-40 md:ml-20 md:w-60"
              :id="data.id"
              :alt="data.original_title"
            />
          </div>
          <div class="w-full px-4 py-4 text-left sm:w-1/2 sm:py-0">
            <h2 class="text-left font-semibold text-green-500">Editor's picks #{{ index + 1 }}</h2>

            <p class="text-lg font-bold text-white">{{ data.title }}</p>
            <p class="line-clamp-4 md:line-clamp-none">
              {{ data.overview }}
            </p>
            <br class="hidden sm:block" />
            <p class="pt-2 text-white/80 sm:pt-0">
              <span class="text-white">Rating:</span> {{ data.vote_average }}
            </p>
          </div>
        </div>
      </div>
    </swiper-slide>
    <div class="absolute bottom-[10%] right-4 z-20 hidden flex-col gap-4 sm:flex">
      <button class="next bg-white p-2">next</button>
      <button class="prev bg-white p-2">prev</button>
    </div>
  </swiper>
</template>

<style>
.swiper-pagination-progressbar-fill {
  background-color: rgba(185, 35, 35, 0.815) !important;
}
</style>
