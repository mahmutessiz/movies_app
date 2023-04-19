<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

let route = useRoute();
const movieId = ref(route.params.id);
const movieVideo = ref([]);

// Api for movie videos
const apiKey = import.meta.env.VITE_API_KEY;
const movieVideoUrl =
  import.meta.env.VITE_API_URL + '/movie/' + movieId.value + '/videos' + '?api_key=' + apiKey;

onMounted(async () => {
  try {
    await axios.get(movieVideoUrl).then((response) => {
      console.log(response.data);
      movieVideo.value = response.data;
    });
  } catch (error) {
    error;
  }
});

const firstOfficialTrailer = computed(() => {
  if (movieVideo.value && movieVideo.value.results) {
    return movieVideo.value.results.find((trailer) => trailer.official == true);
  }
  return undefined;
});
</script>

<template>
  <div class="flex w-full justify-center py-12" v-if="firstOfficialTrailer">
    <iframe
      class="aspect-video w-3/4"
      :src="'https://www.youtube.com/embed/' + firstOfficialTrailer.key"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>
