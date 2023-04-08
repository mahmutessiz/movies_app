<script setup>
//Pinia setup
import { useApiStore } from '../stores/api';

const upcomingMoviesData = useApiStore();
upcomingMoviesData.fetchUpComingMoviesData();
</script>

<template>
  <div class="mt-12 w-full">
    <div class="w-full p-4">
      <h2 class="text-center text-2xl font-bold text-green-500">
        Upcoming Movies & Recently Released
      </h2>
    </div>
    <ul
      class="flex w-full flex-nowrap gap-4 overflow-x-auto p-4 sm:flex-wrap sm:items-center sm:justify-center"
    >
      <li
        v-for="data in upcomingMoviesData.upcomingMoviesData.results"
        :key="data.id"
        class="w-40 shrink-0 overflow-hidden rounded-lg bg-slate-800 text-center text-green-300 shadow-md shadow-rose-500 sm:w-60"
      >
        <img
          :src="upcomingMoviesData.sourceOfMoviePosterUrl + data.poster_path"
          :alt="data.title"
        />
        <p class="flex h-24 flex-wrap items-center justify-center p-2">
          {{ data.title }} <br />
          <span class="text-xs">release date: {{ data.release_date }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
