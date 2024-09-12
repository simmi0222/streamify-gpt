import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black md:w-screen">
        <div className=" md:px-0 sm:-top-48 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
          <MovieList
            title={"Critically Acclaimed"}
            movies={movies.nowPlayingMovies}
          />
        </div>
        {/* FOOTER */}
        <div className="bg-black pt-4 md:pt-0">
        <h6 className="pb-2 pl-2 text-sm text-white md:text-3xl md:pb-4 text-center">
          Developed By
          <span className="font-bold text-red-600 pl-2">SIMRAN MEENA</span>
        </h6>
      </div>
      </div>
    )
  );
};
export default SecondaryContainer;
