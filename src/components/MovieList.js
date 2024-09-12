import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || !Array.isArray(movies) || movies.length === 0) return null;
  if (movies.length < 2) return null;
  
  return (
    <div className="overflow-hidden">
      <h1 className="pb-2 px-4 md:px-12 text-lg text-white md:text-3xl md:pb-4">
        {title}
      </h1>
      <div className="flex overflow-x-scroll overflow-y-hidden no-scrollbar">
        {/* In above className 'no-scrollbar' is coming from tailwind.config.js wher we have Manually created function inside plugins*/}
        <div className="flex pl-2 md:pl-12">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              name={movie?.original_title}
              img={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;
