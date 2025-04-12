import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailer } from '../utils/movieSlice';

const useMovieTrailer = (movieid) => {
  const dispatch = useDispatch();
  const [trailerUrl, setTrailerUrl] = useState(null);

  const getMovieTrailer = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`, API_OPTIONS);
    const response = await data.json();
    const movieTrailer = response.results.filter((video) => video.type === "Trailer").map((video) => video.key)[0];
    const trailerUrl = `https://www.youtube.com/embed/${movieTrailer}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movieTrailer}`;
    setTrailerUrl(trailerUrl);
    dispatch(addTrailer(trailerUrl));
  };

  useEffect(() => {
    getMovieTrailer();
  }, [movieid]);

  return trailerUrl;
};

export default useMovieTrailer;