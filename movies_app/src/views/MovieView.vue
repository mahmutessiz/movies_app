<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
// Router import
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
const movieId = route.params.id;

// Api for selected movie
const apiKey = import.meta.env.VITE_API_KEY;
const movieUrl = import.meta.env.VITE_API_URL + '/movie/' + movieId + '?api_key=' + apiKey;
const posterUrl = ref('https://www.themoviedb.org/t/p/w600_and_h900_bestv2/');
const backdropUrl = ref('https://www.themoviedb.org/t/p/w1280');
let movieData = ref([]);

// Api for similar movies
let similarMoviesData = ref([]);
let similarMoviesUrl =
  import.meta.env.VITE_API_URL +
  '/movie/' +
  movieId +
  '/similar' +
  '?api_key=' +
  apiKey +
  '&language=en-US&page=1';

onMounted(async () => {
  await axios.get(movieUrl).then((response) => {
    movieData.value = response.data;
  });
  await axios.get(similarMoviesUrl).then((response) => {
    similarMoviesData.value = response.data;
  });
});

async function reloadPage(similarData) {
  await router.push(`/movie/${similarData.id}`).then(() => {
    window.location.reload();
  });
}
</script>

<template>
  <section>
    <div class="relative flex flex-wrap overflow-hidden">
      <img
        :src="backdropUrl + movieData.backdrop_path"
        class="absolute h-full w-full blur-sm"
        :alt="movieData.title"
      />

      <div class="z-10 flex w-full flex-wrap justify-center gap-4 bg-slate-950/80 px-4 py-12">
        <img
          :src="posterUrl + movieData.poster_path"
          :alt="movieData.title"
          class="w-1/3 min-w-[13rem] max-w-[20rem] md:min-w-[15rem]"
        />

        <div class="w-full max-w-[40rem] px-2 py-4 md:w-1/2">
          <ul>
            <li class="text-lg font-bold text-white/90">{{ movieData.title }}</li>
            <li>{{ movieData.overview }}</li>
            <li class="mt-2">
              <span class="font-semibold text-white/90">Original title: </span>
              {{ movieData.original_title }}
            </li>
            <li class="mt-2">
              <span class="font-semibold text-white/90"> Production companies: </span>

              <span v-for="data in movieData.production_companies" :key="data.id">
                {{ data.name }} &nbsp;
              </span>
            </li>
            <li v-if="movieData.adult == false" class="mt-2 text-green-500">Safe to watch</li>
            <li class="mt-2 text-warning" v-else>Adult content</li>
            <li class="mt-2">
              <span class="font-semibold text-white/90">Release date:</span>
              {{ movieData.release_date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-12 w-full px-4 py-4 sm:text-center">
      <h2 class="pb-9 text-lg font-bold text-slate-100/60">
        Similar to <span class="text-warning">{{ movieData.title }}</span>
      </h2>
      <div class="w-full">
        <ul
          class="flex w-full items-start justify-start gap-4 overflow-x-auto text-center sm:flex-wrap sm:items-center sm:justify-center sm:overflow-x-hidden"
        >
          <li
            v-for="similarData in similarMoviesData.results"
            :key="similarData.id"
            class="shrink-0 overflow-hidden rounded-md shadow-md shadow-rose-500/60"
          >
            <div class="w-60">
              <img
                :src="posterUrl + similarData.poster_path"
                class="w-full"
                :alt="similarData.title"
                @click="reloadPage(similarData)"
              />
              <p class="flex h-16 items-center justify-center">{{ similarData.title }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
