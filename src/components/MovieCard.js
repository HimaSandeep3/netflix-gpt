import React from 'react'
import { IMG_PATH } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return (
    <div className="min-w-[150px] md:min-w-[200px] hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
      <img
        className="rounded-lg shadow-lg"
        src={IMG_PATH + posterPath}
        alt="Movie Poster"
      />
    </div>
  );
}

export default MovieCard