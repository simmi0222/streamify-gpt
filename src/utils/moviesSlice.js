import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies:null,
    upcomingMovies:null,
    trailerVideo: null,
    watchMovieDetails: [],
    watchVideo: {},
    isInfo: false,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addWatchMovies: (state, action) => {
      state.watchMovieDetails = action.payload;
    },
    addWatchVideo: (state, action) => {
      state.watchVideo = action.payload;
    },
    isInfoChange: (state, action) => {
      state.isInfo = !state.isInfo;
    },
  },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopRatedMovies, addUpcomingMovies, addWatchMovies, addWatchVideo, isInfoChange} =
  moviesSlice.actions;

export default moviesSlice.reducer;
