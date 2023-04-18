<script setup>
import { useRouter } from 'vue-router';
//Pinia setup
import { useApiStore } from '../stores/api';

const popularMoviesData = useApiStore();
popularMoviesData.fetchPopularMoviesData();

const router = useRouter();
</script>

<template>
  <div class="mt-12 w-full">
    <div class="w-full p-4">
      <h2 class="text-xl font-bold text-warning sm:text-center">Popular Movies</h2>
    </div>
    <ul
      class="flex w-full items-center gap-4 overflow-x-scroll p-4 sm:flex-wrap sm:justify-center sm:overflow-hidden"
    >
      <li
        v-for="data in popularMoviesData.popularMoviesData.results"
        :key="data.id"
        class="w-40 shrink-0 rounded-lg bg-slate-800 text-center text-green-300 shadow-md shadow-rose-500 sm:w-60"
      >
        <img
          class="cursor-pointer"
          :src="popularMoviesData.sourceOfMoviePosterUrl + data.poster_path"
          :alt="data.title"
          loading="lazy"
          @click="router.push(`/movie/${data.id}`)"
        />
        <p class="h-16 p-2">{{ data.title }}</p>
      </li>
    </ul>
  </div>
</template>
