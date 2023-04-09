import { defineStore } from 'pinia';
import axios from 'axios';

export const useSeriesApiStore = defineStore('seriesApi', {
  state: () => ({
    apiKey: import.meta.env.VITE_API_KEY,
    sourceOfMoviePosterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/',
    sourceOfMoviesBackdropImg: 'https://www.themoviedb.org/t/p/w1280',

    // My personal movie list
    seriesListApiUrl: import.meta.env.VITE_API_URL + '/list/8248369',
    mySeriesListData: [],

    // Top series
    topSeriesDataUrl: import.meta.env.VITE_API_URL + '/tv/top_rated',
    topSeriesData: [],

    // Airing today
    airingTodayDataUrl: import.meta.env.VITE_API_URL + '/tv/airing_today',
    airingTodayData: [],

    // Popular
    popularSeriesDataUrl: import.meta.env.VITE_API_URL + '/tv/popular',
    popularSeriesData: []
  }),

  actions: {
    // Get My Personal List
    async fetchSeriesListData() {
      await axios.get(`${this.seriesListApiUrl}?api_key=${this.apiKey}`).then((response) => {
        this.mySeriesListData = response.data;
      });
    },
    // Get The Top Movies Data
    async fetchTopSeriesData() {
      await axios.get(`${this.topSeriesDataUrl}?api_key=${this.apiKey}`).then((response) => {
        this.topSeriesData = response.data;
      });
    },
    // Get airing today data
    async fetchairingTodayData() {
      await axios
        .get(
          `${this.airingTodayDataUrl}?api_key=${
            this.apiKey
          }${'&language=en-US&page=1&with_original_language=en'}`
        )
        .then((response) => {
          this.airingTodayData = response.data;
        });
    },
    // Get popular series data
    async fetchPopularSeriesData() {
      await axios
        .get(
          `${this.popularSeriesDataUrl}?api_key=${
            this.apiKey
          }${'&language=en-US&page=1&with_original_language=en'}`
        )
        .then((response) => {
          this.popularSeriesData = response.data;
        });
    }
  }
});
