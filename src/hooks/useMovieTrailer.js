import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailer } from '../utils/movieSlice';

const useMovieTrailer = (movieid) => {
  const dispatch = useDispatch();
  const [videoId, setVideoId] = useState(null);

  const getMovieTrailer = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`, API_OPTIONS);
    const response = await data.json();
    const movieTrailer = response.results.find((video) => video.type === "Trailer");
    if (movieTrailer) {
      setVideoId(movieTrailer.key);
      dispatch(addTrailer(movieTrailer.key)); // store video ID
    }
  };

  useEffect(() => {
    if (movieid) {
      getMovieTrailer(); // Always fetch on movieid change
    }
  }, [movieid]);

  return videoId;
};

export default useMovieTrailer;
