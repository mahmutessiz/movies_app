<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const route = useRoute();

/**
 * Api
 */
const apiKey = import.meta.env.VITE_API_KEY;
const sourceOfPosterUrl = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/';
/* const sourceOfBackdropImg = 'https://www.themoviedb.org/t/p/w1280'; */

const movieName = route.params.id;
const searchUrl =
  import.meta.env.VITE_API_URL +
  '/search/multi' +
  '?api_key=' +
  apiKey +
  '&language=en-US&query=' +
  movieName +
  '&page=1&include_adult=false';

const router = useRouter();

onMounted(async () => {
  await axios.get(searchUrl).then((response) => {
    searchData.value = response.data;
  });
});
let searchData = ref([]);
</script>

<template>
  <div class="mt-12 w-full">
    <div class="w-full p-4">
      <h2 class="text-xl font-bold text-green-500 sm:text-center">Results</h2>
    </div>
    <ul
      class="flex w-full items-center gap-4 overflow-x-scroll p-4 sm:flex-wrap sm:justify-center sm:overflow-hidden"
    >
      <li
        v-for="data in searchData.results"
        :key="data.id"
        class="w-40 shrink-0 rounded-lg bg-slate-800 text-center text-green-300 shadow-md shadow-rose-500 sm:w-60"
      >
        <div v-if="data.poster_path">
          <img
            class="cursor-pointer"
            :src="sourceOfPosterUrl + data.poster_path"
            :alt="data.title"
            @click="
              if (data.media_type == 'movie') {
                router.push(`/movie/${data.id}`);
              } else {
                router.push(`/tv/${data.id}`);
              }
            "
          />
          <p class="h-16 p-2" v-if="data.title">{{ data.title }}</p>
          <p class="h-16 p-2" v-else>{{ data.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
