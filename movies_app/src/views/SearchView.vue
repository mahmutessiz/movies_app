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
let isFinish = ref(false);

onMounted(async () => {
  await axios
    .get(searchUrl)
    .then((response) => {
      searchData.value = response.data;
    })
    .finally(() => {
      isFinish.value = true;
    });
});
let searchData = ref([]);
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

  <!-- Main -->
  <div class="mt-12 w-full">
    <div class="w-full p-4">
      <h2 class="text-xl font-bold text-green-500 sm:text-center">Results</h2>
    </div>
    <ul
      class="flex w-full items-center gap-4 overflow-x-scroll p-4 sm:flex-wrap sm:justify-center sm:overflow-hidden"
      v-if="searchData.results != ''"
    >
      <li
        v-for="data in searchData.results"
        :key="data.id"
        class="w-40 shrink-0 rounded-lg bg-slate-800 text-center text-green-300 shadow-md shadow-rose-500 sm:w-60"
      >
        <div>
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
            v-if="data.poster_path"
          />
          <p class="grid h-20 w-full place-items-center rounded-md bg-white text-red-500" v-else>
            image not found
          </p>
          <p class="grid h-16 place-items-center p-2" v-if="data.title">{{ data.title }}</p>
          <p class="grid h-16 place-items-center p-2" v-else>{{ data.name }}</p>
        </div>
      </li>
    </ul>
    <div class="flex w-full justify-center" v-else>{{ movieName }} Not found</div>
  </div>
</template>
