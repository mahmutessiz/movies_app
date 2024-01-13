<script setup>
import { useRouter } from 'vue-router';
//Pinia setup
import { useApiStore } from '../stores/api';

import { saveToLocalStorage } from '../utils/saveFavorite';

const popularMoviesData = useApiStore();
popularMoviesData.fetchPopularMoviesData();

const router = useRouter();

const changeButtonStyle = (id) => {
  const favButton = document.getElementById(id);
  favButton.classList.toggle('text-rose-500');
};
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
        <p class="relative h-16 p-2">
          {{ data.title }}
          <!-- add favorite to localstorage -->
          <button
            class="btn-sm absolute -top-12 right-2 cursor-pointer rounded-md bg-slate-900/50 text-rose-500 backdrop-blur-lg"
            :id="`btn-favorite-${data.id}`"
            @click="
              () => {
                saveToLocalStorage(data.title, {
                  id: data.id,
                  title: data.title,
                  media_type: data.media_type
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
        </p>
      </li>
    </ul>
  </div>
</template>
