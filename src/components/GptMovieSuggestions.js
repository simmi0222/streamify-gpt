import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import DefaultGptSuggestion from "./DefaultGptSuggestion";
import lang from "../utils/languageConstants";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  const langKey = useSelector((store) => store.config.lang);

  // if (!movieNames) return null;
  if (!movieNames) return <DefaultGptSuggestion/>;

  return (
    <div className="pt-[10%] md:px-[2%] md:pt-10 shadow-lg bg-black bg-opacity-10">
      <h2 className="pb-2 pl-2 text-lg text-white md:text-3xl md:pb-4 text-center font-semibold">
        {lang[langKey]?.gptHeading}
      </h2>
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            // title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};
export default GptMovieSuggestions;
