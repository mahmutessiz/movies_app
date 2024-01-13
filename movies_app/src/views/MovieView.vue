<script setup>
import { ref, onMounted, watch } from 'vue';
import MovieTrailers from '../components/MovieTrailers.vue';
import CreditsMovieSection from '../components/series_components/CreditsMovieSection.vue';
import axios from 'axios';
// Router import
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
let route = useRoute();
const movieId = ref(route.params.id);

// Api for selected movie
const apiKey = import.meta.env.VITE_API_KEY;
const movieUrl = import.meta.env.VITE_API_URL + '/movie/' + movieId.value + '?api_key=' + apiKey;
const posterUrl = ref('https://www.themoviedb.org/t/p/w600_and_h900_bestv2/');
const backdropUrl = ref('https://www.themoviedb.org/t/p/w1280');
let movieData = ref([]);

// Api for similar movies
let similarMoviesData = ref([]);
let pageNumber = 1;
let similarMoviesUrl =
  import.meta.env.VITE_API_URL +
  '/movie/' +
  movieId.value +
  '/similar' +
  '?api_key=' +
  apiKey +
  '&language=en-US&page=' +
  pageNumber;
const isFinish = ref(false);

// Api for recomended
let recomendedMoviesData = ref([]);
let pageNumberRec = 1;
let recomendedUrl =
  import.meta.env.VITE_API_URL +
  '/movie/' +
  movieId.value +
  '/recommendations' +
  '?api_key=' +
  apiKey +
  '&language=en-US&page=' +
  pageNumberRec;

onMounted(async () => {
  await axios
    .get(movieUrl)
    .then((response) => {
      movieData.value = response.data;
    })
    .then(async () => {
      await axios.get(recomendedUrl).then((response) => {
        recomendedMoviesData.value = response.data;
      });
    })
    .finally(() => (isFinish.value = true));
  await axios.get(similarMoviesUrl).then((response) => {
    similarMoviesData.value = response.data;
  });
});

watch(
  () => route.params.id,
  (newParams, oldParams) => {
    if (newParams != oldParams) {
      // Similar movies
      axios
        .get(import.meta.env.VITE_API_URL + '/movie/' + newParams + '?api_key=' + apiKey)
        .then((response) => {
          movieData.value = response.data;
        })
        .finally(() => (isFinish.value = true));
      axios
        .get(
          import.meta.env.VITE_API_URL +
            '/movie/' +
            newParams +
            '/similar' +
            '?api_key=' +
            apiKey +
            '&language=en-US&page=' +
            pageNumber
        )
        .then((response) => {
          similarMoviesData.value = response.data;
        });

      // Recommended movies
      axios
        .get(
          import.meta.env.VITE_API_URL +
            '/movie/' +
            newParams +
            '/recommendations' +
            '?api_key=' +
            apiKey +
            '&language=en-US&page=' +
            pageNumberRec
        )
        .then((response) => {
          recomendedMoviesData.value = response.data;
        });
    }
  }
);

/**
 * when load more button clicked push results of new page to similarMoviesData
 */
function count() {
  pageNumber++;
}

async function loadMore() {
  count();
  await axios
    .get(
      import.meta.env.VITE_API_URL +
        '/movie/' +
        movieId.value +
        '/similar' +
        '?api_key=' +
        apiKey +
        '&language=en-US&page=' +
        pageNumber
    )
    .then((response) => {
      let data = response.data;
      data.results.forEach((element) => {
        similarMoviesData.value.results.push(element);
      });
    });
}

// Recommend
function countRecommend() {
  pageNumberRec++;
}

