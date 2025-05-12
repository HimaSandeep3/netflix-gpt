import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = ({onMovieClick  }) => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="overflow-x-hidden w-full h-full z-10 space-y-8 bg-black">
      <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} onMovieClick={onMovieClick }/>
      <MovieList title="Popular" movies={movies?.popularMovies} onMovieClick={onMovieClick }/>
      <MovieList title="Top Rated" movies={movies?.topRatedMovies} onMovieClick={onMovieClick }/>
      <MovieList title="Upcoming" movies={movies?.upComingMovies} onMovieClick={onMovieClick }/>
    </div>
  );
};


export default SecondaryContainer