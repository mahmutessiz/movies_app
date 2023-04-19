<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

let route = useRoute();
const serieId = ref(route.params.id);
const serieVideo = ref([]);

// Api for movie videos
const apiKey = import.meta.env.VITE_API_KEY;
const serieVideoUrl =
  import.meta.env.VITE_API_URL + '/tv/' + serieId.value + '/videos' + '?api_key=' + apiKey;

onMounted(async () => {
  try {
    await axios.get(serieVideoUrl).then((response) => {
      serieVideo.value = response.data;
    });
  } catch (error) {
    error;
  }
});

watch(
  () => route.params.id,
  async (newSerieId) => {
    try {
      await axios
        .get(
          import.meta.env.VITE_API_URL + '/tv/' + newSerieId + '/videos' + '?api_key=' + apiKey
        )
        .then((response) => {
          serieVideo.value = response.data;
        });
    } catch (error) {
      error;
    }
  }
);

const firstOfficialTrailer = computed(() => {
  if (serieVideo.value && serieVideo.value.results) {
    return serieVideo.value.results.find((trailer) => trailer.official == true && trailer.type== 'Trailer');
  }
  return undefined;
});
</script>

<template>
  <div class="flex w-full justify-center py-12" v-if="firstOfficialTrailer">
    <iframe
      class="aspect-video w-3/4 max-w-[1080px]"
      :src="'https://www.youtube.com/embed/' + firstOfficialTrailer.key"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>