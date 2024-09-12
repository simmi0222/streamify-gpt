import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  // Early Return CONCEPT
  if (!movies) return;
  // OR if (movies === null) return;
  // OR if (!movies || !movies.length) return null;

  // nowPlayingMovies will have array of movies bec of dispatch in useNowPlayingMovies()
  const mainMovie = movies[0];
  // console.log(mainMovie);

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[40%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} details={mainMovie} />
    </div>
  );
};
export default MainContainer;
