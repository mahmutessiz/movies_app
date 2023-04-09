<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';

import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//Pinia setup
import { useSeriesApiStore } from '../../stores/seriesApi';

const airingTodayData = useSeriesApiStore();
airingTodayData.fetchairingTodayData();

const modules = [Pagination, Navigation, Autoplay];
</script>

<template>
  <div class="mt-12">
    <div class="w-full px-4 py-4">
      <h2 class="text-xl font-bold text-green-500 sm:text-center">Airing Today</h2>
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
        class="flex justify-center bg-base-300 px-4 sm:py-12"
        v-for="data in airingTodayData.airingTodayData.results"
        :key="data.id"
      >
        <div>
          <img
            :src="airingTodayData.sourceOfMoviePosterUrl + data.poster_path"
            alt=""
            class="w-80"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