async function loadMoreRec() {
  countRecommend();
  await axios
    .get(
      import.meta.env.VITE_API_URL +
        '/movie/' +
        movieId.value +
        '/recommendations' +
        '?api_key=' +
        apiKey +
        '&language=en-US&page=' +
        pageNumberRec
    )
    .then((response) => {
      let data = response.data;
      /*  similarMoviesData.value.results.push(data.results); */
      data.results.forEach((element) => {
        recomendedMoviesData.value.results.push(element);
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
            <li class="text-xl font-bold text-white">{{ movieData.title }}</li>
            <li class="mt-2">{{ movieData.overview }}</li>
            <br />
            <li>
              <span class="font-semibold text-white/90">Original title: </span>
              {{ movieData.original_title }}
            </li>
            <li>
              <span class="font-semibold text-white/90">Original language: </span>
              {{ movieData.original_language }}
            </li>
            <li>
              <span class="font-semibold text-white/90"> Genres: </span>

              <span v-for="data in movieData.genres" :key="data"> {{ data.name }} &nbsp; </span>
            </li>
            <li>
              <span class="font-semibold text-white/90"> Production companies: </span>

              <span v-for="data in movieData.production_companies" :key="data.id">
                {{ data.name }} &nbsp;
              </span>
            </li>
            <li>
              <span class="font-semibold text-white/90">Type:</span>
              {{ $route.name }}
            </li>
            <li>
              <span class="font-semibold text-white/90">Rating:</span>
              {{ Number(movieData.vote_average).toFixed(1) }}
            </li>
            <li>
              <span class="font-semibold text-white/90">Release date:</span>
              {{ movieData.release_date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Credits -->
    <CreditsMovieSection />

    <!-- Trailer section component -->
    <MovieTrailers />

    <!-- Recommended movies -->
    <div class="mt-12 w-full px-4 py-4 sm:text-center">
      <h2 class="pb-9 text-lg font-bold text-warning">Recommended</h2>
      <div class="w-full">
        <ul
          class="flex w-full items-start justify-start gap-4 overflow-x-auto py-4 text-center sm:flex-wrap sm:items-center sm:justify-center sm:overflow-x-hidden"
        >
          <li
            v-for="recommededData in recomendedMoviesData.results"
            :key="recommededData.id"
            class="shrink-0 overflow-hidden rounded-md shadow-md shadow-rose-500/60"
          >
            <div class="w-60" v-if="recommededData.poster_path">
              <img
                :src="posterUrl + recommededData.poster_path"
                class="w-full cursor-pointer"
                :alt="recommededData.title"
                loading="lazy"
                @click="router.push(`/movie/` + recommededData.id), (pageNumberRec = 1)"
              />
              <p class="flex h-16 items-center justify-center">{{ recommededData.title }}</p>
            </div>
          </li>
        </ul>
        <button class="btn-warning btn mt-8" @click="loadMoreRec">Load more</button>
      </div>
    </div>

    <!-- Similar movies -->
    <div class="mt-12 w-full px-4 py-4 sm:text-center">
      <h2 class="pb-9 text-lg font-bold text-slate-100/60">
        Similar to <span class="text-warning">{{ movieData.title }}</span>
      </h2>
      <div class="w-full">
        <ul
          class="flex w-full items-start justify-start gap-4 overflow-x-auto py-4 text-center sm:flex-wrap sm:items-center sm:justify-center sm:overflow-x-hidden"
        >
          <li
            v-for="similarData in similarMoviesData.results"
            :key="similarData.id"
            class="shrink-0 overflow-hidden rounded-md shadow-md shadow-rose-500/60"
          >
            <div class="w-60" v-if="similarData.poster_path">
              <img
                :src="posterUrl + similarData.poster_path"
                class="w-full cursor-pointer"
                :alt="similarData.title"
                loading="lazy"
                @click="router.push(`/movie/` + similarData.id), (pageNumber = 1)"
              />
              <p class="flex h-16 items-center justify-center">{{ similarData.title }}</p>
            </div>
          </li>
        </ul>
        <button class="btn-warning btn mt-8" @click="loadMore">Load more</button>
      </div>
    </div>
  </section>
</template>
