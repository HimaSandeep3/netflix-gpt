import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const VideoTitle = ({ title, overview, path }) => {
    return (
      <div className="relative w-full h-[80vh] bg-cover bg-center text-white flex items-end">
        <div className="relative z-10 p-10 max-w-3xl">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">{title}</h1>
          <p className="text-lg text-gray-200 mb-6 line-clamp-4">{overview}</p>
          <div className="flex gap-4 mt-4">
          <button className="flex items-center gap-3 bg-white text-black font-bold text-lg py-3 px-8 rounded hover:bg-gray-300 transition shadow-md">
            <FontAwesomeIcon icon={faPlay} className="text-xl" />
            <span>Play</span>
          </button>
          <button className="flex items-center gap-3 bg-gray-700 bg-opacity-80 text-white font-bold text-lg py-3 px-8 rounded hover:bg-opacity-100 transition shadow-md">
            <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
            <span>More Info</span>
          </button>
          </div>
        </div>
      </div>
    );
  };

export default VideoTitle