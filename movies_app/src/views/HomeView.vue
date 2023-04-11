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
          class="w-full sm:w-1/2"
          src="../assets/b1cfddae9e7b9645b9cde7ad9ee4f6bf.gif"
          alt="loading"
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
