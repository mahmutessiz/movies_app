<template>
  <div
    class="fixed z-[999] h-[100vh] w-full overflow-scroll bg-slate-900/80 backdrop-blur-md"
    id="favorites-list"
  >
    <div class="flex w-full justify-end">
      <button @click="switchFavorites" class="btn m-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
            <path
              stroke-dasharray="60"
              stroke-dashoffset="60"
              d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
            >
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="60;0" />
            </path>
            <path
              stroke-dasharray="8"
              stroke-dashoffset="8"
              d="M12 12L16 16M12 12L8 8M12 12L8 16M12 12L16 8"
            >
              <animate
                fill="freeze"
                attributeName="stroke-dashoffset"
                begin="0.6s"
                dur="0.2s"
                values="8;0"
              />
            </path>
          </g>
        </svg>
      </button>
    </div>

    <ul class="flex flex-wrap justify-center gap-2 py-4">
      <li
        v-for="(movie, key) in x_data"
        class="flex w-full items-center justify-start gap-2 bg-rose-900 md:w-[40%]"
        :key="key"
      >
        <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" class="w-20" alt="" />
        <div class="flex w-full flex-col gap-2 pr-4">
          {{ movie.title }}
          <button @click="removeItem(movie.title)" class="btn-warning btn-sm btn w-fit self-end">
            sil
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { loadFromLocalStorage, x_data } from '../utils/saveFavorite';

onMounted(async () => {
  loadFromLocalStorage();
});
const switchFavorites = () => {
  const favoritesList = document.querySelector('#favorites-list');
  if (favoritesList.classList.contains('hidden')) {
    favoritesList.classList.remove('hidden');
  } else {
    favoritesList.classList.add('hidden');
  }
};

const removeItem = (movie) => {
  localStorage.removeItem(`x_${movie}`);
  window.location.reload();
};
</script>
