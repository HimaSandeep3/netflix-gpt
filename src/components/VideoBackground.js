import React, { useEffect } from 'react'

import { useSelector} from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieid }) => {
    useMovieTrailer(movieid);
    const trailerVideo = useSelector(store => store.movies?.trailer);
    return (
      <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-black">
        {trailerVideo && (
          <iframe
            className="w-full h-full border-none"
            src={trailerVideo}
            allowFullScreen
            title="Movie Trailer"
          />
        )}
      </div>
    );
  };

export default VideoBackground