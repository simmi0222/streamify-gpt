import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import WatchDetails from "./WatchDetails";
import useFetchMovies from "../hooks/useFetchMovies";
import { IMG_CDN_URL } from "../utils/constants";

const Watch = () => {
  let [searchParams] = useSearchParams();
  let name = searchParams.get("name");

  useFetchMovies(name);

  const trailerVideos = useSelector(
    // addWatchMovies(movies.results) in useFetchMovies.js
    (store) => store.movies?.watchMovieDetails[0]
  );
  // console.log(trailerVideos);

  // addWatchVideo(trailer) in useFetchMovies.js
  const trailerVideo = useSelector((store) => store.movies?.watchVideo);
  // console.log(trailerVideo);

  return (
    <div>
      <div className="bg-black h-screen ">
        <Link to={"/browse"}>
          <button className="absolute z-20 bg-slate-500 bg-opacity-40 text-lg text-white p-2 rounded-sm w-20 top-20 md:top-20  left-2 sm:top-20 sm:left-10 hover:bg-white hover:text-black">
            Back
          </button>
        </Link>

        <div className="">
          <iframe
            className="absolute top-36 md:top-0 w-screen md:h-screen aspect-video"
            src={`https://www.youtube.com/embed/${
              trailerVideo?.key
            }?autoplay=1&controls=1&enablejsapi=1&rel=0&version=3${"&mute=0"}`}
            title="YouTube video player"
            autoPlay={true}
            allowfullscreen="allowfullscreen"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share,allowfullscreen"
          ></iframe>
        </div>

        {/* <WatchDetails trailerVideos={trailerVideos} /> */}
        
      </div>
    </div>
  );
};

export default Watch;
