import { ref } from 'vue'
import { defineStore } from 'pinia'

import axios from 'axios'

export const useApiStore = defineStore('api', () => {
  const movieList = ref([])

  async function myMovieList(deneme) {
    await axios
      .get('https://api.themoviedb.org/3/list/8247631?api_key=04a068e90f321fa1dd51103a2c99f81e')
      .then((response) => {
        deneme.value = response.data
      })
  }

  return { movieList, myMovieList }
})
