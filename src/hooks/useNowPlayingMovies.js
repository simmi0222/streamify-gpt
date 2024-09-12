import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  // MEMOIZATION - Saving/Stoping so many unnecessary API calls 
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    // copying from tmdb-DOCS->API-Reference's->Movie list
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    // if(!nowPlayingMovies) getNowPlayingMovies();
    !nowPlayingMovies && getNowPlayingMovies();  // MEMOIZATION
  }, []);
};

export default useNowPlayingMovies;
