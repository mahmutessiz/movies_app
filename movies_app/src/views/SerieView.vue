<script setup>
import SerieTrailers from '../components/series_components/SerieTrailers.vue';
import CreditsTvSection from '../components/series_components/CreditsTvSection.vue';
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

// Router import
import { useRoute, useRouter } from 'vue-router';

import { saveToLocalStorage } from '../utils/saveFavorite';

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

// Api for recomended
let recomendedMoviesData = ref([]);
let pageNumberRec = 1;
let recomendedUrl =
  import.meta.env.VITE_API_URL +
  '/tv/' +
  movieId +
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
    similartvData.value = response.data;
  });
});

watch(
  () => route.params.id,
  (newParams, oldParams) => {
    if (newParams != oldParams) {
      axios
        .get(import.meta.env.VITE_API_URL + '/tv/' + newParams + '?api_key=' + apiKey)
        .then((response) => {
          movieData.value = response.data;
        })
        .finally(() => (isFinish.value = true));
      axios
        .get(
          import.meta.env.VITE_API_URL +
            '/tv/' +
            newParams +
            '/similar' +
            '?api_key=' +
            apiKey +
            '&language=en-US&page=' +
            pageNumber
        )
        .then((response) => {
          similartvData.value = response.data;
        });

      // Recommended series
      axios
        .get(
          import.meta.env.VITE_API_URL +
            '/tv/' +
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
 * when load more button clicked push results of new page to similartvData
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
      data.results.forEach((element) => {
        similartvData.value.results.push(element);
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
        '/tv/' +
        movieId +
        '/recommendations' +
        '?api_key=' +
        apiKey +
        '&language=en-US&page=' +
        pageNumberRec
    )
    .then((response) => {
      let data = response.data;
      data.results.forEach((element) => {
        recomendedMoviesData.value.results.push(element);
      });
    });
}

const changeButtonStyle = (id) => {
  const favButton = document.getElementById(id);
  favButton.classList.toggle('text-rose-500');
};
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
          class="max-h-[30rem] w-[20rem] md:min-w-[15rem]"
        />

        <div class="w-full max-w-[40rem] px-2 py-4 md:w-1/2">
          <ul>
            <li
              class="flex flex-wrap items-center justify-start gap-2 text-xl font-bold text-white/90"
            >
              {{ movieData.name }}
              <!-- add favorite to localstorage -->
              <button
                class="btn-sm cursor-pointer rounded-md bg-rose-900/50 text-rose-500 backdrop-blur-lg"
                :id="`btn-favorite-${movieData.id}`"
                @click="
                  () => {
                    saveToLocalStorage(movieData.name, {
                      id: movieData.id,
                      title: movieData.name,
                      media_type: movieData.media_type,
                      poster_path: movieData.poster_path
                    }),
                      changeButtonStyle(`btn-favorite-${movieData.id}`);
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
            </li>
            <li class="mt-2">{{ movieData.overview }}</li>
            <br />
            <li>
              <span class="font-semibold text-white/70">Seasons: </span>
              {{ movieData.number_of_seasons }}
            </li>
            <li>
              <span class="font-semibold text-white/70">Episodes: </span>
              {{ movieData.number_of_episodes }}
            </li>
            <li>
              <span class="font-semibold text-white/70">Original name: </span>
              {{ movieData.original_name }}
            </li>
            <li>
              <span class="font-semibold text-white/70">Original language: </span>
              {{ movieData.original_language }}
            </li>
            <li>
              <span class="font-semibold text-white/70"> Genres: </span>
              <span v-for="genreData in movieData.genres" :key="genreData"
                >{{ genreData.name }}&nbsp;</span
              >
            </li>
            <li>
              <span class="font-semibold text-white/70"> Created by: </span>
              <span v-for="data in movieData.created_by" :key="data.id">{{ data.name }}&nbsp;</span>
            </li>

            <li>
              <span class="font-semibold text-white/70"> Production companies: </span>

              <span v-for="data in movieData.production_companies" :key="data.id">
                {{ data.name }} &nbsp;
              </span>
            </li>
            <li>
              <span class="font-semibold text-white/70">Type:</span>
              {{ $route.name }}
            </li>
            <li>
              <span class="font-semibold text-white/70">Rating:</span>
              {{ Number(movieData.vote_average).toFixed(1) }}
            </li>
            <li>
              <span class="font-semibold text-white/70">Release date:</span>
              {{ movieData.first_air_date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Cast -->
    <CreditsTvSection />
    <!-- Trailer component -->
    <SerieTrailers />

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
                @click="router.push(`/tv/` + recommededData.id), (pageNumberRec = 1)"
              />
              <p class="relative flex h-16 items-center justify-center">
                {{ recommededData.name }}
                <!-- add favorite to localstorage -->
                <button
                  class="btn-sm absolute -top-12 right-2 cursor-pointer rounded-md bg-slate-900/50 text-rose-500 backdrop-blur-lg"
                  :id="`btn-favorite-${recommededData.id}`"
                  @click="
                    () => {
                      saveToLocalStorage(recommededData.name, {
                        id: recommededData.id,
                        title: recommededData.name,
                        media_type: recommededData.media_type,
                        poster_path: recommededData.poster_path
                      }),
                        changeButtonStyle(`btn-favorite-${recommededData.id}`);
                    }
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
                    />
                  </svg>
                </button>
              </p>
            </div>
          </li>
        </ul>
        <button class="btn-warning btn mt-8" @click="loadMoreRec">Load more</button>
      </div>
    </div>

    <!-- Similar movies -->

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
                loading="lazy"
                @click="router.push(`/tv/` + similarData.id), (pageNumber = 1)"
              />
              <p class="relative flex h-16 items-center justify-center">
                {{ similarData.name }}

                <!-- add favorite to localstorage -->
                <button
                  class="btn-sm absolute -top-12 right-2 cursor-pointer rounded-md bg-slate-900/50 text-rose-500 backdrop-blur-lg"
                  :id="`btn-favorite-${similarData.id}`"
                  @click="
                    () => {
                      saveToLocalStorage(similarData.name, {
                        id: similarData.id,
                        title: similarData.name,
                        media_type: similarData.media_type,
                        poster_path: similarData.poster_path
                      }),
                        changeButtonStyle(`btn-favorite-${similarData.id}`);
                    }
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3"
                    />
                  </svg>
                </button>
              </p>
            </div>
          </li>
        </ul>
        <button class="btn-warning btn mt-8" @click="loadMore">Load more</button>
      </div>
    </div>
  </section>
</template>
