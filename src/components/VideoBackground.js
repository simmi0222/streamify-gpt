import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import MovieInfo from "./MovieInfo";

const VideoBackground = ({ movieId , details}) => {
  // const [trailerVideo , setTrailerVideo] = useState(null)  // 1st method
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo); // 2nd method is using Redux store

  const isInfo = useSelector((store) => store?.movies?.isInfo);

  useMovieTrailer(movieId);

  return (
    <div className="w-screen">
     {isInfo &&  <MovieInfo movieDetails={details}/>}

      {/* Embed option in share btn on youtube */}
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        autoPlay={true}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
export default VideoBackground;
