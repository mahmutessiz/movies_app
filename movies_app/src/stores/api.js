import { defineStore } from 'pinia'
import axios from 'axios'

export const useApiStore = defineStore('api', {
  state: () => ({
    movieListApiKey: import.meta.env.VITE_API_KEY,
    movieListApiUrl: import.meta.env.VITE_API_URL,
    sourceOfMovies: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/',
    myMovieList: [],
    sourceOfMoviesBackdropImg: 'https://www.themoviedb.org/t/p/w1280'
  }),
  actions: {
    async fetchMovieListData() {
      await axios
        .get(`${this.movieListApiUrl}?api_key=${this.movieListApiKey}`)
        .then((response) => {
          this.myMovieList = response.data
        })
    }
  }
})
