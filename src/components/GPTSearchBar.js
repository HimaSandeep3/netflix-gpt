import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import lang from "../constants/languageConstants";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { GEMINIAI_KEY, API_OPTIONS } from "../utils/constants";
import { addGPTMovieResults } from "../utils/gptSlice";
const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const handleSearchQuery = async () => {
    try {
      const query = searchText.current.value;
      if (!query) {
        throw new Error("Search query is empty");
      }

      const prompt =
        "Act as a movie recommendation system and suggest some movies for me based on this query: " +
        query +
        ". Give me a list of 5 movies with comma seperated without any introduction or explanation, like this: Okkadu, Athadu, Pokiri, Khaleja, 1 Nenokkadine";

      const ai = new GoogleGenAI({ apiKey: GEMINIAI_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      if (!response || !response.text) {
        throw new Error("Invalid response from GenAI API");
      }

      const movieList = response.text.split(/\s*,\s*/);
      if (movieList.length === 0) {
        throw new Error("No movies found in response");
      }

      const movies = movieList.map((movie) => movieSearch(movie));
      const movieData = await Promise.all(movies);

      if (!movieData || movieData.length === 0) {
        throw new Error("Failed to fetch movie details");
      }
      console.log(movieList);
      console.log(movieData);
      dispatch(
        addGPTMovieResults({ movieNames: movieList, movieResults: movieData })
      );
    } catch (error) {
      console.error("Error handling search query:", error.message);
    }
  };
  const movieSearch = async (movie) => {
    const searchResult = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await searchResult.json();
    return json.results;
  };
  return (
    <div className="absolute top-0 left-0 w-3/5 mx-auto sticky bg-gradient-to-b from-black z-10 flex justify-between md:flex-row lg:flex-row xl:flex-row mt-4 xl:mt-8">
      <form
        className="w-full md:w-1/2 bg-gray-800 rounded-lg shadow-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center p-4">
          <input
            ref={searchText}
            type="text"
            className="w-full ml-4 text-gray-100 bg-transparent border-0 focus:ring-0"
            placeholder={lang[langKey]?.gptSearchPlaceHolder}
            style={{ outline: "none" }}
          />
          <button
            type="submit"
            className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearchQuery}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </div>
  );
};
export default GPTSearchBar;
