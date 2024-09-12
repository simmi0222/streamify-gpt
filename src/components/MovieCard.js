import { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { image } from "../utils/constants";
import { Link } from "react-router-dom";

// For images of several Movies in 'MovieCard.js' : TMDB->Guides->Images->Basics

const MovieCard = ({ name, img }) => {
  const [showView, setShowView] = useState(false);

  if (!img) return null;
  return (
    <>
      <div
        className="p-2 sm:p-1 cursor-pointer w-36 md:w-48 transition-transform duration-200 ease-in-out transform sm:hover:scale-125"
        onMouseEnter={() => setShowView(true)}
        onMouseLeave={() => setShowView(false)}
      >
        {showView && (
          <Link to={`/watch/?name=${encodeURIComponent(name)}`}>
            <div className="hidden sm:block absolute top-32 left-16">
              <span className="text-white font-semibold border p-2 rounded-sm">
                Watch +
              </span>
            </div>
          </Link>
        )}
        <Link to={`/watch/?name=${encodeURIComponent(name)}`}>
          {img ? (
            <img className="rounded-md" src={IMG_CDN_URL + img} alt="Poster" />
        // eg: "https://image.tmdb.org/t/p/w500/" + "1E5baAaEse26fej7uHcjOgEE2t2.jpg" 
          ) : (
            <img src={image} alt="no image found" />
          )}
        </Link>
      </div>
    </>
  );
};
export default MovieCard;

// <div className="w-36 md:w-48 pr-4">
//       <img alt="Movie Card" src={IMG_CDN_URL + img} />
//       {/* eg: "https://image.tmdb.org/t/p/w500/" + "1E5baAaEse26fej7uHcjOgEE2t2.jpg" */}
//  </div>
