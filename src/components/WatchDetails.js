import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const WatchDetails = (props) => {
  const { trailerVideos } = props;
  const {  vote_count, vote_average, overview, poster_path } = trailerVideos;
  return (
    <div className="md:bg-black">
      <h3 className="text-lg md:text-4xl text-white p-5 text-center font-semibold ">
        {trailerVideos.original_title}
      </h3>

      <div className="md:flex">
        <div>
          <p className="text-sm text-white text-justify justify-center p-3 font-extralight border mb-3">
            {trailerVideos.overview}
          </p>
          <div className="flex justify-between px-3 m-3">
            <p className="text-white">👍{trailerVideos.vote_count}</p>
            <p className="text-white">▶️{trailerVideos.vote_average}</p>
          </div>
        </div>

        <div>
          <img src={IMG_CDN_URL + trailerVideos.poster_path}></img>
        </div>
      </div>
    </div>
  );
};

export default WatchDetails;
