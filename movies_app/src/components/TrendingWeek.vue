<script setup>
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';

import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//Pinia setup
import { useApiStore } from '../stores/api';

const trendingMoviesData = useApiStore();
trendingMoviesData.fetchTrendingMoviesData();

const modules = [Pagination, Navigation, Autoplay];
const router = useRouter();
</script>

<template>
  <div class="mt-12">
    <div class="w-full bg-slate-900 px-4 py-4">
      <h2 class="text-xl font-bold text-warning sm:text-center">Trending this week</h2>
    </div>
    <swiper
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
      :breakpoints="{
        200: {
          slidesPerView: 1
        },
        450: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3
        },
        999: {
          slidesPerView: 5
        }
      }"
    >
      <swiper-slide
        class="flex justify-center bg-slate-900 px-4 sm:py-12"
        v-for="data in trendingMoviesData.trendingWeekMoviesData.results"
        :key="data.id"
      >
        <div>
          <img
            :src="trendingMoviesData.sourceOfMoviePosterUrl + data.poster_path"
            @click="router.push(`/movie/${data.id}`)"
            alt=""
            class="w-80 cursor-pointer"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
