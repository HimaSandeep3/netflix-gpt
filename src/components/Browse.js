import React from 'react'
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
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  return (
    <div>
      <Header />
      {showGPTSearch ? <GPTSearch />:
      <>
      <MainContainer />
      <SecondaryContainer />
      </>
    }
    </div>
  )
}

export default Browse