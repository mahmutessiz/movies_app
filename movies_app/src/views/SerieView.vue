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
const movieUrl = import.meta.env.VITE_API_URL + '/tv/' + movieId + '?api_key=' + apiKey;
const posterUrl = ref('https://www.themoviedb.org/t/p/w600_and_h900_bestv2/');
const backdropUrl = ref('https://www.themoviedb.org/t/p/w1280');
let movieData = ref([]);

// Api for similar movies
let similartvData = ref([]);
let pageNumber = 1;
let similarMoviesUrl =
  import.meta.env.VITE_API_URL +
  '/tv/' +
  movieId +
  '/similar' +
  '?api_key=' +
  apiKey +
  '&language=en-US&page=' +
  pageNumber;
const isFinish = ref(false);

onMounted(async () => {
  await axios
    .get(movieUrl)
    .then((response) => {
      movieData.value = response.data;
    })
    .finally(() => (isFinish.value = true));
  await axios.get(similarMoviesUrl).then((response) => {
    similartvData.value = response.data;
  });
});

async function reloadPage(similarData) {
  await router.push(`/tv/${similarData.id}`).then(() => {
    window.location.reload();
  });
}

/**
 * !when load more button clicked push results of new page to similartvData
 */
function count() {
  pageNumber++;
}

async function loadMore() {
  count();
  await axios
    .get(
      import.meta.env.VITE_API_URL +
        '/tv/' +
        movieId +
        '/similar' +
        '?api_key=' +
        apiKey +
        '&language=en-US&page=' +
        pageNumber
    )
    .then((response) => {
      let data = response.data;
      /*  similartvData.value.results.push(data.results); */
      data.results.forEach((element) => {
        similartvData.value.results.push(element);
      });
    });
}
</script>

<template>
  <!-- Page load animation -->
  <div class="fixed inset-0 z-50" v-if="isFinish == false">
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
            <li class="text-xl font-bold text-white/90">{{ movieData.name }}</li>
            <li class="mt-2">{{ movieData.overview }}</li>
            <br />
            <li>
              <span class="font-semibold text-white/70">Original name: </span>
              {{ movieData.original_name }}
            </li>
            <li>
              <span class="font-semibold text-white/70">Original language: </span>
              {{ movieData.original_language }}
            </li>
            <li>
              <span class="font-semibold text-white/70"> Production companies: </span>

              <span v-for="data in movieData.production_companies" :key="data.id">
                {{ data.name }} &nbsp;
              </span>
            </li>
            <li>
              <span class="font-semibold text-white/70">Release date:</span>
              {{ movieData.first_air_date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mt-12 w-full px-4 py-4 sm:text-center">
      <h2 class="pb-9 text-lg font-bold text-slate-100/60">
        Similar to <span class="text-warning">{{ movieData.name }}</span>
      </h2>
      <div class="w-full">
        <ul
          class="flex w-full items-start justify-start gap-4 overflow-x-auto py-4 text-center sm:flex-wrap sm:items-center sm:justify-center sm:overflow-x-hidden"
        >
          <li
            v-for="similarData in similartvData.results"
            :key="similarData.id"
            class="shrink-0 overflow-hidden rounded-md shadow-md shadow-rose-500/60"
          >
            <div class="w-60" v-if="similarData.poster_path">
              <img
                :src="posterUrl + similarData.poster_path"
                class="w-full cursor-pointer"
                :alt="similarData.title"
                @click="reloadPage(similarData)"
              />
              <p class="flex h-16 items-center justify-center">{{ similarData.name }}</p>
            </div>
          </li>
        </ul>
        <button class="btn-warning btn mt-8" @click="loadMore">Load more</button>
      </div>
    </div>
  </section>
</template>