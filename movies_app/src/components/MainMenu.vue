<script setup>
import { RouterLink, useRouter } from 'vue-router';
import SearcBarPopUp from '../components/SearchBarPopUp.vue';
import FavButton from './buttons/FavButton.vue';
import axios from 'axios';
import { ref, watch, computed } from 'vue';
/**
 * Drawer behavior setting
 */

function drawerStatusToggle() {
  const draver = document.querySelector('#drawer-display-status');
  draver.classList.toggle('hidden');
}
//push the search path
const router = useRouter();

function sendToSearch() {
  const inputValue = document.querySelector('#search-bar');
  if (inputValue.value !== '') {
    window.location.href = '/search/' + inputValue.value;
  }
}
let toggle = true;
function openSearchBar() {
  const searcDiv = document.querySelector('#search-div');
  const isToggleTrue = !toggle;

  searcDiv.classList.toggle('hidden', isToggleTrue);
  searcDiv.classList.toggle('flex', !isToggleTrue);
  toggle = isToggleTrue;
}
/**
 * Api
 */
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

watch(movieName, async (newValue) => {
  try {
    if (newValue.length >= 2) {
      await axios.get(searchUrl.value).then((response) => {
        searchData.value = response.data;
      });
    }
  } catch (error) {
    error;
  }
});
/**
 * Navigates to the appropriate route based on the given data and reloads the page.
 *
 * @param {Object} data - The data object containing the media type and ID.
 * @return {void} This function does not return anything.
 */
function goToData(data) {
  let route = '';
  if (data.media_type === 'movie') {
    route = '/movie/' + data.id;
  } else if (data.media_type === 'tv') {
    route = '/tv/' + data.id;
  } else {
    route = '/other';
  }

  router.push(route).then(() => {
    window.location.reload();
  });
}
</script>

<template>
  <header
    class="sticky -top-1 z-50 flex w-full items-center justify-between bg-slate-900/70 px-4 py-4 text-white backdrop-blur-md sm:justify-evenly"
  >
    <RouterLink to="/"
      ><img src="../assets/logo2.png" class="w-20 opacity-80 sm:w-36" alt=""
    /></RouterLink>

    <ul class="hidden sm:flex">
      <li class="">
        <input
          type="text"
          name="searchBar"
          class="h-8 w-60 rounded-l-md bg-slate-800 px-4"
          placeholder=" Search"
          id="search-bar"
          v-model="movieName"
          v-on:keyup.enter="sendToSearch"
        />
      </li>
      <li
        class="grid cursor-pointer place-items-center rounded-r-md bg-slate-700 p-2"
        @click="sendToSearch"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
          ></path>
        </svg>
      </li>
    </ul>
    <ul class="hidden gap-4 sm:flex">
      <li class="hover:text-white/70">
        <RouterLink to="/" class="focus:text-white/70 active:text-white/70">Home</RouterLink>
      </li>
      <li class="hover:text-white/70">
        <RouterLink to="/series" class="focus:text-white/70 active:text-white/70"
          >Series</RouterLink
        >
      </li>
      <li class="hover:text-white/70">
        <RouterLink to="/" class="focus:text-white/70 active:text-white/70">Movies</RouterLink>
      </li>

      <!-- favorites button -->
      <li>
        <FavButton />
      </li>
    </ul>
    <div class="flex items-center gap-4 sm:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        @click="openSearchBar"
      >
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
        />
      </svg>

      <div class="drawer-content">
        <div @click="drawerStatusToggle">
          <label
            for="my-drawer-4"
            class="drawer-button btn -mr-4 border-0 bg-gray-900/50 text-white hover:bg-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  </header>

  <div id="drawer-display-status" class="drawer drawer-end fixed top-16 z-40 hidden">
    <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
      <label for="my-drawer-4" class="drawer-overlay" @click="drawerStatusToggle"></label>
      <ul class="menu w-80 bg-slate-800/40 p-4 text-white/80 backdrop-blur-md">
        <li @click="deneme"><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/">Movies</RouterLink></li>
        <li><RouterLink to="/series">Series</RouterLink></li>
      </ul>
    </div>
  </div>
  <!-- Search bar bottom results page -->
  <div
    class="fixed left-0 right-0 top-16 z-50 flex items-center justify-center"
    v-if="movieName.length >= 2"
  >
    <ul class="z-50 max-h-96 w-80 overflow-y-scroll bg-white">
      <li
        class="z-40 grid max-h-20 w-full cursor-pointer grid-cols-12 overflow-hidden border-b border-warning/50 bg-black px-4 py-2"
        v-for="data in searchData.results"
        :key="data.id"
        tabindex="0"
      >
        <img
          :src="sourceOfPosterUrl + data.poster_path"
          class="col-span-2 w-full"
          :alt="data.title"
          @click="goToData(data)"
        />
        <p
          class="col-span-8 line-clamp-3 flex items-center px-4 text-sm text-white"
          v-if="data.title != null || undefined || ''"
          @click="goToData(data)"
        >
          {{ data.title }}
        </p>
        <p
          class="col-span-8 line-clamp-3 flex items-center px-4 text-sm text-white"
          @click="goToData(data)"
        >
          {{ data.name }}
        </p>
      </li>
    </ul>
  </div>

  <SearcBarPopUp />
</template>
