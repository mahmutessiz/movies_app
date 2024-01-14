<script setup>
//Swiper.js setup
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//router
import { useRouter } from 'vue-router';

//Pinia setup
import { useSeriesApiStore } from '../../stores/seriesApi';

import { saveToLocalStorage } from '../../utils/saveFavorite';

const seriesListData = useSeriesApiStore();
seriesListData.fetchSeriesListData();

const modules = [Pagination, Navigation, Autoplay];

/**
 * TODO: When i use vue router i can pull id of the movie via fetching image id
 */
const router = useRouter();

const changeButtonStyle = (id) => {
  const favButton = document.getElementById(id);
  favButton.classList.toggle('text-rose-500');
};
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
      v-for="(data, index) in seriesListData.mySeriesListData.items"
      :virtualIndex="data.id"
      :key="data.id"
      class="relatived flex flex-wrap items-center justify-center text-center sm:h-[35rem] lg:h-[40rem] xl:h-[45rem]"
    >
      <div class="absolute inset-0 -z-10 flex h-full w-full justify-center">
        <img
          :src="seriesListData.sourceOfMoviesBackdropImg + data.backdrop_path"
          class="w-full sm:h-[35rem] lg:h-[40rem] xl:h-[45rem]"
          :id="data.id"
          :alt="data.original_title"
        />
      </div>
      <div
        class="bg-gradient-from-t w-full bg-gradient-to-b from-gray-900 to-gray-700/80 backdrop-blur-[5px]"
      >
        <div
          class="relative flex flex-wrap items-end justify-start px-2 py-9 text-center sm:h-[35rem] sm:pb-24 md:px-12 lg:h-[40rem] xl:h-[45rem]"
        >
          <div class="relative">
            <!-- add favorite to localstorage -->
            <button
              class="btn-sm absolute bottom-2 right-2 cursor-pointer rounded-md bg-slate-900/50 text-rose-500 backdrop-blur-lg"
              :id="`btn-favorite-${data.id}`"
              @click="
                () => {
                  saveToLocalStorage(data.name, {
                    id: data.id,
                    title: data.name,
                    media_type: data.media_type,
                    poster_path: data.poster_path
                  }),
                    changeButtonStyle(`btn-favorite-${data.id}`);
                }
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
                />
              </svg>
            </button>
            <img
              :src="seriesListData.sourceOfMoviePosterUrl + data.poster_path"
              class="ml-4 w-48 cursor-pointer sm:w-40 md:ml-20 md:w-60"
              :id="data.id"
              :alt="data.original_title"
              @click="router.push(`/tv/${data.id}`)"
            />
          </div>
          <div class="w-full px-4 py-4 text-left sm:w-1/2 sm:py-0">
            <h2 class="pb-2 text-left text-green-500/70">Editor's picks #{{ index + 1 }}</h2>

            <p class="text-lg font-bold text-white md:pb-4 md:text-3xl lg:text-5xl">
              {{ data.name }}
            </p>
            <p class="line-clamp-4 md:line-clamp-5">
              {{ data.overview }}
            </p>
            <br class="hidden sm:block" />
            <p class="hidden pt-2 text-white/80 sm:pt-0 md:block">
              <span class="text-white">Original title:</span> {{ data.original_name }}
            </p>
            <p class="hidden pt-2 text-white/80 sm:pt-0 md:block">
              <span class="text-white">Release date:</span> {{ data.first_air_date }}
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
