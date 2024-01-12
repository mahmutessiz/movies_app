<template>
  <div class="fixed z-[999] h-[100vh] w-full bg-slate-900/50 backdrop-blur-md" id="favorites-list">
    <ul v-for="(movie, key) in x_data" :key="key">
      <li>{{ movie.title }}</li>
      <!-- <p>ID: {{ movie.id }}</p>
      <p>Media Type: {{ movie.media_type }}</p> -->
    </ul>
    <button @click="switchFavorites" class="btn">Close</button>
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
</script>
