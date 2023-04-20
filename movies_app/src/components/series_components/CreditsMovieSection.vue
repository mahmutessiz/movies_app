<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

let route = useRoute();
const serieId = ref(route.params.id);
const creditsData = ref([]);

// Api for movie credits
const apiKey = import.meta.env.VITE_API_KEY;
const posterUrl = ref('https://www.themoviedb.org/t/p/w600_and_h900_bestv2/');
const creditsDataUrl =
  import.meta.env.VITE_API_URL + '/movie/' + serieId.value + '/credits' + '?api_key=' + apiKey;

onMounted(async () => {
  try {
    await axios.get(creditsDataUrl).then((response) => {
      creditsData.value = response.data;
    });
  } catch (error) {
    error;
  }
});

watch(
  () => route.params.id,
  async (newCreditsId) => {
    try {
      await axios
        .get(
          import.meta.env.VITE_API_URL +
            '/movie/' +
            newCreditsId +
            '/credits' +
            '?api_key=' +
            apiKey
        )
        .then((response) => {
          creditsData.value = response.data;
        });
    } catch (error) {
      error;
    }
  }
);
</script>

<template>
  <div class="w-full bg-gradient-to-b from-slate-700/10 to-black">
    <ul
      class="m-auto flex w-full items-center justify-start gap-4 overflow-x-auto px-4 py-9 md:w-3/4"
    >
      <li
        v-for="cast in creditsData.cast"
        :key="cast.id"
        class="shrink-0 overflow-hidden text-center"
      >
        <img
          :src="posterUrl + cast.profile_path"
          :alt="cast.name"
          class="h-[175px] w-[138px] cursor-pointer rounded-3xl"
        />
        <br />
        <span class="text-white/80">{{ cast.name }}</span>
      </li>
    </ul>
  </div>
</template>
