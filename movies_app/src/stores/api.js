import { defineStore } from 'pinia';
import axios from 'axios';

export const useApiStore = defineStore('api', {
  state: () => ({
    movieListApiKey: import.meta.env.VITE_API_KEY,
    movieListApiUrl: import.meta.env.VITE_API_URL + '/list/8247631',
    sourceOfMoviePosterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/',
    sourceOfMoviesBackdropImg: 'https://www.themoviedb.org/t/p/w1280',

    // My personal movie list
    myMovieList: [],

    // Top movies
    topMoviesDataUrl: import.meta.env.VITE_API_URL + '/movie/top_rated',
    topMoviesData: [],

    // Trending this week
    trendingWeekMoviesDataUrl: import.meta.env.VITE_API_URL + '/trending/movie/week',
    trendingWeekMoviesData: [],

    // Upcoming
    upcomingMoviesDataUrl: import.meta.env.VITE_API_URL + '/movie/upcoming',
    upcomingMoviesData: [],

    // Popular
    popularMoviesUrl: import.meta.env.VITE_API_URL + '/movie/popular',
    popularMoviesData: []
  }),

  actions: {
    // Get My Personal List
    async fetchMovieListData() {
      await axios
        .get(`${this.movieListApiUrl}?api_key=${this.movieListApiKey}`)
        .then((response) => {
          this.myMovieList = response.data;
        });
    },

    // Get The Top Movies Data
    async fetchTopMoviesData() {
      await axios
        .get(`${this.topMoviesDataUrl}?api_key=${this.movieListApiKey}${'&language=en-US&page=1'}`)
        .then((response) => {
          this.topMoviesData = response.data;
        });
    },

    // Get trending movies data
    async fetchTrendingMoviesData() {
      await axios
        .get(
          `${this.trendingWeekMoviesDataUrl}?api_key=${
            this.movieListApiKey
          }${'&language=en-US&page=1'}`
        )
        .then((response) => {
          this.trendingWeekMoviesData = response.data;
        });
    },

    // Get upcoming movies data
    async fetchUpComingMoviesData() {
      await axios
        .get(
          `${this.upcomingMoviesDataUrl}?api_key=${this.movieListApiKey}${'&language=en-US&page=1'}`
        )
        .then((response) => {
          this.upcomingMoviesData = response.data;
        });
    },

    // Get popular movies data
    async fetchPopularMoviesData() {
      await axios
        .get(`${this.popularMoviesUrl}?api_key=${this.movieListApiKey}${'&language=en-US&page=1'}`)
        .then((response) => {
          this.popularMoviesData = response.data;
        });
    }
  }
});
