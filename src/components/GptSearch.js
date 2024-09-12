import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

// Used in Browse.js
const GPTSearch = () => {
  return (
    <>
      <div className="brightness-50 bg-opacity-80 w-full h-full object-cover fixed -z-10">
        <img className="h-screen w-screen object-cover" src={BG_URL} alt="logo" />
      </div>
      <div className="pt-[20%] md:pt-0">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};
export default GPTSearch;
