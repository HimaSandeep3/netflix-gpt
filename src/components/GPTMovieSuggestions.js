import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';
const GPTMovieSuggestions = () => {
  const selector=useSelector(state=>state.gpt)
  const{movieNames,movieResults}=selector;
  if(!movieNames) return null;
  return (
    <div>
      {movieNames.map((movieName,index)=>(
        <MovieList key={index} title={movieName} movies={movieResults[index]}/>
      ))}
    </div>
  )
}

export default GPTMovieSuggestions  