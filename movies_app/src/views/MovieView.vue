<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
// Router import
import { useRoute } from 'vue-router';
const route = useRoute();
const movieId = route.params.id;

// Api
const apiKey = import.meta.env.VITE_API_KEY;
const movieUrl = import.meta.env.VITE_API_URL + '/movie/' + movieId + '?api_key=' + apiKey;
const posterUrl = ref('https://www.themoviedb.org/t/p/w600_and_h900_bestv2/');
const backdropUrl = ref('https://www.themoviedb.org/t/p/w1280');
let movieData = ref([]);

onMounted(async () => {
  await axios.get(movieUrl).then((response) => {
    movieData.value = response.data;
  });
});
</script>

<template>
  <section>
    <div class="relative flex overflow-hidden">
      <img
        :src="backdropUrl + movieData.backdrop_path"
        class="absolute h-full w-full blur-sm"
        :alt="movieData.title"
      />

      <div class="z-10 flex w-2/3 flex-wrap gap-4 bg-slate-950/80 px-4 py-12">
        <img
          :src="posterUrl + movieData.poster_path"
          :alt="movieData.title"
          class="w-1/3 min-w-[15rem]"
        />

        <div class="w-1/2">
          <ul>
            <li>{{ movieData.title }}</li>
            <br />
            <li>{{ movieData.overview }}</li>
          </ul>
        </div>
      </div>
      <div class="z-10 w-1/3 bg-slate-400/80"></div>
    </div>
    <div>
      <h2>Similar to {{ movieData.title }}</h2>
    </div>
  </section>
</template>
