<script setup>
import { useRouter } from 'vue-router';
//Pinia setup
import { useApiStore } from '../stores/api';

const upcomingMoviesData = useApiStore();
upcomingMoviesData.fetchUpComingMoviesData();
const router = useRouter();
</script>

<template>
  <div class="mt-12 w-full">
    <div class="w-full p-4">
      <h2 class="text-xl font-bold text-green-500 sm:text-center">Upcoming & Recently Released</h2>
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
          class="cursor-pointer"
          :src="upcomingMoviesData.sourceOfMoviePosterUrl + data.poster_path"
          @click="router.push(`/movie/${data.id}`)"
          :alt="data.title"
        />
        <p class="flex h-24 flex-col items-center justify-center p-2">
          {{ data.title }}
          <span class="text-xs">release date: {{ data.release_date }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
