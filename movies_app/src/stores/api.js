import { defineStore } from 'pinia'
import axios from 'axios'

export const useApiStore = defineStore('api', {
  state: () => ({
    movieListApiKey: import.meta.env.VITE_API_KEY,
    movieListApiUrl: import.meta.env.VITE_API_URL + '/list/8247631',
    sourceOfMoviePosterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/',

    // My personal movie list
    sourceOfMoviesBackdropImg: 'https://www.themoviedb.org/t/p/w1280',
    myMovieList: [],

    // Top movies
    topMoviesDataUrl: import.meta.env.VITE_API_URL + '/movie/top_rated',
    topMoviesData: []
  }),
  actions: {
    // Get My Personal List
    async fetchMovieListData() {
      await axios
        .get(`${this.movieListApiUrl}?api_key=${this.movieListApiKey}`)
        .then((response) => {
          this.myMovieList = response.data
        })
    },
    // Get The Top Movies Data
    async fetchTopMoviesData() {
      await axios
        .get(`${this.topMoviesDataUrl}?api_key=${this.movieListApiKey}${'&language=en-US&page=1'}`)
        .then((response) => {
          this.topMoviesData = response.data
        })
    }
  }
})
