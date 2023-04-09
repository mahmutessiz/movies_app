import { defineStore } from 'pinia';
import axios from 'axios';

export const useSeriesApiStore = defineStore('seriesApi', {
  state: () => ({
    apiKey: import.meta.env.VITE_API_KEY,
    sourceOfMoviePosterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/',
    sourceOfMoviesBackdropImg: 'https://www.themoviedb.org/t/p/w1280',

    // My personal movie list
    /* movieListApiUrl: import.meta.env.VITE_API_URL + '/list/8247631',
    myMovieList: [], */

    // Top series
    topSeriesDataUrl: import.meta.env.VITE_API_URL + '/tv/top_rated',
    topSeriesData: []

    // Trending this week

    // Upcoming

    // Popular
  }),

  actions: {
    // Get The Top Movies Data
    async fetchTopSeriesData() {
      await axios
        .get(
          `${this.topSeriesDataUrl}?api_key=${
            this.apiKey
          }${'&language=en-US&page=1&with_original_language=en'}`
        )
        .then((response) => {
          this.topSeriesData = response.data;
        });
    }
  }
});
