<script setup>
//Pinia setup
import { useSeriesApiStore } from '../../stores/seriesApi';

const topSeriesData = useSeriesApiStore();
topSeriesData.fetchTopSeriesData();
</script>

<template>
  <div class="mt-12 w-full">
    <div class="w-full p-4">
      <h2 class="text-xl font-bold text-green-500 sm:text-center">Top Series</h2>
    </div>
    <ul class="flex w-full items-center gap-4 overflow-x-scroll p-4 sm:flex-wrap sm:justify-center">
      <li
        v-for="data in topSeriesData.topSeriesData.results"
        :key="data.id"
        class="w-40 shrink-0 rounded-lg bg-slate-800 text-center text-green-300 shadow-md shadow-rose-500 sm:w-60 sm:overflow-hidden"
      >
        <img :src="topSeriesData.sourceOfMoviePosterUrl + data.poster_path" :alt="data.name" />
        <p class="flex h-16 flex-col items-center justify-center p-2">{{ data.name }}</p>
      </li>
    </ul>
  </div>
</template>
