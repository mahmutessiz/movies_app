<script setup>
import HeroSection from '@/components/HeroSection.vue';
import TrendingWeek from '@/components/TrendingWeek.vue';
import TopMovies from '../components/TopMovies.vue';
import UpComingMovies from '../components/UpComingMovies.vue';
import PopularMovies from '../components/PopularMovies.vue';

//Pinia setup
import { useApiStore } from '../stores/api';

const myMovieListData = useApiStore();
</script>

<template>
  <!-- Page load animation -->
  <div class="fixed inset-0 z-50" v-if="myMovieListData.isFinish == false">
    <div class="h-screen bg-black/90">
      <div class="flex h-full items-center justify-center">
        <img
          class="h-16 w-16"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      </div>
    </div>
  </div>
  <!-- Main Section -->
  <HeroSection />
  <TopMovies />
  <TrendingWeek />
  <UpComingMovies />
  <PopularMovies />
</template>
