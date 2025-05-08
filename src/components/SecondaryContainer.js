import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="overflow-x-hidden w-full h-full z-10 space-y-8 bg-black">
      <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
      <MovieList title="Popular" movies={movies?.popularMovies} />
      <MovieList title="Top Rated" movies={movies?.topRatedMovies} />
      <MovieList title="Upcoming" movies={movies?.upComingMovies} />
    </div>
  );
};


export default SecondaryContainer