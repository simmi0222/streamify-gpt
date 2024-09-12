import { addWatchVideo, addWatchMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const useFetchMovies = (name) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMovieDetails();
  }, [name]);

  const fetchMovieDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const movies = await data.json();
    // console.log(movies);  // {page: 1, results: Array(1), ...}

    // movies.results = Array(1) or [{…}]
    dispatch(addWatchMovies(movies.results));

    const vdata = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movies.results[0].id +
        "/videos",
      API_OPTIONS
    );
    const video = await vdata.json();
    // console.log(video);  // {id: 693134, results: Array(24)}

    const videoFilter = video.results.filter(
      (video) => video.type === "Trailer"  // i.e only objects {21},{22},{23} have "type === Trailer" out of Array(24)
    );
    const trailer = videoFilter.length ? videoFilter[0] : video.results[0];

    dispatch(addWatchVideo(trailer));
  };
};

export default useFetchMovies;
