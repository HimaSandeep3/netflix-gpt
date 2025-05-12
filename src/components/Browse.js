import React,{useState} from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpComingMovies from '../hooks/useUpComingMovies';
import GPTSearch from './GPTSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playWithAudio, setPlayWithAudio] = useState(false);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setPlayWithAudio(false); // Reset audio if needed

    // 🔽 Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div>
      <Header />
      {showGPTSearch ? <GPTSearch />:
      <>
      <MainContainer
            selectedMovie={selectedMovie}
            playWithAudio={playWithAudio}
            onPlayClick={() => setPlayWithAudio(true)}
          />
          <SecondaryContainer onMovieClick={handleMovieClick} // Reset mute for new video until user clicks play
        />
      </>
    }
    </div>
  )
}

export default Browse