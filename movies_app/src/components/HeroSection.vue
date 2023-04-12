<script setup>
// Import router
import { useRouter } from 'vue-router';

//Swiper.js setup
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//Pinia setup
import { useApiStore } from '../stores/api';

// Pinia codes
const myMovieListData = useApiStore();
myMovieListData.fetchMovieListData();

// Swiperjs codes
const modules = [Pagination, Navigation, Autoplay];

// Router codes
const router = useRouter();
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
      class="relatived flex flex-wrap items-center justify-center text-center sm:h-[35rem]"
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
        class="bg-gradient-from-t w-full bg-gradient-to-b from-gray-900 to-gray-700/80 backdrop-blur-[5px]"
      >
        <div
          class="relative flex h-[35rem] flex-wrap items-end justify-start px-2 py-9 text-center sm:pb-24 md:px-12"
        >
          <div>
            <img
              :src="myMovieListData.sourceOfMoviePosterUrl + data.poster_path"
              class="ml-4 w-48 cursor-pointer sm:w-40 md:ml-20 md:w-60"
              :id="data.id"
              :alt="data.original_title"
              @click="router.push(`/movie/${data.id}`)"
            />
          </div>
          <div class="w-full px-4 py-4 text-left sm:w-1/2 sm:py-0">
            <h2 class="pb-2 text-left text-green-500/70">Editor's picks #{{ index + 1 }}</h2>

            <p class="text-lg font-bold text-white">{{ data.title }}</p>
            <p class="line-clamp-4 md:line-clamp-none">
              {{ data.overview }}
            </p>
            <br class="hidden sm:block" />
            <p class="hidden pt-2 text-white/80 sm:pt-0 md:block">
              <span class="text-white">Original title:</span> {{ data.original_title }}
            </p>
            <p class="hidden pt-2 text-white/80 sm:pt-0 md:block">
              <span class="text-white">Release date:</span> {{ data.release_date }}
            </p>
            <p class="pt-2 text-white/80 sm:pt-0">
              <span class="text-white">Rating:</span> {{ data.vote_average }}
            </p>
          </div>
        </div>
      </div>
    </swiper-slide>
    <div class="absolute bottom-[10%] right-4 z-20 hidden flex-col gap-4 sm:flex">
      <button class="next btn rounded-lg bg-slate-900 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
          <g fill="currentColor">
            <path d="M11.732 9.36a1 1 0 1 1 1.536 1.28l-5 6a1 1 0 1 1-1.536-1.28l5-6Z" />
            <path d="M6.732 4.64a1 1 0 0 1 1.536-1.28l5 6a1 1 0 1 1-1.536 1.28l-5-6Z" />
          </g>
        </svg>
      </button>
      <button class="prev btn rounded-lg bg-slate-900 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20">
          <g fill="currentColor">
            <path d="M6.732 10.64a1 1 0 1 1 1.536-1.28l5 6a1 1 0 1 1-1.536 1.28l-5-6Z" />
            <path d="M8.268 10.64a1 1 0 1 1-1.536-1.28l5-6a1 1 0 1 1 1.536 1.28l-5 6Z" />
          </g>
        </svg>
      </button>
    </div>
  </swiper>
</template>
