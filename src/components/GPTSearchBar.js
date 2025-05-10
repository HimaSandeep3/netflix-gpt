import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import lang from '../constants/languageConstants';
import { useSelector } from 'react-redux';
const GPTSearchBar = () => {
    const langKey=useSelector((store) => store.config.lang);
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-gray-800 rounded-lg shadow-md"
        onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center p-4">
          <input
            type="text"
            className="w-full ml-4 text-gray-100 bg-transparent border-0 focus:ring-0"
            placeholder={lang[langKey]?.gptSearchPlaceHolder}
            style={{ outline: 'none' }}
          />
          <button
            type="submit"
            className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </div>
  );
};
export default GPTSearchBar;