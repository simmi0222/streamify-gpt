import openai from "../utils/openai";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  const searchText = useRef(null);

  // search movie in TMDB   
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results; // json.results will give a promiseArray which will take some time to resolve
  };

  const handleGptSearchClick = async () => {
    // console.log(searchText.current.value);
    // Make an API call to GPT API and get Movie Results

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // TODO: Write Error Handling, If gptResults don't give any movies on searching
    }

    // gptResults.choices?.[0]?.message?.content = "Andaz Apna Apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan"
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    // .split(",") will give this array-of-movies = ["Andaz Apna Apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan"]

    // For each movie/string in array I will make an API call & fetch the TMDB API & will find out the results for all 5 movies
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // searchMovieTMDB() is an async operation which will take some time to execute & will give us 5 Promise's - [Promise, Promise, Promise, Promise, Promise] and not the result

    const tmdbResults = await Promise.all(promiseArray);
    // Our program will wait for Promise.all() f'n to finish which will happen once all the Promise's inside it get resolved
    // console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }) // it will add Array-of-Array's in store
    );
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="pt-[30%] md:pt-[10%] w-full md:w-1/2 grid grid-cols-12 gap-4 p-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 col-span-9 md:col-span-10  rounded-md"
          // import 'lang' from languageConstants.js
          placeholder={lang[langKey].gptSearchPlaceholder}
          //  gptSearchPlaceholder: "What would you like to watch today?" in languageConstants.js
        />
        <button
          className="col-span-3 p-4 md:col-span-2 bg-red-700 text-white font-bold rounded-md"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
