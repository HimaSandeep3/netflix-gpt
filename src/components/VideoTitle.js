import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const VideoTitle = ({ title, overview, path,onPlayClick  }) => {
  return (
    <div className="relative w-full h-[80vh] bg-cover bg-center text-white flex items-end md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
      <div className="relative z-10 p-10 max-w-3xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg md:text-4xl lg:text-5xl xl:text-6xl">{title}</h1>
        <p className="text-lg text-gray-200 mb-6 line-clamp-4 md:text-md lg:text-lg xl:text-xl">{overview}</p>
        <div className="flex gap-4 mt-4 md:gap-3 lg:gap-4 xl:gap-5">
          <button className="flex items-center gap-3 bg-white text-black font-bold text-lg py-3 px-8 rounded hover:bg-gray-300 transition shadow-md md:text-md lg:text-lg xl:text-xl"
          onClick={onPlayClick}>
            <FontAwesomeIcon icon={faPlay} className="text-xl md:text-lg lg:text-xl xl:text-2xl" />
            <span>Play</span>
          </button>
          <button className="flex items-center gap-3 bg-gray-700 bg-opacity-80 text-white font-bold text-lg py-3 px-8 rounded hover:bg-opacity-100 transition shadow-md md:text-md lg:text-lg xl:text-xl"
           onClick={()=>window.open(`https://www.imdb.com/find?q=${title}`)}>
            <FontAwesomeIcon icon={faInfoCircle} className="text-xl md:text-lg lg:text-xl xl:text-2xl"/>
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
  };

export default VideoTitle