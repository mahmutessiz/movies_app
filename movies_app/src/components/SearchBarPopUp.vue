<script setup>
import { useRouter } from 'vue-router';
import { ref, watch, computed } from 'vue';
import axios from 'axios';
const router = useRouter();
async function sendToSearch() {
  const inputValue = document.querySelector('#search-bar2');
  if (inputValue.value != '') {
    await router.push('/search/' + inputValue.value).then(() => {
      window.location.reload();
    });
  }
}

function sendToSearchMobile(params) {
  if (params.media_type == 'movie') {
    router.push('/movie/' + params.id).then(() => {
      window.location.reload();
    });
  } else if (params.media_type == 'tv') {
    router.push('/tv/' + params.id).then(() => {
      window.location.reload();
    });
  } else {
    router.push('/other').then(() => {
      window.location.reload();
    });
  }
}

const apiKey = import.meta.env.VITE_API_KEY;
const sourceOfPosterUrl = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/';

const movieName = ref('');

let searchData = ref([]);

const searchUrl = computed(
  () =>
    `${import.meta.env.VITE_API_URL}/search/multi?api_key=${apiKey}&language=en-US&query=${
      movieName.value
    }&page=1&include_adult=false`
);

const debounce = function (func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const debouncedSearch = debounce(async (query) => {
  try {
    if (query.length >= 2) {
      const response = await axios.get(searchUrl.value);
      searchData.value = response.data;
    }
  } catch (error) {
    console.error(error);
  }
}, 500);

watch(movieName, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    debouncedSearch(newValue);
  }
});
</script>

<template>
  <div
    class="fixed inset-0 z-40 hidden w-full justify-center backdrop-blur-lg sm:hidden"
    id="search-div"
  >
    <ul class="z-50 mt-32 flex h-fit shadow-sm shadow-rose-500">
      <li class="">
        <input
          type="text"
          name="searchBar"
          class="h-9 w-full rounded-l-md bg-slate-900 px-2"
          placeholder=" Search"
          id="search-bar2"
          v-on:keyup.enter="sendToSearch"
          v-model="movieName"
        />
      </li>
      <li
        class="grid h-fit cursor-pointer place-items-center rounded-r-md bg-black p-2"
        @click="sendToSearch"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.3rem" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
          ></path>
        </svg>
      </li>
    </ul>
    <!-- Search bar bottom results page -->
    <div
      class="fixed left-0 right-0 top-44 z-50 flex items-center justify-center"
      v-if="movieName.length >= 2"
    >
      <ul class="z-50 max-h-96 w-80 overflow-y-scroll bg-white">
        <li
          class="z-50 grid max-h-20 w-full cursor-pointer grid-cols-12 overflow-hidden border-b border-warning/50 bg-black px-4 py-2"
          v-for="data in searchData.results"
          :key="data.id"
          tabindex="0"
        >
          <img
            :src="sourceOfPosterUrl + data.poster_path"
            class="col-span-2 w-full"
            :alt="data.title"
            @click="sendToSearchMobile(data)"
          />
          <p
            class="col-span-8 line-clamp-3 flex items-center px-4 text-sm text-white"
            v-if="data.title != null || undefined || ''"
            @click="sendToSearchMobile(data)"
          >
            {{ data.title }}
          </p>
          <p
            class="col-span-8 line-clamp-3 flex items-center px-4 text-sm text-white"
            @click="sendToSearchMobile(data)"
          >
            {{ data.name }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
