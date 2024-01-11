<template>
  <div
    class="fixed z-[999] grid h-[100vh] w-full place-items-center bg-slate-900/50 backdrop-blur-md"
    id="favorites-list"
  >
    <ul>
      <li v-for="favorite in favoritesList" :key="favorite.id">{{ favorite }}</li>
    </ul>
    <button @click="switchFavorites" class="btn">Close</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const favoritesList = ref([]);

onMounted(() => {
  for (let i = 0; i < localStorage.length; i++) {
    favoritesList.value.push(localStorage.key(i));
  }
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
