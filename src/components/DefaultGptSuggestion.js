import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import lang from "../utils/languageConstants";


const DefaultGptSuggestion = () => {
  const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);
  const langKey = useSelector((store) => store.config.lang);

  return (
    <div>
      <h2 className="pb-2 pl-2 text-lg text-white md:text-3xl md:pb-4 text-center font-semibold pt-5">
        {lang[langKey]?.defaultSearchHead}
      </h2>
      <MovieList movies={upcomingMovies}></MovieList>
    </div>
  );
};

export default DefaultGptSuggestion;
