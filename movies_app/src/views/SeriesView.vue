<script setup>
import SeriesHero from '../components/series_components/SeriesHero.vue';
import TopSeries from '../components/series_components/TopSeries.vue';
import PopularSeries from '../components/series_components/PopularSeries.vue';
import AiringTodaySeries from '../components/series_components/AiringTodaySeries.vue';

//Pinia setup
import { useSeriesApiStore } from '../stores/seriesApi';
const topSeriesData = useSeriesApiStore();
</script>

<template>
  <!-- Page load animation -->
  <div class="fixed inset-0 z-50" v-if="topSeriesData.isFinish == false">
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
  <SeriesHero />
  <TopSeries />
  <AiringTodaySeries />
  <PopularSeries />
</template>
