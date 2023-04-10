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
  <div class="fixed inset-0 z-50 bg-black/50" v-if="topSeriesData.isFinish == false">
    <div class="h-screen bg-white">
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
  <SeriesHero />
  <TopSeries />
  <AiringTodaySeries />
  <PopularSeries />
</template>
