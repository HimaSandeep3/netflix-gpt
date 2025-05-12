import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'

const MainContainer = ({ selectedMovie, onPlayClick, playWithAudio }) => {
  const movies = useSelector(store => store.movies?.nowPlayingMovies);
  if (!movies) return null;

  const mainMovie = selectedMovie || movies[0]; // Default to first movie
  const { original_title, overview, poster_path, id } = mainMovie;

  return (
    <div>
      <VideoTitle
        title={original_title}
        overview={overview}
        path={poster_path}
        onPlayClick={onPlayClick}
      />
      <VideoBackground movieid={id} playWithAudio={playWithAudio} />
    </div>
  );
};

export default MainContainer